import React from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useDrawer } from "@/shared/context/DrawerContext";

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();
    const { setDrawerOpen } = useDrawer();

    const getActiveTab = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    const NavItem = ({
        label,
        iconName,
        route,
        onPress
    }: {
        label: string,
        iconName: keyof typeof Ionicons.glyphMap,
        route?: string,
        onPress?: () => void
    }) => {
        const isActive = route ? getActiveTab(route) : false;
        const color = isActive ? "#10b981" : "#64748b"; // Emerald-500 vs Slate-500

        // Determine icon name based on active state (filled vs outline)
        // Note: Menu usually doesn't have an outline variant that differs much, but we'll use standard convention
        const activeIcon = iconName;
        const inactiveIcon = `${iconName}-outline` as keyof typeof Ionicons.glyphMap;
        const finalIcon = isActive ? activeIcon : inactiveIcon;

        return (
            <Pressable
                className="items-center justify-center flex-1 py-1"
                onPress={() => {
                    if (onPress) {
                        onPress();
                    } else if (route) {
                        router.push(route as any);
                    }
                }}
            >
                <Ionicons
                    name={finalIcon}
                    size={24}
                    color={color}
                />
                <Text
                    className="text-[10px] mt-1 tracking-wide"
                    style={{
                        color: color,
                        fontWeight: isActive ? "700" : "500",
                        fontFamily: Platform.select({ ios: "System", android: "sans-serif" })
                    }}
                >
                    {label}
                </Text>
            </Pressable>
        );
    };

    return (
        <View
            className="absolute bottom-6 self-center w-[90%] max-w-[360px] bg-white rounded-[30px]"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 16,
                elevation: 8,
                paddingVertical: 12,
                paddingHorizontal: 16
            }}
        >
            <View className="flex-row justify-between items-center">
                <NavItem label="HOME" iconName="home" route="/" />
                <NavItem label="CAPITAL" iconName="briefcase" route="/capital" />
                <NavItem label="MODUL" iconName="school" route="/modules" />
                <NavItem label="COMMUNITY" iconName="people" route="/chat" />
                <NavItem label="MENU" iconName="menu" onPress={() => setDrawerOpen(true)} />
            </View>
        </View>
    );
}
