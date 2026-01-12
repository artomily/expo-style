import { useDrawer } from "@/shared/context/DrawerContext";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    Linking,
    Pressable,
    ScrollView,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe/lib/commonjs/YoutubeIframe";

const SUPPORT_WA = "https://wa.me/082143982238";
const YOUTUBE_VIDEO = "https://www.youtube.com/watch?v=3rrDQmn5FIA";
const YOUTUBE_VIDEO_ID = "3rrDQmn5FIA";
const YOUTUBE_THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

interface FeatureCard {
    id: string;
    title: string;
    desc: string;
    icon: keyof typeof Feather.glyphMap;
    glowColor: string;
    iconBgLight: string;
    iconBgDark: string;
    textColor: string;
    route: string;
}

const FEATURE_CARDS: FeatureCard[] = [
    {
        id: "materi",
        title: "Materi Belajar",
        desc: "Akses modul lengkap dari fundamental hingga psikologi trading",
        icon: "book-open",
        glowColor: "rgba(16, 185, 129, 0.3)",
        iconBgLight: "rgba(16, 185, 129, 0.1)",
        iconBgDark: "rgba(16, 185, 129, 0.15)",
        textColor: "#10b981",
        route: "/modules"
    },
    {
        id: "capital",
        title: "Setra Capital",
        desc: "Program pendanaan trader hingga Rp 80 Juta",
        icon: "trending-up",
        glowColor: "rgba(20, 184, 166, 0.3)",
        iconBgLight: "rgba(20, 184, 166, 0.1)",
        iconBgDark: "rgba(20, 184, 166, 0.15)",
        textColor: "#14b8a6",
        route: "/capital"
    },
    {
        id: "komunitas",
        title: "Komunitas",
        desc: "Gabung komunitas dan akses benefit eksklusif",
        icon: "users",
        glowColor: "rgba(59, 130, 246, 0.3)",
        iconBgLight: "rgba(59, 130, 246, 0.1)",
        iconBgDark: "rgba(59, 130, 246, 0.15)",
        textColor: "#3b82f6",
        route: "/chat"
    }
];

