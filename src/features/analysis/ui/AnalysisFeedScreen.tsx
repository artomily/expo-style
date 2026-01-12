import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db, appId } from "@/shared/api/firebase";
import { useAuth } from "@/shared/providers/AuthProvider";
import { useTheme } from "@/shared/providers/ThemeProvider";
import {
  ANALYSIS_CHANNELS,
  type AnalysisChannel
} from "@/features/analysis/constants/analysisChannels";

interface AnalysisMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  role?: string;
  createdAt?: Timestamp | { seconds?: number };
}

export default function AnalysisFeedScreen(): React.ReactElement | null {
  const { user } = useAuth();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [activeChannel, setActiveChannel] = useState<AnalysisChannel>(ANALYSIS_CHANNELS[0]);
  const [messages, setMessages] = useState<AnalysisMessage[]>([]);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<FlatList<AnalysisMessage>>(null);

  useEffect(() => {
    if (!user) return;
    const collectionName = `analysis_${activeChannel.id}`;
    const q = query(
      collection(db, "artifacts", appId, "public", "data", collectionName),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const data = snapshot.docs
        .map((doc: any) => ({ id: doc.id, ...doc.data() } as AnalysisMessage))
        .reverse();
      setMessages(data);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    });
    return () => unsubscribe();
  }, [activeChannel, user]);

  const canPost = user?.role === "Mentor";

  const handleSend = async () => {
    if (!user || !canPost) return;
    const trimmed = input.trim();
    if (!trimmed) return;
    try {
      await addDoc(
        collection(
          db,
          "artifacts",
          appId,
          "public",
          "data",
          `analysis_${activeChannel.id}`
        ),
        {
          text: trimmed,
          userId: user.uid,
          userName: user.displayName,
          role: user.role,
          createdAt: serverTimestamp()
        }
      );
      setInput("");
    } catch (error) {
      console.error("Failed to send analysis message", error);
    }
  };

  const renderMessage = ({ item }: { item: AnalysisMessage }) => {
    const timestamp =
      item.createdAt instanceof Timestamp
        ? item.createdAt.toDate()
        : item.createdAt?.seconds
          ? new Date(item.createdAt.seconds * 1000)
          : null;

    return (
      <View
        className="bg-slate-900/95 rounded-[18px] p-3.5 border border-slate-400/20"
      >
        <View className="flex-row justify-between mb-1.5">
          <Text
            className={`font-bold ${item.role === "Mentor" ? "text-yellow-400" : "text-slate-50"
              }`}
          >
            {item.userName}
          </Text>
          {timestamp && (
            <Text className="text-slate-400 text-xs">
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </Text>
          )}
        </View>
        <Text className="text-slate-200 leading-5">{item.text}</Text>
      </View>
    );
  };

  if (!user) {
    return null;
  }

  const showSidebar = isDesktop || menuOpen;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View
        className="flex-1"
        style={{ flexDirection: isDesktop ? "row" : "column" }}
      >
        {showSidebar && (
          <View
            className="p-4 gap-3 border-r"
            style={{
              width: isDesktop ? 280 : "100%",
              borderRightWidth: isDesktop ? 1 : 0,
              backgroundColor: colors.surface,
              borderColor: colors.subtext + "22"
            }}
          >
            <View className="flex-row justify-between items-center mb-3">
              <Text
                className="font-bold text-base"
                style={{ color: colors.accent }}
              >
                Analysis Hub
              </Text>
              {!isDesktop && (
                <Pressable onPress={() => setMenuOpen(false)}>
                  <Text className="text-slate-400 font-bold text-base">✕</Text>
                </Pressable>
              )}
            </View>
            {ANALYSIS_CHANNELS.map((channel: AnalysisChannel) => (
              <Pressable
                key={channel.id}
                onPress={() => {
                  setActiveChannel(channel);
                  setMenuOpen(false);
                }}
                className={`rounded-[18px] p-3 ${channel.id === activeChannel.id
                  ? "border"
                  : ""
                  }`}
                style={{
                  backgroundColor:
                    channel.id === activeChannel.id
                      ? "rgba(250,204,21,0.15)"
                      : "rgba(15,23,42,0.6)",
                  borderColor:
                    channel.id === activeChannel.id
                      ? "rgba(250,204,21,0.4)"
                      : "transparent"
                }}
              >
                <Text
                  className={`font-bold ${channel.id === activeChannel.id
                    ? "text-yellow-400"
                    : "text-slate-50"
                    }`}
                >
                  {channel.name}
                </Text>
                <Text className="text-slate-400 text-xs mt-1">{channel.description}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={80}
        >
          <View
            className="p-4 border-b flex-row justify-between items-center gap-3"
            style={{
              borderColor: colors.subtext + "22",
              backgroundColor: colors.surface
            }}
          >
            {!isDesktop && (
              <Pressable
                onPress={() => setMenuOpen(true)}
                className="p-2 rounded-full border border-slate-400/30"
              >
                <Text className="font-extrabold text-slate-300">☰</Text>
              </Pressable>
            )}
            <View className="flex-1">
              <Text
                className="text-xl font-bold"
                style={{ color: colors.text }}
              >
                {activeChannel.name}
              </Text>
              <Text
                className="mt-1"
                style={{ color: colors.subtext }}
              >
                {activeChannel.description}
              </Text>
            </View>
            <View className="px-3 py-1.5 rounded-full bg-yellow-400/12">
              <Text className="text-yellow-400 font-bold text-xs">
                {activeChannel.id === "premium" ? "Signal Premium" : "Mentor Broadcast"}
              </Text>
            </View>
          </View>

          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ padding: 18, gap: 12 }}
          />

          {canPost ? (
            <View
              className="border-t p-4"
              style={{
                borderColor: colors.subtext + "22",
                backgroundColor: colors.surface
              }}
            >
              <TextInput
                placeholder={`Posting analisa ${activeChannel.name}...`}
                placeholderTextColor="#94a3b8"
                value={input}
                onChangeText={setInput}
                className="min-h-[48px] rounded-2xl px-4 py-3 bg-slate-900/90 text-slate-50 mb-2.5"
                multiline
              />
              <Pressable
                className="self-end bg-blue-600 px-6 py-2.5 rounded-full"
                onPress={handleSend}
              >
                <Text className="text-slate-50 font-bold">Kirim</Text>
              </Pressable>
            </View>
          ) : (
            <View
              className="border-t p-4"
              style={{
                borderColor: colors.subtext + "22",
                backgroundColor: colors.surface
              }}
            >
              <Text
                className="text-xs text-center"
                style={{ color: colors.subtext }}
              >
                Channel ini adalah siaran mentor. Upgrade ke role Mentor untuk
                mengirim Signal Premium.
              </Text>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
