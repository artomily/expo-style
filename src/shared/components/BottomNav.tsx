import React from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
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
        icon,
        route,
        onPress
    }: {
        label: string,
        icon: keyof typeof Feather.glyphMap,
        route?: string,
        onPress?: () => void
    }) => {
        const isActive = route ? getActiveTab(route) : false;
        const color = isActive ? "#10b981" : "#64748b";

        return (
            <Pressable
                className="items-center justify-center flex-1 py-2"
                onPress={() => {
                    if (onPress) {
                        onPress();
                    } else if (route) {
                        router.push(route as any);
                    }
                }}
            >
                <Feather
                    name={icon}
                    size={24}
                    color={color}
                />
                <Text
                    className="text-[10px] mt-1"
                    style={{
                        color: color,
                        fontWeight: isActive ? "600" : "500"
                    }}
                >
                    {label}
                </Text>
            </Pressable>
        );
    };

    return (
        <View
            className="absolute bottom-6 left-4 right-4 bg-white border border-gray-100 rounded-[32px] overflow-hidden"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8
            }}
        >
            <View className="flex-row justify-around items-center py-3 px-4">
                <NavItem label="HOME" icon="home" route="/" />
                <NavItem label="CAPITAL" icon="trending-up" route="/capital" />
                <NavItem label="MODUL" icon="book-open" route="/modules" />
                <NavItem label="COMMUNITY" icon="users" route="/chat" />
                <NavItem label="MENU" icon="menu" onPress={() => setDrawerOpen(true)} />
            </View>
        </View>
    );
}
