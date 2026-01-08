import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Linking } from "react-native";
import { db, appId } from "@/shared/api/firebase";
import { useAuth } from "@/shared/providers/AuthProvider";
import type { UserRole } from "@/shared/types/app";
import { useTheme } from "@/shared/providers/ThemeProvider";

type TicketStatus = "open" | "replied" | string;

interface TicketMessage {
  senderId: string;
  senderName: string;
  text: string;
  role?: UserRole | string;
  timestamp: string;
}

interface Ticket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: TicketStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp | { seconds?: number };
  messages?: TicketMessage[];
}

const ticketsCollection = collection(
  db,
  "artifacts",
  appId,
  "public",
  "data",
  "consultations"
);

const SUPPORT_HIGHLIGHTS = [
  {
    id: "sla",
    title: "Avg Response",
    value: "12 menit",
    description: "Tim mentor online setiap 07.00–23.00 WIB."
  },
  {
    id: "mentor",
    title: "Mentor On Duty",
    value: "Mentor Sarah",
    description: "Spesialis Funded Program & risk management."
  },
  {
    id: "hotline",
    title: "Emergency Desk",
    value: "Hubungi via Email",
    description: "support@sekolahtrading.id",
    action: () => Linking.openURL("mailto:support@sekolahtrading.id")
  }
];