export default function WelcomeScreen(): React.ReactElement {
    const { colors, theme } = useTheme();
    const router = useRouter();
    const { setDrawerOpen } = useDrawer();
    const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);
    const [playing, setPlaying] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<string>("home");

    // Calculate video height for 16:9 aspect ratio
    const { width } = Dimensions.get('window');
    const isLargeScreen = width >= 768;

    // Calculate max width considering padding
    const horizontalPadding = isLargeScreen ? 0 : 32; // 16px on each side for mobile
    const maxWidth = Math.min(width - horizontalPadding, 900);
    const videoHeight = (maxWidth / 16) * 9;

    const openYouTube = () => {
        Linking.openURL(YOUTUBE_VIDEO);
    };

    const openWhatsApp = () => {
        Linking.openURL(SUPPORT_WA);
    };

    return (
        <SafeAreaView
            className="flex-1"
            style={{ backgroundColor: theme === "dark" ? "#0f172a" : "#f8fafc" }}
        >
            {/* Mobile Header */}
            {!isLargeScreen && (
                <View className="p-4 flex-row justify-between items-center bg-white/40 backdrop-blur-sm border-b border-white/20">
                    <Pressable onPress={() => setDrawerOpen(true)} className="flex-row items-center gap-2">
                        <Image
                            source={require("../../../../assets/images/LogoST.png")}
                            style={{ width: 32, height: 32 }}
                            resizeMode="contain"
                        />
                        <Text className="font-black text-xl tracking-tighter">SETRA</Text>
                    </Pressable>
                    <View className="w-8 h-8" />
                </View>
            )}

            {/* Desktop Header */}
            {isLargeScreen && (
                <View className="px-4 pt-6 pb-8 md:px-10">
                    <Text className="text-3xl font-black tracking-tighter text-slate-900">Dashboard</Text>
                    <Text className="text-sm text-slate-400 mt-1">
                        Selamat datang kembali, Saharani Pusfita.
                    </Text>
                </View>
            )}

            {/* Main Glassmorphic Container */}
            <View
                className="flex-1 mx-0 md:mx-4 lg:mx-8 my-0 md:my-4 lg:my-6 rounded-none md:rounded-[32px] lg:rounded-[40px] overflow-hidden"
                style={{
                    backgroundColor: theme === "dark"
                        ? "rgba(255, 255, 255, 0.03)"
                        : "rgba(255, 255, 255, 0.6)",
                    borderWidth: theme === "dark" ? 0 : 1,
                    borderColor: "rgba(255, 255, 255, 0.6)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.03,
                    shadowRadius: 50,
                    elevation: 5
                }}
            >
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: isLargeScreen ? 16 : 0,
                        paddingTop: isLargeScreen ? 32 : 20,
                        paddingBottom: isLargeScreen ? 96 : 20
                    }}
                >
                    {/* Welcome Section */}
                    <View className="items-center mb-6 md:mb-12">
                        {/* Member Area Badge */}
                        <View
                            className="flex-row items-center gap-2 px-4 py-2 md:py-1.5 rounded-full mb-4 md:mb-6"
                            style={{
                                backgroundColor: theme === "dark"
                                    ? "rgba(16, 185, 129, 0.1)"
                                    : "rgba(236, 253, 245, 0.8)",
                                borderWidth: 1,
                                borderColor: theme === "dark"
                                    ? "rgba(16, 185, 129, 0.3)"
                                    : "#a7f3d0"
                            }}
                        >
                            <Feather name="zap" size={isLargeScreen ? 10 : 12} color="#10b981" />
                            <Text
                                className="text-[11px] md:text-[10px] font-extrabold tracking-widest uppercase"
                                style={{ color: "#10b981" }}
                            >
                                Member Area
                            </Text>
                        </View>

                        {/* Main Heading */}
                        <View className="px-4 md:px-8">
                            <Text
                                className="text-center text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-3 md:mb-4"
                                style={{ color: theme === "dark" ? "#ffffff" : "#0f172a" }}
                            >
                                Mulai Perjalanan{"\n"}
                                <Text style={{ color: "#10b981" }}>Trading</Text> Anda
                            </Text>

                            <Text
                                className="text-center text-sm md:text-xl leading-relaxed px-2 md:px-4"
                                style={{ color: theme === "dark" ? "#94a3b8" : "#64748b" }}
                            >
                                Platform pembelajaran eksklusif untuk trader yang serius mencapai kemandirian finansial.
                            </Text>
                        </View>
                    </View>

                    {/* Quick Access Cards */}
                    <View className="mb-8 md:mb-12 max-w-6xl mx-auto w-full px-4 md:px-6">
                        <View className="flex-row flex-wrap justify-center md:justify-between gap-4">
                            {FEATURE_CARDS.map((card) => {
                                const isHovered = hoveredCard === card.id;

                                return (
                                    <Pressable
                                        key={card.id}
                                        className="relative overflow-hidden rounded-3xl p-6"
                                        style={{
                                            width: isLargeScreen ? '31%' : '100%', // Full width on mobile, ~1/3 on desktop
                                            maxWidth: isLargeScreen ? undefined : 500,
                                            minWidth: isLargeScreen ? 280 : undefined,
                                            backgroundColor: theme === "dark"
                                                ? "rgba(255, 255, 255, 0.05)"
                                                : "#ffffff",
                                            borderWidth: 0,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: isHovered ? 24 : 8
                                            },
                                            shadowOpacity: isHovered ? 0.15 : 0.05,
                                            shadowRadius: isHovered ? 40 : 12,
                                            elevation: isHovered ? 16 : 4,
                                            transform: [
                                                { scale: isHovered ? 1.03 : 1 },
                                                { translateY: isHovered ? -8 : 0 }
                                            ]
                                        }}
                                        onPress={() => router.push(card.route as any)}
                                        onHoverIn={() => setHoveredCard(card.id)}
                                        onHoverOut={() => setHoveredCard(null)}
                                    >
                                        <View className="relative">
                                            {/* Icon */}
                                            <View
                                                className="w-14 h-14 md:w-12 md:h-12 rounded-2xl items-center justify-center mb-4"
                                                style={{
                                                    backgroundColor: theme === "dark"
                                                        ? card.iconBgDark
                                                        : card.iconBgLight
                                                }}
                                            >
                                                <Feather name={card.icon} size={isLargeScreen ? 20 : 24} color={card.textColor} />
                                            </View>

                                            {/* Title */}
                                            <Text
                                                className="text-lg md:text-base font-bold mb-2"
                                                style={{ color: theme === "dark" ? "#ffffff" : "#1e293b" }}
                                            >
                                                {card.title}
                                            </Text>

                                            {/* Description */}
                                            <Text
                                                className="text-sm md:text-xs leading-relaxed mb-4"
                                                style={{ color: theme === "dark" ? "#94a3b8" : "#64748b" }}
                                                numberOfLines={isLargeScreen ? 2 : 3}
                                            >
                                                {card.desc}
                                            </Text>

                                            {/* Link */}
                                            <View className="flex-row items-center gap-1">
                                                <Text
                                                    className="text-sm md:text-xs font-semibold"
                                                    style={{ color: card.textColor }}
                                                >
                                                    {card.id === "materi" ? "Mulai Belajar" :
                                                        card.id === "capital" ? "Lihat Program" :
                                                            "Lihat Komunitas"}
                                                </Text>
                                                <Feather name="arrow-right" size={isLargeScreen ? 12 : 14} color={card.textColor} />
                                            </View>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* Featured Content - Video */}
                    <View className="mb-6 md:mb-12 max-w-4xl mx-auto w-full px-4 md:px-0">
                        <View
                            className="p-1.5 md:p-3 rounded-2xl md:rounded-[32px] overflow-hidden"
                            style={{
                                backgroundColor: theme === "dark"
                                    ? "rgba(255, 255, 255, 0.05)"
                                    : "rgba(255, 255, 255, 0.8)",
                                borderWidth: 1,
                                borderColor: theme === "dark"
                                    ? "rgba(255, 255, 255, 0.1)"
                                    : "rgba(148, 163, 184, 0.15)"
                            }}
                        >
                            <View
                                className="rounded-xl md:rounded-3xl overflow-hidden"
                                style={{
                                    backgroundColor: theme === "dark"
                                        ? "rgba(16, 185, 129, 0.05)"
                                        : "rgba(236, 253, 245, 0.3)",
                                    borderRadius: isLargeScreen ? 24 : 12,
                                    overflow: 'hidden'
                                }}
                            >
                                {/* YouTube Player */}
                                <YoutubePlayer
                                    height={videoHeight}
                                    videoId={YOUTUBE_VIDEO_ID}
                                    play={playing}
                                    onChangeState={(state: string) => {
                                        if (state === "ended" || state === "paused") {
                                            setPlaying(false);
                                        } else if (state === "playing") {
                                            setPlaying(true);
                                        }
                                    }}
                                    initialPlayerParams={{
                                        modestbranding: true,
                                        rel: false
                                    }}
                                    webViewStyle={{
                                        opacity: 0.99,
                                        borderRadius: isLargeScreen ? 24 : 12,
                                        overflow: 'hidden'
                                    }}
                                    webViewProps={{
                                        style: {
                                            borderRadius: isLargeScreen ? 24 : 12,
                                            overflow: 'hidden'
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* WhatsApp Support Section */}
                    <View className="mb-8 md:mb-12 max-w-4xl mx-auto w-full items-center px-4">
                        <Text
                            className="text-center text-xs md:text-sm mb-3 md:mb-4"
                            style={{ color: theme === "dark" ? "#94a3b8" : "#64748b" }}
                        >
                            Ada pertanyaan? Hubungi tim support kami
                        </Text>
                        <Pressable
                            className="flex-row items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg"
                            style={{
                                backgroundColor: "#25D366",
                                shadowColor: "#25D366",
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 4
                            }}
                            onPress={() => Linking.openURL("https://api.whatsapp.com/send/?phone=082143982238&text&type=phone_number&app_absent=0")}
                        >
                            <Feather name="message-circle" size={isLargeScreen ? 18 : 16} color="#ffffff" />
                            <Text className="text-white font-semibold text-xs md:text-sm">
                                WhatsApp Support
                            </Text>
                        </Pressable>
                    </View>



                </ScrollView>
            </View>
            {/* Mobile Bottom Navigation Bar */}
            {/* Handled globally in NavigationShell */}
        </SafeAreaView>
    );
}
