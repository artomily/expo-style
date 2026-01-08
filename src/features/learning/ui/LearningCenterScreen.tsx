import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TRADING_MODULES } from "@/features/learning/constants/tradingModules";
import type { TradingModule } from "@/features/learning/constants/tradingModules";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { useRouter } from "expo-router";
import { useDrawer } from "@/shared/context/DrawerContext";


type ViewMode = "list" | "player";

export default function LearningCenterScreen(): React.ReactElement {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768; // Updated to 768 for Tablet/Desktop
  const { colors, theme } = useTheme();
  const router = useRouter();
  const { setDrawerOpen } = useDrawer();

  const [selectedModule, setSelectedModule] = useState<TradingModule>(
    TRADING_MODULES[0]
  );
  const [selectedCategory, setSelectedCategory] = useState("RECOMMENDED");
  const [viewMode, setViewMode] = useState<ViewMode>(isLargeScreen ? "player" : "list");
  const [activeTab, setActiveTab] = useState("modul");

  // Categories with icons
  const categories = [
    { name: "RECOMMENDED", icon: "layers-outline" },
    { name: "TEKNIKAL", icon: "stats-chart-outline" },
    { name: "PSIKOLOGI", icon: "trophy-outline" },
    { name: "FUNDAMENTAL", icon: "globe-outline" },

  ];

  // Filter modules by category (for now all are "Recommended")
  const filteredModules = TRADING_MODULES.filter(
    (module) => module.category.toUpperCase() === selectedCategory
  );

  useEffect(() => {
    setViewMode(isLargeScreen ? "player" : "list");
  }, [isLargeScreen]);

  const handleSelectModule = (module: TradingModule) => {
    setSelectedModule(module);
    if (!isLargeScreen) {
      setViewMode("player");
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    const filtered = TRADING_MODULES.filter(
      (m) => m.category.toUpperCase() === category
    );
    if (filtered.length > 0) {
      setSelectedModule(filtered[0]);
    }
    if (!isLargeScreen) {
      setViewMode("list");
    }
  };

  const shouldShowList = viewMode === "list" || isLargeScreen;
  const shouldShowPlayer = viewMode === "player" || isLargeScreen;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      {/* Mobile Header */}
      {!isLargeScreen && (
        <View className="p-4 flex-row justify-between items-center bg-white/40 backdrop-blur-sm border-b border-white/20">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 bg-emerald-500 rounded-lg items-center justify-center">
              <Text className="text-white font-black text-sm">ST</Text>
            </View>
            <Text className="font-black text-xl tracking-tighter">SETRA</Text>
          </View>
        </View>
      )}

      {/* Desktop Header */}
      {isLargeScreen && (
        <View className="px-10 pt-6 pb-8">
          <Text className="text-3xl font-black tracking-tighter">Sekolah Trading</Text>
          <Text className="text-sm text-slate-400 mt-1">
            Selamat datang di ekosistem trading Setra.
          </Text>
        </View>
      )}

      {/* Main Glassmorphic Container */}
      <View className="flex-1 mx-0 md:mx-6 mb-0 md:mb-6">
        <View
          className="flex-1 bg-white/60 md:backdrop-blur-2xl md:border md:border-white/60 md:rounded-[40px] overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.03,
            shadowRadius: 50,
            elevation: 5,
          }}
        >
          {/* Header Inside Container */}
          <View className="p-4 md:p-8 border-b border-white/40 bg-white/20">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 md:w-14 md:h-14 bg-emerald-500 rounded-xl md:rounded-2xl items-center justify-center shadow-lg shadow-emerald-500/20">
                <Ionicons name="school-outline" size={isLargeScreen ? 28 : 20} color="white" />
              </View>
              <View>
                <Text className="font-black text-lg md:text-xl tracking-tight">
                  Kurikulum Sekolah Trading
                </Text>
                <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Video Pembelajaran
                </Text>
              </View>
            </View>
          </View>

          {/* Content Area */}
          <View className="flex-1 flex-row">
            {/* Playlist Sidebar */}
            {shouldShowList && (
              <View
                className={`${isLargeScreen ? "w-[400px]" : "w-full"} border-r border-white/40 bg-transparent`}
              >
                <ScrollView
                  className="flex-1 p-4 md:p-6"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: isLargeScreen ? 80 : 200 }}
                >
                  <Text className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    Modul {selectedCategory}
                  </Text>

                  {filteredModules.length === 0 ? (
                    <View className="p-4 items-center">
                      <Text className="text-slate-400 font-bold text-xs">
                        Belum ada video di kategori ini.
                      </Text>
                    </View>
                  ) : (
                    filteredModules.map((module, index) => {
                      const isSelected = selectedModule.id === module.id;
                      return (
                        <Pressable
                          key={module.id}
                          onPress={() => handleSelectModule(module)}
                          className={`p-3 md:p-4 rounded-2xl md:rounded-3xl border mb-3 transition-all ${isSelected
                            ? "bg-white border-emerald-200 shadow-xl"
                            : "bg-white/30 border-transparent"
                            }`}
                        >
                          <View className="flex-row gap-3 md:gap-4">
                            <View className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl md:rounded-2xl items-center justify-center shrink-0">
                              <Text className="text-emerald-600 font-black text-base md:text-lg">
                                {index + 1}
                              </Text>
                            </View>
                            <View className="flex-1">
                              <Text className="text-[9px] text-emerald-500 font-bold uppercase tracking-tighter mb-0.5">
                                {module.category}
                              </Text>
                              <Text className="font-bold text-xs md:text-sm text-slate-800 leading-snug">
                                {module.title}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      );
                    })
                  )}
                </ScrollView>
              </View>
            )}

            {/* Video Player Area */}
            {shouldShowPlayer && (
              <View className="flex-1 p-4 md:p-10 bg-white/20">
                <ScrollView
                  className="flex-1"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: isLargeScreen ? 80 : 200 }}
                >
                  <View className="max-w-3xl mx-auto w-full">
                    {/* Back Button for Mobile */}
                    {!isLargeScreen && (
                      <Pressable
                        onPress={() => setViewMode("list")}
                        className="flex-row items-center gap-2 mb-4"
                      >
                        <Ionicons name="chevron-back" size={16} color="#10b981" />
                        <Text className="text-xs font-bold text-emerald-600">
                          Kembali ke Daftar
                        </Text>
                      </Pressable>
                    )}

                    {selectedModule ? (
                      <View className="space-y-6 md:space-y-8">
                        {/* Video Player */}
                        <View
                          className="aspect-video bg-slate-900 rounded-2xl overflow-hidden"
                          style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.3,
                            shadowRadius: 24,
                            elevation: 10,
                          }}
                        >
                          {/* Placeholder for YouTube iframe */}
                          <View className="w-full h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                            <View className="items-center">
                              <View className="w-16 h-16 bg-red-600 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-red-600/40">
                                <Ionicons name="play" size={32} color="white" style={{ marginLeft: 4 }} />
                              </View>
                              <Text className="text-white/60 text-xs">
                                YouTube Player: {selectedModule.youtubeId}
                              </Text>
                            </View>
                          </View>
                        </View>

                        {/* Video Title */}
                        <View>
                          <Text className="text-xl md:text-3xl font-black tracking-tighter leading-tight text-slate-900">
                            {selectedModule.title}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View className="items-center py-20">
                        <Text className="text-slate-500">
                          Pilih video dari daftar untuk memulai.
                        </Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Category Tabs - Fixed at Bottom */}
      <View
        style={{
          position: "absolute",
          bottom: isLargeScreen ? 24 : 110,
          left: 0,
          right: 0,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <View
          className="flex-row items-center p-1.5 bg-white/90 backdrop-blur-xl rounded-full border border-white/60"
          style={{
            maxWidth: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 10,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 4, paddingHorizontal: 4 }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <Pressable
                  key={cat.name}
                  onPress={() => handleSelectCategory(cat.name)}
                  className={`flex-row items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all ${isActive
                    ? "bg-emerald-500 shadow-lg"
                    : "bg-transparent"
                    }`}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={16}
                    color={isActive ? "white" : "#64748b"}
                  />
                  <Text
                    className={`text-[10px] md:text-xs font-black uppercase ${isActive ? "text-white" : "text-slate-500"
                      }`}
                  >
                    {cat.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Mobile Bottom Navigation Bar - Handled globally in NavigationShell */}
    </SafeAreaView>
  );
}
