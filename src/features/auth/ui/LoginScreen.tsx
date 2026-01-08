import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { useAuth } from "@/shared/providers/AuthProvider";

export default function LoginScreen(): React.ReactElement {
  const { colors } = useTheme();
  const { signInWithGoogle, signInAsGuest, authActionLoading, error } = useAuth();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1 justify-center p-6">
        <View
          className="rounded-3xl p-6 border shadow-lg shadow-black/15"
          style={{
            backgroundColor: colors.surface,
            borderColor: "rgba(148,163,184,0.2)"
          }}
        >
          <View className="w-[72px] h-[72px] rounded-full bg-yellow-400/10 self-center items-center justify-center mb-2">
            <Text className="text-[32px]">🎓</Text>
          </View>
          <Text
            className="text-[28px] font-extrabold text-center mb-1"
            style={{ color: colors.text }}
          >
            SETRA
          </Text>
          <Text
            className="text-center text-sm mb-2"
            style={{ color: colors.subtext }}
          >
            Sekolah Trading Community
          </Text>

          {error && (
            <View className="bg-red-500/12 p-3 rounded-xl border border-red-500/30 mb-2">
              <Text className="font-bold text-red-600 mb-1">Gagal Masuk</Text>
              <Text className="text-red-700 text-xs leading-4">{error}</Text>
            </View>
          )}

          <Pressable
            className="flex-row items-center justify-center bg-white py-3.5 rounded-2xl border border-slate-200 mt-2"
            style={{ opacity: authActionLoading ? 0.7 : 1 }}
            disabled={authActionLoading}
            onPress={signInWithGoogle}
          >
            {authActionLoading ? (
              <ActivityIndicator color="#0f172a" />
            ) : (
              <View className="flex-row items-center">
                <Text className="text-lg mr-2">🟦</Text>
                <Text className="font-bold text-slate-900">Masuk dengan Google</Text>
              </View>
            )}
          </Pressable>

          <Pressable
            className="py-3.5 rounded-2xl border mt-3"
            style={{
              opacity: authActionLoading ? 0.7 : 1,
              borderColor: colors.subtext + "33"
            }}
            disabled={authActionLoading}
            onPress={signInAsGuest}
          >
            <Text
              className="text-center font-semibold"
              style={{ color: colors.text }}
            >
              Masuk sebagai Tamu (Demo)
            </Text>
          </Pressable>

          <Text
            className="text-xs text-center mt-4 leading-[18px]"
            style={{ color: colors.subtext }}
          >
            Google Login tersedia di versi web. Gunakan mode tamu untuk demo cepat
            di perangkat mobile.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
