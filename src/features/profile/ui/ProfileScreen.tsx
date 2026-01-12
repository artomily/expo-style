import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    Image,
    useWindowDimensions,
    Platform
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { useAuth } from "@/shared/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useDrawer } from "@/shared/context/DrawerContext";

export default function ProfileScreen() {
    const { colors, theme } = useTheme();
    const { user } = useAuth();
    const router = useRouter();
    const { setDrawerOpen } = useDrawer();
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;
    const insets = useSafeAreaInsets();

    // State for forms
    const [showAvatarSelection, setShowAvatarSelection] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("avatar1");
    const [showDomicileForm, setShowDomicileForm] = useState(false);

    // Password visibility
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const AvatarOption = ({ id, source }: { id: string, source: any }) => (
        <Pressable
            onPress={() => setSelectedAvatar(id)}
            className={`items-center justify-center p-1 rounded-xl border-2 transition-all ${selectedAvatar === id ? "border-emerald-500 bg-emerald-50" : "border-slate-200"
                }`}
        >
            <Image
                source={source}
                style={{ width: 48, height: 48, borderRadius: 10 }}
            />
        </Pressable>
    );

    return (
        <View
            className="flex-1"
            style={{
                backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                paddingTop: isDesktop ? 0 : insets.top
            }}
        >
            {/* Mobile Header */}
            {!isDesktop && (
                <View className="px-4 py-3 flex-row justify-between items-center bg-white/70 backdrop-blur-sm border-b border-white/40 sticky top-0 z-10">
                    <Pressable onPress={() => setDrawerOpen(true)} className="flex-row items-center gap-2">
                        <View className="w-8 h-8 bg-emerald-500 rounded-lg items-center justify-center">
                            <Ionicons name="school-outline" size={18} color="white" />
                        </View>
                        <Text className="font-black text-xl tracking-tighter text-slate-800">SETRA.</Text>
                    </Pressable>
                    <View className="w-8 h-8" />
                </View>
            )}

            {/* Main Content Area */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: isDesktop ? 40 : 100,
                    paddingHorizontal: isDesktop ? 32 : 16,
                    paddingTop: isDesktop ? 32 : 16
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Desktop Header */}
                {isDesktop && (
                    <View className="mb-8">
                        <Text className="text-3xl font-black tracking-tighter text-slate-900">
                            Profile
                        </Text>
                        <Text className="text-sm text-slate-400 mt-1">
                            Kelola data akun dan keamanan Anda.
                        </Text>
                    </View>
                )}

                {/* Profile Container */}
                <View
                    className="bg-white/60 rounded-[2.5rem] overflow-hidden"
                    style={{
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.6)",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 20 },
                        shadowOpacity: 0.03,
                        shadowRadius: 50,
                    }}
                >
                    <View className="p-6 md:p-12 space-y-8">

                        {/* Profile Summary & Avatar */}
                        <View className="bg-white/40 border border-white/60 rounded-[2rem] p-6 md:p-8">
                            <View className="flex-col md:flex-row gap-6 md:items-center justify-between">
                                <View className="flex-row items-center gap-4">
                                    <Image
                                        source={{ uri: 'https://github.com/shadcn.png' }}
                                        className="w-20 h-20 rounded-2xl border border-white shadow-sm"
                                    />
                                    <View>
                                        <Text className="text-lg font-bold text-slate-900 font-sans">
                                            {user?.displayName || "Saharani Pusfita"}
                                        </Text>
                                        <Text className="text-sm text-slate-500">
                                            {user?.email || "shrvitasaharani@gmail.com"}
                                        </Text>
                                    </View>
                                </View>

                                <Pressable
                                    onPress={() => setShowAvatarSelection(!showAvatarSelection)}
                                    className="flex-row items-center justify-center gap-2 px-4 py-2 bg-emerald-500 rounded-xl active:bg-emerald-600"
                                >
                                    <Ionicons name="camera-outline" size={18} color="white" />
                                    <Text className="text-white font-semibold text-sm">Change Avatar</Text>
                                </Pressable>
                            </View>

                            {/* Avatar Selection Grid */}
                            {showAvatarSelection && (
                                <View className="mt-6 pt-6 border-t border-slate-200/50">
                                    <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                        Pilih Avatar
                                    </Text>
                                    <View className="flex-row flex-wrap gap-3">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <AvatarOption
                                                key={i}
                                                id={`avatar${i}`}
                                                source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${i}` }}
                                            />
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>

                        {/* Basic Info Form */}
                        <View className="bg-white/40 border border-white/60 rounded-[2rem] p-6 md:p-8">
                            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 font-sans">
                                Informasi Dasar
                            </Text>

                            <View className="flex-col md:flex-row gap-4">
                                <View className="flex-1 space-y-2">
                                    <Text className="text-xs font-semibold text-slate-500">Nama Lengkap</Text>
                                    <TextInput
                                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium"
                                        placeholder="Your Name"
                                        defaultValue={user?.displayName || "Saharani Pusfita"}
                                    />
                                </View>
                                <View className="flex-1 space-y-2">
                                    <Text className="text-xs font-semibold text-slate-500">Email</Text>
                                    <TextInput
                                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium"
                                        placeholder="user@example.com"
                                        defaultValue={user?.email || "shrvitasaharani@gmail.com"}
                                        keyboardType="email-address"
                                    />
                                </View>
                            </View>

                            <View className="mt-4 space-y-2">
                                <Text className="text-xs font-semibold text-slate-500">Nomor Telepon</Text>
                                <TextInput
                                    className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium"
                                    placeholder="08xxxxxxxxxx"
                                    defaultValue="08xxxxxxxxxx"
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        {/* Domicile Section */}
                        <View className="bg-white/40 border border-white/60 rounded-[2rem] p-6 md:p-8">
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">
                                    Domisili
                                </Text>
                                <Pressable
                                    onPress={() => setShowDomicileForm(!showDomicileForm)}
                                    className="flex-row items-center gap-2 px-3 py-2 bg-slate-900 rounded-xl active:bg-slate-800"
                                >
                                    <Ionicons name={showDomicileForm ? "chevron-up" : "chevron-down"} size={16} color="white" />
                                    <Text className="text-white text-xs font-semibold">Edit Domisili</Text>
                                </Pressable>
                            </View>

                            <TextInput
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 mb-4"
                                multiline
                                numberOfLines={3}
                                editable={false}
                                value="Jawa Timur, Banyuwangi, -, -, -."
                            />

                            {showDomicileForm && (
                                <View className="grid gap-4 mt-2">
                                    <View className="flex-col md:flex-row gap-4">
                                        <View className="flex-1 space-y-2">
                                            <Text className="text-xs font-semibold text-slate-500">Provinsi</Text>
                                            <View className="bg-white/50 border border-slate-200 rounded-xl px-4 py-3">
                                                <Text className="text-sm text-slate-400">Pilih Provinsi</Text>
                                            </View>
                                        </View>
                                        <View className="flex-1 space-y-2">
                                            <Text className="text-xs font-semibold text-slate-500">Kabupaten/Kota</Text>
                                            <View className="bg-white/50 border border-slate-200 rounded-xl px-4 py-3">
                                                <Text className="text-sm text-slate-400">Pilih Kabupaten/Kota</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* More dropdowns would go here - simplified for UI demo */}
                                </View>
                            )}
                        </View>

                        {/* Password Change */}
                        <View className="bg-white/40 border border-white/60 rounded-[2rem] p-6 md:p-8">
                            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 font-sans">
                                Change Password
                            </Text>

                            <View className="flex-col md:flex-row gap-4">
                                <View className="flex-1 space-y-2">
                                    <Text className="text-xs font-semibold text-slate-500">New Password</Text>
                                    <View className="relative">
                                        <TextInput
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium pr-10"
                                            placeholder="New Password"
                                            secureTextEntry={!showNewPassword}
                                        />
                                        <Pressable
                                            onPress={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-3"
                                        >
                                            <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color="#94a3b8" />
                                        </Pressable>
                                    </View>
                                </View>

                                <View className="flex-1 space-y-2">
                                    <Text className="text-xs font-semibold text-slate-500">Confirm Password</Text>
                                    <View className="relative">
                                        <TextInput
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium pr-10"
                                            placeholder="Confirm Password"
                                            secureTextEntry={!showConfirmPassword}
                                        />
                                        <Pressable
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3"
                                        >
                                            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#94a3b8" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Save Button */}
                        <View className="flex-row justify-end pt-4">
                            <Pressable
                                className="w-full sm:w-auto bg-emerald-500 px-8 py-4 rounded-xl active:bg-emerald-600 shadow-md shadow-emerald-200 items-center"
                            >
                                <Text className="text-white font-bold text-base">Save Changes</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </ScrollView>

            {/* BottomNav handled globally */}
        </View>
    );
}
