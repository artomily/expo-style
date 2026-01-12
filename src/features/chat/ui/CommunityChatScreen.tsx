import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { useRouter } from "expo-router";

export default function CommunityChatScreen(): React.ReactElement {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const { colors } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("community");

  const handleJoinMembership = () => {
    Linking.openURL("https://www.youtube.com/channel/UCrwtoexMB4UD7v2r9DS7zzw/join");
  };

  const benefitsPremium = [
    { icon: "flash", label: "Premium Trading Signal" },
    { icon: "trending-up", label: "Discord Live Trading" },
    { icon: "logo-discord", label: "Akses Discord" },
  ];

  const benefitsEducation = [
    { icon: "chatbubbles", label: "Konsultasi Langsung" },
    { icon: "film", label: "Video Khusus Pelanggan" },
    { icon: "time", label: "Video Sebelum Tayang" },
    { icon: "calendar", label: "Event Trading Member" },
    { icon: "chatbubble-ellipses", label: "Ngobrol Saat Live" },
  ];

  const steps = [
    { number: 1, text: "Buka YouTube" },
    { number: 2, text: "Cari \"Rizki Aditama\"" },
    { number: 3, text: "Klik Tombol \"GABUNG\"", highlight: true },
  ];

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      {/* Mobile Header */}
      {!isLargeScreen && (
        <View className="p-4 flex-row justify-between items-center bg-white/40 backdrop-blur-sm border-b border-white/20">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 bg-red-500 rounded-lg items-center justify-center">
              <Text className="text-white font-black text-sm">ST</Text>
            </View>
            <Text className="font-black text-xl tracking-tighter">SETRA</Text>
          </View>
        </View>
      )}

      {/* Desktop Header */}
      {isLargeScreen && (
        <View className="px-10 pt-6 pb-8">
          <Text className="text-3xl font-black tracking-tighter">Community</Text>
          <Text className="text-sm text-slate-400 mt-1">
            Gabung komunitas elite trader SekolahTrading.ID.
          </Text>
        </View>
      )}

      {/* Main Container */}
      <View className="flex-1 mx-0 md:mx-4 lg:mx-8 mb-0 md:mb-4 lg:mb-6">
        <View
          className="flex-1 bg-white/60 md:backdrop-blur-2xl md:border md:border-white/60 md:rounded-[32px] lg:rounded-[40px] overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.03,
            shadowRadius: 50,
            elevation: 5,
          }}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              padding: isLargeScreen ? 48 : 16,
              paddingBottom: isLargeScreen ? 48 : 120,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Gradient Blob Background Effect */}
            <View className="relative">
              {/* Large Soft Red Blob - Top Right */}
              <View
                className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-red-400/20 rounded-full blur-[100px]"
                style={{
                  opacity: 0.4,
                }}
              />

              {/* Secondary Soft Blob - Bottom Left Area */}
              <View
                className="absolute top-[400px] -left-32 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-[120px]"
                style={{
                  opacity: 0.3,
                }}
              />

              <View className="max-w-5xl mx-auto w-full">
                {/* Hero Section */}
                <View className="items-center mb-10 pt-2 md:pt-0">
                  <View className="flex-row items-center gap-2 py-1 px-4 rounded-full bg-red-50 border border-red-100 mb-4">
                    <View className="w-6 h-6 rounded-full bg-red-100 items-center justify-center">
                      <Ionicons name="logo-youtube" size={16} color="#dc2626" />
                    </View>
                    <Text className="text-red-600 font-bold text-[11px] md:text-xs uppercase tracking-widest">
                      Official Membership
                    </Text>
                  </View>

                  <Text className="text-3xl md:text-5xl font-black text-slate-900 mb-4 text-center leading-tight">
                    Gabung Komunitas{"\n"}
                    <Text className="text-red-600">Elite Trader.</Text>
                  </Text>

                  <Text className="text-slate-500 text-base md:text-lg text-center max-w-2xl leading-relaxed">
                    Dapatkan akses eksklusif ke sinyal trading, live mentoring, dan komunitas langsung
                    melalui YouTube Membership Rizki Aditama.
                  </Text>
                </View>

                {/* Main Card */}
                <View
                  className="rounded-[32px] md:rounded-[40px] p-1 bg-white/90 relative"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.1,
                    shadowRadius: 24,
                    elevation: 5,
                  }}
                >
                  {/* Inner gradient blob - Right side accent */}
                  <View
                    className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[80px]"
                    style={{ opacity: 0.6 }}
                  />

                  <View className="p-6 md:p-10">
                    <View className={`${isLargeScreen ? "flex-row" : "flex-col"} gap-16 md:gap-10`}>
                      {/* Left Side - Benefits */}
                      <View className="flex-1">
                        <View className="mb-8">
                          <Text className="text-2xl font-bold text-slate-900 mb-2">
                            Benefit Eksklusif Member
                          </Text>
                          <Text className="text-slate-500 text-sm">
                            Upgrade skill trading Anda dengan akses premium.
                          </Text>
                        </View>

                        {/* Premium Benefits */}
                        <View className="bg-white/50 p-4 rounded-2xl border border-slate-100 mb-4">
                          <Text className="text-xs font-bold text-red-600 uppercase mb-3 tracking-wider">
                            Trading Tools & Sinyal
                          </Text>
                          <View className="space-y-3">
                            {benefitsPremium.map((benefit, index) => (
                              <View key={index} className="flex-row items-center gap-3 mb-3">
                                <View className="w-8 h-8 rounded-lg bg-red-100 items-center justify-center">
                                  <Ionicons name={benefit.icon as any} size={16} color="#dc2626" />
                                </View>
                                <Text className="text-slate-700 font-medium flex-1">
                                  {benefit.label}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>

                        {/* Education Benefits */}
                        <View className="bg-white/50 p-4 rounded-2xl border border-slate-100">
                          <Text className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">
                            Edukasi & Komunitas
                          </Text>
                          <View className={`flex-row flex-wrap gap-3`}>
                            {benefitsEducation.map((benefit, index) => (
                              <View key={index} className={`flex-row items-center gap-2 mb-2 ${isLargeScreen ? "w-[48%]" : "w-full"}`}>
                                <Ionicons name={benefit.icon as any} size={16} color="#10b981" />
                                <Text className="text-sm text-slate-600">{benefit.label}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>

                      {/* Right Side - CTA */}
                      <View className="flex-1 items-center justify-center bg-slate-50/70 rounded-[32px] p-6 md:p-8 border border-white/60 mt-4 md:mt-0">
                        {/* Loyalty Badges */}
                        <View className="mb-8">
                          <Text className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">
                            Loyalty Badges & Emojis
                          </Text>
                          <View className="flex-row justify-center gap-2 mb-2">
                            <View className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 border-2 border-white"
                              style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                              }}
                            />
                            <View className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-400 to-slate-600 border-2 border-white"
                              style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                              }}
                            />
                            <View className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 border-2 border-white"
                              style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                              }}
                            />
                            <View className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 border-2 border-white"
                              style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                              }}
                            />
                          </View>
                          <View className="flex-row justify-center gap-2 opacity-70">
                            <Ionicons name="happy" size={24} color="#475569" />
                            <Ionicons name="rocket" size={24} color="#475569" />
                            <Ionicons name="trending-up" size={24} color="#475569" />
                            <Ionicons name="cash" size={24} color="#475569" />
                          </View>
                        </View>

                        {/* Steps */}
                        <View className="w-full mb-8">
                          <Text className="font-bold text-slate-900 mb-4 text-center">
                            Cara Bergabung:
                          </Text>
                          {steps.map((step) => (
                            <View
                              key={step.number}
                              className={`flex-row items-center justify-between p-3 rounded-xl mb-2 ${step.highlight
                                ? "bg-red-50 border border-red-100"
                                : "bg-white border border-slate-200"
                                }`}
                              style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.05,
                                shadowRadius: 2,
                              }}
                            >
                              <View className="flex-row items-center gap-2">
                                <View
                                  className={`w-5 h-5 rounded-full items-center justify-center ${step.highlight ? "bg-red-200" : "bg-slate-100"
                                    }`}
                                >
                                  <Text
                                    className={`font-bold text-xs ${step.highlight ? "text-red-700" : "text-slate-600"
                                      }`}
                                  >
                                    {step.number}
                                  </Text>
                                </View>
                                <Text
                                  className={`text-xs ${step.highlight ? "font-bold text-slate-800" : "text-slate-500"
                                    }`}
                                >
                                  {step.text}
                                </Text>
                              </View>
                              <Ionicons
                                name={step.highlight ? "checkmark-circle" : "arrow-forward"}
                                size={16}
                                color={step.highlight ? "#dc2626" : "#94a3b8"}
                              />
                            </View>
                          ))}
                        </View>

                        {/* CTA Button */}
                        <Pressable
                          onPress={handleJoinMembership}
                          className="w-full max-w-sm"
                        >
                          <View
                            className="bg-red-600 rounded-xl py-3 md:py-4 px-4 items-center justify-center active:opacity-80"
                            style={{
                              shadowColor: "#dc2626",
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.3,
                              shadowRadius: 12,
                              elevation: 8,
                            }}
                          >
                            <View className="flex-row items-center justify-center gap-2 md:gap-3">
                              <Ionicons name="logo-youtube" size={24} color="white" style={{ flexShrink: 0 }} />
                              <Text className="text-white font-bold text-sm md:text-lg text-center flex-shrink">
                                Gabung Membership Sekarang
                              </Text>
                            </View>
                          </View>
                        </Pressable>

                        <Text className="text-[10px] text-slate-400 mt-4 text-center px-4">
                          Anda akan diarahkan ke halaman YouTube Membership resmi.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Mobile Bottom Navigation Bar - Handled globally */}
    </SafeAreaView>
  );
}