const formatTimestamp = (stamp?: Timestamp | { seconds?: number }): string => {
  if (!stamp) return "";
  if (stamp instanceof Timestamp) {
    return stamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  if ("seconds" in stamp && stamp.seconds) {
    return new Date(stamp.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return "";
};

const statusStyles: Record<TicketStatus, { bg: string; color: string }> = {
  open: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
  replied: { bg: "rgba(59,130,246,0.15)", color: "#3b82f6" }
};

export default function SupportSystemScreen(): React.ReactElement | null {
  const { user } = useAuth();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;
  const isTablet = width >= 768;

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [loadingTickets, setLoadingTickets] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(ticketsCollection, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetched = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      })) as Ticket[];

      if (user.role !== "Mentor") {
        fetched = fetched.filter((ticket) => ticket.userId === user.uid);
      }

      setTickets(fetched);
      setLoadingTickets(false);

      if (activeTicket) {
        const updatedActive = fetched.find((ticket) => ticket.id === activeTicket.id);
        if (updatedActive) {
          setActiveTicket(updatedActive);
        }
      }
    });

    return () => unsubscribe();
  }, [user, activeTicket?.id]);

  useEffect(() => {
    if (activeTicket?.messages) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
    }
  }, [activeTicket?.messages]);

  if (!user) {
    return null;
  }

  const handleCreateTicket = async () => {
    if (!newSubject.trim() || !newMessage.trim()) {
      return;
    }
    try {
      await addDoc(ticketsCollection, {
        userId: user.uid,
        userName: user.displayName,
        subject: newSubject.trim(),
        status: "open",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        messages: [
          {
            senderId: user.uid,
            senderName: user.displayName,
            text: newMessage.trim(),
            role: user.role,
            timestamp: new Date().toISOString()
          }
        ]
      });
      setIsCreating(false);
      setNewSubject("");
      setNewMessage("");
    } catch (error) {
      console.error("Error creating ticket", error);
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim() || !activeTicket) {
      return;
    }
    try {
      const ticketRef = doc(
        db,
        "artifacts",
        appId,
        "public",
        "data",
        "consultations",
        activeTicket.id
      );
      await updateDoc(ticketRef, {
        updatedAt: serverTimestamp(),
        status: user.role === "Mentor" ? "replied" : "open",
        messages: arrayUnion({
          senderId: user.uid,
          senderName: user.displayName,
          text: replyMessage.trim(),
          role: user.role,
          timestamp: new Date().toISOString()
        })
      });
      setReplyMessage("");
    } catch (error) {
      console.error("Error replying to ticket", error);
    }
  };

  const getStatusStyle = (status: TicketStatus) =>
    statusStyles[status] ?? { bg: "rgba(148,163,184,0.2)", color: "#94a3b8" };

  const showList = isDesktop || !activeTicket;
  const showDetail = isDesktop || !!activeTicket;
  const listTitle = user.role === "Mentor" ? "Incoming Requests" : "My Consultations";

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View
        className="flex-row flex-wrap gap-3 px-4 pt-3 pb-1"
        style={{ marginBottom: isDesktop ? 12 : 4 }}
      >
        {SUPPORT_HIGHLIGHTS.map((item) => (
          <Pressable
            key={item.id}
            className="rounded-[18px] p-3.5 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.subtext + "22",
              flexBasis: isDesktop ? "32%" : isTablet ? "48%" : "100%"
            }}
            onPress={item.action}
            disabled={!item.action}
          >
            <Text
              className="text-xs uppercase tracking-wider mb-1"
              style={{ color: colors.subtext }}
            >
              {item.title}
            </Text>
            <Text
              className="font-extrabold text-lg mb-1"
              style={{ color: colors.text }}
            >
              {item.value}
            </Text>
            <Text
              className="text-xs leading-4"
              style={{ color: colors.subtext }}
            >
              {item.description}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="flex-1 flex-row">
        {showList && (
          <View
            className={`bg-slate-900 ${isDesktop ? "max-w-[340px] border-r border-slate-400/15" : "w-full"}`}
          >
            <View
              className="px-4 py-5 border-b flex-row justify-between items-center"
              style={{
                borderColor: colors.subtext + "22",
                backgroundColor: colors.surface
              }}
            >
              <Text
                className="text-lg font-bold"
                style={{ color: colors.text }}
              >
                {listTitle}
              </Text>
              {user.role !== "Mentor" && (
                <Pressable
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: "#c084fc" }}
                  onPress={() => setIsCreating(true)}
                >
                  <Text className="text-[22px] font-extrabold text-slate-900">+</Text>
                </Pressable>
              )}
            </View>

            <ScrollView
              className="flex-1"
              contentContainerStyle={{ padding: 12, gap: 12 }}
            >
              {loadingTickets && (
                <View className="p-6 items-center justify-center">
                  <ActivityIndicator color={colors.accent} />
                  <Text
                    className="font-semibold mt-2"
                    style={{ color: colors.subtext }}
                  >
                    Memuat konsultasi...
                  </Text>
                </View>
              )}

              {!loadingTickets && tickets.length === 0 && !isCreating && (
                <View className="p-6 items-center justify-center">
                  <Text
                    className="font-semibold"
                    style={{ color: colors.subtext }}
                  >
                    Tidak ada konsultasi aktif.
                  </Text>
                  {user.role !== "Mentor" && (
                    <Text
                      className="text-xs mt-1 text-center"
                      style={{ color: colors.subtext }}
                    >
                      Ketuk tombol + untuk memulai percakapan privat.
                    </Text>
                  )}
                </View>
              )}

              {isCreating && (
                <View
                  className="rounded-[20px] p-4 border border-purple-500/40"
                  style={{ backgroundColor: colors.surface }}
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-bold text-purple-500">Tiket Baru</Text>
                    <Pressable onPress={() => setIsCreating(false)}>
                      <Text className="text-slate-400 text-base">✕</Text>
                    </Pressable>
                  </View>
                  <View className="gap-3">
                    <TextInput
                      placeholder="Topik (misal: Floating Loss XAU)"
                      placeholderTextColor="#94a3b8"
                      value={newSubject}
                      onChangeText={setNewSubject}
                      className="border border-slate-400/25 rounded-[14px] px-3.5 py-3 text-slate-50"
                    />
                    <TextInput
                      placeholder="Ceritakan masalah anda..."
                      placeholderTextColor="#94a3b8"
                      value={newMessage}
                      onChangeText={setNewMessage}
                      className="border border-slate-400/25 rounded-[14px] px-3.5 py-3 text-slate-50 min-h-[100px]"
                      style={{ textAlignVertical: "top" }}
                      multiline
                    />
                    <Pressable
                      className="bg-purple-500 py-3 rounded-[14px] items-center"
                      onPress={handleCreateTicket}
                    >
                      <Text className="font-bold text-white">Kirim ke Mentor</Text>
                    </Pressable>
                  </View>
                </View>
              )}

              {tickets.map((ticket) => {
                const statusStyle = getStatusStyle(ticket.status);
                const isActive = activeTicket?.id === ticket.id;
                return (
                  <Pressable
                    key={ticket.id}
                    onPress={() => setActiveTicket(ticket)}
                    className="rounded-[18px] p-4 border gap-2"
                    style={{
                      borderColor: isActive ? "#a855f7" : "transparent",
                      backgroundColor: isActive
                        ? "rgba(168,85,247,0.1)"
                        : colors.surface
                    }}
                  >
                    <Text
                      className="font-bold text-base"
                      style={{ color: colors.text }}
                    >
                      {ticket.subject}
                    </Text>
                    <View className="flex-row justify-between items-center">
                      <Text
                        className="text-xs"
                        style={{ color: colors.subtext }}
                      >
                        {user.role === "Mentor"
                          ? `From: ${ticket.userName}`
                          : `Update: ${formatTimestamp(ticket.updatedAt)}`}
                      </Text>
                      <View
                        className="px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: statusStyle.bg }}
                      >
                        <Text
                          className="text-[10px] font-bold uppercase"
                          style={{ color: statusStyle.color }}
                        >
                          {ticket.status}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {showDetail && (
          <KeyboardAvoidingView
            className="flex-1"
            style={{ backgroundColor: colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            {!activeTicket ? (
              <View className="flex-1 items-center justify-center">
                <Text
                  className="text-5xl mb-3"
                  style={{ color: colors.subtext }}
                >
                  🛟
                </Text>
                <Text
                  className="font-semibold"
                  style={{ color: colors.subtext }}
                >
                  Pilih percakapan untuk melihat detail
                </Text>
              </View>
            ) : (
              <>
                <View
                  className="p-4 border-b flex-row items-center gap-3"
                  style={{
                    borderColor: colors.subtext + "22",
                    backgroundColor: colors.surface
                  }}
                >
                  {!isDesktop && (
                    <Pressable
                      onPress={() => setActiveTicket(null)}
                      className="p-2 rounded-full bg-slate-400/15"
                    >
                      <Text className="text-base text-slate-900">←</Text>
                    </Pressable>
                  )}
                  <View>
                    <Text
                      className="font-bold text-lg"
                      style={{ color: colors.text }}
                    >
                      {activeTicket.subject}
                    </Text>
                    <Text
                      className="text-xs mt-0.5"
                      style={{ color: colors.subtext }}
                    >
                      Ticket ID #{activeTicket.id.slice(0, 6)}
                    </Text>
                  </View>
                </View>

                <ScrollView
                  className="flex-1"
                  contentContainerStyle={{ padding: 16, gap: 12 }}
                  ref={scrollRef}
                >
                  {activeTicket.messages?.map((message, index) => {
                    const isMe = message.senderId === user.uid;
                    const isMentor = message.role === "Mentor";
                    return (
                      <View
                        key={`${message.timestamp}-${index}`}
                        className={`flex-row ${isMe ? "justify-end" : "justify-start"
                          }`}
                      >
                        <View
                          className={`max-w-[80%] rounded-[18px] p-3 border ${isMe
                              ? "bg-purple-500 border-purple-500"
                              : "bg-slate-900 border-slate-400/30"
                            }`}
                        >
                          <View className="flex-row justify-between mb-1.5">
                            <Text
                              className={`text-xs font-bold ${isMentor ? "text-yellow-300" : "text-slate-200"
                                }`}
                            >
                              {message.senderName}
                            </Text>
                            <Text className="text-[10px] text-slate-400">
                              {message.timestamp
                                ? new Date(message.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })
                                : ""}
                            </Text>
                          </View>
                          <Text className="text-slate-50 text-sm">{message.text}</Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>

                <View
                  className="flex-row items-center p-3 border-t gap-2"
                  style={{
                    borderColor: colors.subtext + "22",
                    backgroundColor: colors.surface
                  }}
                >
                  <TextInput
                    placeholder="Tulis balasan..."
                    placeholderTextColor="#94a3b8"
                    value={replyMessage}
                    onChangeText={setReplyMessage}
                    className="flex-1 bg-slate-400/15 rounded-full px-4 py-2.5 text-slate-50"
                  />
                  <Pressable
                    onPress={handleReply}
                    disabled={!replyMessage.trim()}
                    className="px-5 py-3 rounded-full bg-purple-500"
                    style={{ opacity: replyMessage.trim() ? 1 : 0.6 }}
                  >
                    <Text className="text-white font-bold">Kirim</Text>
                  </Pressable>
                </View>
              </>
            )}
          </KeyboardAvoidingView>
        )}
      </View>
    </SafeAreaView>
  );
}
