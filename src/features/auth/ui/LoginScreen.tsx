import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/shared/providers/AuthProvider";

export default function LoginScreen(): React.ReactElement {
  const { signInAsGuest, authActionLoading, error } = useAuth();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const [email, setEmail] = useState("shrvitasaharani@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#ecfdf5]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Card */}
          <View
            className="w-full bg-white rounded-[32px] p-8 md:p-12 relative overflow-hidden"
            style={{
              maxWidth: 480,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.05,
              shadowRadius: 40,
              elevation: 4,
            }}
          >
            {/* Header Section */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-2xl bg-emerald-50 items-center justify-center mb-4">
                <Ionicons name="school-outline" size={32} color="#10b981" />
              </View>
              <Text className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">
                Sekolah Trading
              </Text>
              <Text className="text-sm text-slate-400">
                Silakan masuk ke akun Anda
              </Text>
            </View>

            {/* Error Message */}
            {error && (
              <View className="bg-red-50 p-3 rounded-xl border border-red-100 mb-6 flex-row items-center gap-2">
                <Ionicons name="alert-circle" size={20} color="#ef4444" />
                <Text className="text-red-500 text-xs flex-1 font-medium">{error}</Text>
              </View>
            )}

            {/* Form Section */}
            <View className="space-y-5">
              {/* Email Input */}
              <View>
                <Text className="text-xs font-bold text-slate-600 mb-2 ml-1">
                  Email / Username
                </Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 focus:border-emerald-500 transition-colors">
                  <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                  <TextInput
                    className="flex-1 ml-3 text-slate-700 text-sm font-medium"
                    placeholder="Enter your email"
                    placeholderTextColor="#cbd5e1"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-xs font-bold text-slate-600 mb-2 ml-1">
                  Kata Sandi
                </Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5">
                  <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
                  <TextInput
                    className="flex-1 ml-3 text-slate-700 text-sm font-medium"
                    placeholder="Enter your password"
                    placeholderTextColor="#cbd5e1"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#94a3b8"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Options Row */}
              <View className="flex-row items-center justify-between pt-1">
                <Pressable
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center gap-2"
                >
                  <View
                    className={`w-5 h-5 rounded-md border items-center justify-center ${rememberMe ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-300"
                      }`}
                  >
                    {rememberMe && <Ionicons name="checkmark" size={12} color="white" />}
                  </View>
                  <Text className="text-xs text-slate-500 font-medium">Ingat saya</Text>
                </Pressable>
                <Pressable>
                  <Text className="text-xs font-bold text-emerald-600">Lupa sandi?</Text>
                </Pressable>
              </View>

              {/* Submit Button */}
              <Pressable
                className="w-full bg-emerald-500 py-4 rounded-2xl items-center justify-center shadow-lg shadow-emerald-500/30 active:opacity-90 mt-2"
                onPress={signInAsGuest} // Using guest login as demo implementation
                disabled={authActionLoading}
              >
                {authActionLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-base tracking-wide">
                    Masuk Sekarang
                  </Text>
                )}
              </Pressable>
            </View>

            {/* Divider */}
            <View className="flex-row items-center gap-4 my-8">
              <View className="flex-1 h-[1px] bg-slate-100" />
              <Text className="text-[10px] text-slate-300 font-bold uppercase tracking-widest italic">
                Atau
              </Text>
              <View className="flex-1 h-[1px] bg-slate-100" />
            </View>

            {/* Footer Actions */}
            <View className="items-center gap-6">
              <View className="flex-row items-center">
                <Text className="text-xs text-slate-500">Belum punya akun? </Text>
                <Pressable>
                  <Text className="text-xs font-bold text-emerald-600">Daftar Program</Text>
                </Pressable>
              </View>

              <Pressable
                className="flex-row items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                onPress={signInAsGuest}
              >
                <Ionicons name="arrow-back" size={14} color="#64748b" />
                <Text className="text-xs font-medium text-slate-500">
                  Kembali ke Beranda
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Copyright Footer */}
          <Text className="text-[10px] text-emerald-800/40 text-center mt-8">
            © 2024 Sekolah Trading. Keamanan data Anda adalah prioritas kami.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
