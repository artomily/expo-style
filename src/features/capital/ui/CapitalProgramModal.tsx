import React, { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  Pressable,
  Text,
  View
} from "react-native";
import { useTheme } from "@/shared/providers/ThemeProvider";

interface CapitalProgramModalProps {
  visible: boolean;
  onClose: (dontShowAgain: boolean) => void;
}

const PROGRAM_URL = "https://pro.sekolahtrading.id/setra-capital-program";

export default function CapitalProgramModal({
  visible,
  onClose
}: CapitalProgramModalProps): React.ReactElement {
  const { colors } = useTheme();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (!visible) {
      setDontShowAgain(false);
    }
  }, [visible]);

  const handleClose = () => {
    onClose(dontShowAgain);
  };

  const handleLearnMore = () => {
    Linking.openURL(PROGRAM_URL).catch((error) =>
      console.error("Failed to open program link", error)
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/60 justify-center items-center p-6">
        <View
          className="w-full rounded-3xl p-6 border border-yellow-400/30"
          style={{ backgroundColor: colors.surface }}
        >
          <View className="w-[72px] h-[72px] rounded-full bg-yellow-400/15 items-center justify-center self-center mb-4">
            <Text className="text-[28px]">💼</Text>
          </View>
          <Text
            className="text-[22px] font-extrabold text-center mb-4"
            style={{ color: colors.text }}
          >
            Setra Capital Program
          </Text>
          <View
            className="border rounded-[20px] p-4 mb-4 bg-slate-900/60"
            style={{ borderColor: colors.subtext + "33" }}
          >
            {[
              "Dana hingga $100,000: Buktikan skill Anda, kami sediakan modalnya.",
              "Profit Split 80%: Anda simpan mayoritas keuntungan.",
              "Refundable Fee: Biaya pendaftaran kembali 100% saat payout pertama."
            ].map((benefit) => (
              <View key={benefit} className="flex-row gap-3 mb-2.5">
                <Text className="text-green-500 font-bold">✔</Text>
                <Text
                  className="flex-1 text-sm"
                  style={{ color: colors.text }}
                >
                  {benefit}
                </Text>
              </View>
            ))}
          </View>
          <Pressable
            className="bg-yellow-400 py-3.5 rounded-2xl items-center mb-4"
            onPress={handleLearnMore}
          >
            <Text className="text-slate-900 font-bold">Pelajari Selengkapnya →</Text>
          </Pressable>
          <View
            className="flex-row justify-between items-center border-t pt-3"
            style={{ borderColor: colors.subtext + "22" }}
          >
            <Pressable
              className="flex-row items-center gap-2"
              onPress={() => setDontShowAgain((prev) => !prev)}
            >
              <Text className="text-base text-yellow-400">{dontShowAgain ? "☑" : "☐"}</Text>
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.subtext }}
              >
                Jangan tampilkan lagi
              </Text>
            </Pressable>
            <Pressable onPress={handleClose}>
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.text }}
              >
                Tutup
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
