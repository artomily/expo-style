import React from "react";
import { View, Text, Pressable, useWindowDimensions, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Footer(): React.ReactElement {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768;

    const openLink = (url: string) => {
        // Replace with actual URLs when available
        Linking.openURL(url);
    };

    return (
        <View
            className="mt-4 mb-24 md:mb-8"
            style={{ paddingHorizontal: isLargeScreen ? 24 : 0 }}
        >
            <View
                className="bg-white/60 md:backdrop-blur-2xl md:border md:border-white/60 md:rounded-[40px] p-8 md:p-12 overflow-hidden relative"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.03,
                    shadowRadius: 50,
                    elevation: 5,
                }}
            >
                {/* Decoration Glow */}
                <View
                    className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full blur-3xl"
                    style={{
                        backgroundColor: "rgba(236, 253, 245, 0.5)",
                        zIndex: -10,
                    }}
                />

                {/* Top Section - Logo and Links */}
                <View className={`flex-${isLargeScreen ? "row" : "col"} justify-between items-center gap-6 mb-10`}>
                    {/* Logo */}
                    <View className="flex-row items-center gap-2">
                        <View className="w-8 h-8 bg-emerald-500 rounded-lg items-center justify-center">
                            <Ionicons name="school-outline" size={16} color="white" />
                        </View>
                        <Text className="font-black text-xl tracking-tighter uppercase text-slate-800">
                            Sekolah <Text className="text-emerald-500">Trading</Text>
                        </Text>
                    </View>

                    {/* Links */}
                    <View className={`flex-row flex-wrap ${isLargeScreen ? "justify-end" : "justify-center"} gap-x-8 gap-y-4`}>
                        <Pressable onPress={() => openLink("https://setra.com/disclaimer")}>
                            <Text className="text-xs md:text-sm font-bold text-slate-500 hover:text-emerald-600">
                                Disclaimer
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => openLink("https://setra.com/terms")}>
                            <Text className="text-xs md:text-sm font-bold text-slate-500 hover:text-emerald-600">
                                Terms & Conditions
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => openLink("https://setra.com/risk")}>
                            <Text className="text-xs md:text-sm font-bold text-slate-500 hover:text-emerald-600">
                                Risk Disclosure
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Bottom Section - Disclaimer and Copyright */}
                <View className="pt-8 border-t border-white/60">
                    <View className={`flex-${isLargeScreen ? "row" : "col"} justify-between items-start ${isLargeScreen ? "md:items-center" : ""} gap-4`}>
                        <Text className="text-slate-500 text-[10px] md:text-xs leading-relaxed max-w-2xl font-medium">
                            SETRA CAPITAL PROGRAM adalah program internal perusahaan. Bukan investasi, bukan pengelolaan dana publik, dan tidak menghimpun dana masyarakat. Tidak ada jaminan profit.
                        </Text>
                        <Text className="text-slate-400 text-[10px] md:text-xs font-bold">
                            © {new Date().getFullYear()}. Built for Traders.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
