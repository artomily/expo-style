import LoginScreen from "@/features/auth/ui/LoginScreen";
import BottomNav from "@/shared/components/BottomNav";
import Footer from "@/shared/components/Footer";
import { DrawerProvider, useDrawer } from "@/shared/context/DrawerContext";
import { useAuth } from "@/shared/providers/AuthProvider";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Link, Slot, usePathname } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  comingSoon?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/", icon: "home-outline" },
];

const PROGRAM_ITEMS: NavItem[] = [
  { label: "Setra Capital Program", href: "/capital", icon: "briefcase-outline" },
  { label: "Learning Center", href: "/modules", icon: "school-outline" },
  { label: "Community", href: "/chat", icon: "people-outline" },
  { label: "Road to Funded", href: "/funded", icon: "trophy-outline", comingSoon: true },
  { label: "Extra Income", href: "/income", icon: "cash-outline", comingSoon: true },
];

export default function NavigationShell(): React.ReactElement {
  return (
    <DrawerProvider>
      <NavigationContent />
    </DrawerProvider>
  );
}

function NavigationContent(): React.ReactElement {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const pathname = usePathname();
  const { colors, theme, toggleTheme } = useTheme();
  const { user, loading: authLoading, signOut } = useAuth();
  const { drawerOpen, setDrawerOpen } = useDrawer();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const insets = useSafeAreaInsets();

  if (authLoading) {
    return (
      <View
        className="flex-1 items-center justify-center p-6"
        style={{ backgroundColor: colors.background }}
      >
        <ActivityIndicator color={colors.accent} size="large" />
        <Text
          className="mt-3 font-semibold"
          style={{ color: colors.subtext }}
        >
          Menyiapkan sesi Anda...
        </Text>
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  // renderNavItem moved inside renderSidebar for theme access

  const renderSidebar = () => {
    const sidebarBg = theme === 'dark' ? 'rgba(2, 6, 23, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    const borderColor = theme === 'dark' ? 'border-white/10' : 'border-slate-100/50';
    const textColor = theme === 'dark' ? 'text-white' : 'text-slate-800';
    const subTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

    return (
      <View
        className={`h-full flex-col backdrop-blur-xl border-r ${borderColor}`}
        style={{
          width: isDesktop ? 288 : "100%",
          backgroundColor: sidebarBg,
        }}
      >
        {/* Logo */}
        <View className="flex-row items-center gap-3 p-8 pb-0">
          <Image
            source={require("../../../assets/images/LogoST.png")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
          <Text className={`text-2xl font-black tracking-tighter uppercase ${textColor}`}>
            SETRA<Text className="text-emerald-500">.</Text>
          </Text>
          {!isDesktop && (
            <Pressable
              onPress={() => setDrawerOpen(false)}
              className={`ml-auto p-2 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`}
            >
              <Ionicons name="close" size={20} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
            </Pressable>
          )}
        </View>

        {/* Navigation - Scrollable */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            padding: 32,
            paddingTop: 48,
            paddingBottom: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Navigation */}
          <View className="space-y-2">
            {/* Main Items */}
            {NAV_ITEMS.map((item) => {
              const active = item.href === pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  asChild
                  onPress={() => setDrawerOpen(false)}
                >
                  <Pressable
                    className={`w-full flex-row items-center gap-4 px-6 py-4 rounded-2xl transition-all relative ${active
                      ? (theme === 'dark' ? "bg-white/10 shadow-sm" : "bg-white/80 shadow-sm")
                      : "hover:bg-emerald-50/50"
                      }`}
                  >
                    {active && (
                      <View className="absolute left-0 w-1.5 h-6 bg-emerald-500 rounded-full" />
                    )}
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={active ? "#10b981" : (theme === 'dark' ? "#94a3b8" : "#64748b")}
                    />
                    <Text
                      className={`text-sm ${active ? "font-bold text-emerald-500" : (theme === 'dark' ? "text-slate-400" : "text-slate-500")}`}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                </Link>
              );
            })}

            {/* Program Section */}
            <View className="pt-4 pb-2">
              <Text className="px-6 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">
                Materi & Program
              </Text>
              <View className="space-y-2">
                {PROGRAM_ITEMS.map((item) => {
                  const active = item.href === pathname;
                  if (item.comingSoon) {
                    return (
                      <View
                        key={item.href}
                        className={`w-full flex-row items-center gap-4 px-6 py-4 rounded-2xl border relative ${theme === 'dark' ? 'bg-slate-800/50 border-white/5' : 'bg-slate-50/70 border-slate-200/70'}`}
                      >
                        <View className="absolute left-0 w-1.5 h-6 bg-transparent rounded-full" />
                        <Ionicons name={item.icon as any} size={20} color="#94a3b8" />
                        <Text className="text-sm font-sans text-slate-400 flex-1">{item.label}</Text>
                        <View className={`border px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-white/90 border-slate-200'}`}>
                          <Text className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                            Soon
                          </Text>
                        </View>
                      </View>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      asChild
                      onPress={() => setDrawerOpen(false)}
                    >
                      <Pressable
                        className={`w-full flex-row items-center gap-4 px-6 py-4 rounded-2xl transition-all relative ${active
                          ? (theme === 'dark' ? "bg-white/10 shadow-sm" : "bg-white/80 shadow-sm")
                          : "hover:bg-emerald-50/50"
                          }`}
                      >
                        {active && (
                          <View className="absolute left-0 w-1.5 h-6 bg-emerald-500 rounded-full" />
                        )}
                        <Ionicons
                          name={item.icon as any}
                          size={20}
                          color={active ? "#10b981" : (theme === 'dark' ? "#94a3b8" : "#64748b")}
                        />
                        <Text
                          className={`text-sm ${active ? "font-bold text-emerald-500" : (theme === 'dark' ? "text-slate-400" : "text-slate-500")}`}
                        >
                          {item.label}
                        </Text>
                      </Pressable>
                    </Link>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* User Profile Footer - Fixed at Bottom */}
        <View className="px-8 pt-0 pb-8" style={{ paddingBottom: isDesktop ? 32 : 96 }}>
          {/* Theme Toggle */}
          <View className={`flex-row p-1 rounded-xl mb-4 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-100'}`}>
            <Pressable
              onPress={() => theme === 'dark' && toggleTheme()}
              className={`flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-lg ${theme === 'light' ? 'bg-white shadow-sm' : ''}`}
            >
              <Ionicons name="sunny" size={16} color={theme === 'light' ? '#f59e0b' : '#94a3b8'} />
              <Text className={`text-xs font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-500'}`}>Light</Text>
            </Pressable>
            <Pressable
              onPress={() => theme === 'light' && toggleTheme()}
              className={`flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-lg ${theme === 'dark' ? 'bg-slate-800 shadow-sm' : ''}`}
            >
              <Ionicons name="moon" size={16} color={theme === 'dark' ? '#facc15' : '#94a3b8'} />
              <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-500'}`}>Dark</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => setProfileModalOpen(true)}
            className={`w-full p-4 rounded-3xl border flex-row items-center gap-3 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-emerald-50/50 border-emerald-100'}`}
          >
            <View className={`w-10 h-10 rounded-full items-center justify-center border shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-white'}`}>
              <Ionicons name="person" size={20} color="#10b981" />
            </View>
            <View className="flex-1">
              <Text className={`text-sm font-bold ${textColor}`} numberOfLines={1}>
                {user.displayName || "Guest Trader"}
              </Text>
              <Text className="text-xs text-slate-500 capitalize">
                User
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
          </Pressable>
        </View>

        {/* Profile Modal - Inside Sidebar */}
        {profileModalOpen && (
          <>
            <Pressable
              className="absolute inset-0 bg-black/40 z-40"
              onPress={() => setProfileModalOpen(false)}
            />
            <View
              className="absolute bottom-0 left-0 right-0 items-center justify-end p-4 z-50"
              style={{ paddingBottom: isDesktop ? 32 : 96 }}
            >
              <View className={`w-full max-w-sm rounded-3xl shadow-2xl border p-6 md:p-8 relative ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-white/80'}`}>
                <Pressable
                  onPress={() => setProfileModalOpen(false)}
                  className={`absolute -top-4 -right-4 w-10 h-10 rounded-full border items-center justify-center shadow-md ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                >
                  <Ionicons name="close" size={16} color="#64748b" />
                </Pressable>

                {/* Profile Header */}
                <View className="flex-row items-center gap-3 mb-6">
                  <View className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center">
                    <Ionicons name="person" size={20} color="#10b981" />
                  </View>
                  <View className="flex-1">
                    <Text className={`text-sm font-semibold ${textColor}`}>
                      Profile Saya
                    </Text>
                    <Text className="text-xs text-slate-500" numberOfLines={1}>
                      {user.displayName || "user@setra.com"}
                    </Text>
                  </View>
                </View>

                {/* Actions */}
                <View className="space-y-3">
                  <Link href="/profile" asChild onPress={() => setProfileModalOpen(false)}>
                    <Pressable className={`flex-row items-center justify-between gap-3 px-4 py-3 rounded-2xl border active:bg-emerald-50/50 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                      <Text className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        Edit Profile
                      </Text>
                      <Ionicons name="arrow-forward" size={16} color="#94a3b8" />
                    </Pressable>
                  </Link>

                  <View className="pt-2">
                    <Pressable
                      onPress={() => {
                        setProfileModalOpen(false);
                        signOut();
                      }}
                      className="w-full flex-row items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 active:bg-slate-800"
                    >
                      <Ionicons name="log-out-outline" size={16} color="white" />
                      <Text className="text-white font-semibold">Logout</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: "#F8FAFC",
        flexDirection: isDesktop ? "row" : "column",
      }}
    >
      {/* Desktop Sidebar */}
      {isDesktop && renderSidebar()}

      {/* Mobile Header Removed - Sidebar accessed via Bottom Nav */}
      {!isDesktop && null}

      {/* Mobile Drawer */}
      {!isDesktop && drawerOpen && (
        <>
          <Pressable
            className="absolute inset-0 z-40 bg-black/40"
            onPress={() => setDrawerOpen(false)}
          />
          <View
            className="absolute top-0 bottom-0 left-0 z-50"
            style={{
              width: Math.min(width * 0.85, 360),
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 4 },
              elevation: 12,
            }}
          >
            {renderSidebar()}
          </View>
        </>
      )}

      {/* Main Content */}
      <View className="flex-1 relative">
        {/* Soft Green Accent Background */}
        {isDesktop && (
          <View
            className="absolute top-0 left-0 bottom-0 pointer-events-none"
            style={{ width: 400, overflow: 'hidden' }}
          >
            <View
              className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-emerald-400/20 blur-[100px]"
              style={{ opacity: 0.15 }}
            />
            <View
              className="absolute top-[20%] -left-[100px] w-[400px] h-[400px] rounded-full bg-teal-400/10 blur-[80px]"
              style={{ opacity: 0.1 }}
            />
          </View>
        )}

        {/* Container that conditionally handles scrolling */}
        {pathname === "/modules" ? (
          <View className="flex-1">
            <Slot />
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: isDesktop ? 0 : 100 // Add padding for bottom nav on mobile
            }}
          >
            <Slot />

            {/* Global Footer */}
            <Footer />
          </ScrollView>
        )}

        {/* Global Bottom Navigation for Mobile */}
        {!isDesktop && <BottomNav />}
      </View>
    </View>
  );
}
