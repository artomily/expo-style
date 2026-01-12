import { useDrawer } from "@/shared/context/DrawerContext";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data - replace with actual API calls
const MOCK_USER = {
  name: "Guest Trader",
  hasExamination: false, // Set to true to see evaluation results
  hasAccount: false, // Set to true to see dashboard
  examinationScore: 0,
  examinationStatus: "belum ikut",
  canRetry: false,
  daysUntilRetry: 0,
};

const MOCK_ACCOUNT = {
  mt5_login: "123456789",
  password: "Demo@123",
  mt5_server: "SetraCapital-Demo",
  status: "Active",
  tier: {
    name: "Evaluation",
    account_size: 10000,
    profit_target_percentage: 10,
    max_daily_loss_percentage: 5,
    max_total_loss_percentage: 10,
  },
  balance: 10240.50,
  equity: 10240.50,
  profit: 240.50,
  daily_drawdown: 0,
  total_drawdown: 0,
  violations: [],
};

export default function CapitalDashboardScreen(): React.ReactElement {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const { colors } = useTheme();
  const { setDrawerOpen } = useDrawer();

  const [userData] = useState(MOCK_USER);
  const [accountData] = useState(MOCK_ACCOUNT);

  // Calculate progress percentages
  const profitTarget = (accountData.tier.profit_target_percentage / 100) * accountData.tier.account_size;
  const profitProgress = Math.min((accountData.profit / profitTarget) * 100, 100);

  const maxDailyLoss = (accountData.tier.max_daily_loss_percentage / 100) * accountData.tier.account_size;
  const dailyLossProgress = (accountData.daily_drawdown / maxDailyLoss) * 100;

  const maxTotalLoss = (accountData.tier.max_total_loss_percentage / 100) * accountData.tier.account_size;
  const totalLossProgress = (accountData.total_drawdown / maxTotalLoss) * 100;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Saharani Pusfita",
    nik: "",
    phone: "",
    email: "shrvitasaharani@gmail.com",
    bank: "",
    rekening: ""
  });

  const renderVerificationForm = () => (
    <View className="flex-1 items-center justify-center py-6 md:py-10">
      <View
        className="bg-white rounded-[32px] p-6 md:p-10 w-full relative"
        style={{
          maxWidth: 600,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.05,
          shadowRadius: 20,
          elevation: 5,
        }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-start mb-8">
          <View>
            <Text className="text-2xl font-black text-slate-900 tracking-tight">Data Verifikasi</Text>
            <Text className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Form Profil SCP</Text>
          </View>
          <Pressable
            onPress={() => setShowForm(false)}
            className="w-8 h-8 bg-slate-50 rounded-full items-center justify-center hover:bg-slate-100"
          >
            <Ionicons name="close" size={20} color="#94a3b8" />
          </Pressable>
        </View>

        {/* Form Fields */}
        <View className="space-y-5">
          {/* Nama Lengkap */}
          <View>
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nama Lengkap (Sesuai KTP)</Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500">
              <Ionicons name="person-outline" size={18} color="#94a3b8" />
              <TextInput
                className="flex-1 ml-3 text-slate-900 font-semibold text-sm"
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                placeholder="Nama Lengkap"
                placeholderTextColor="#cbd5e1"
              />
            </View>
            <View className="flex-row items-center mt-1.5 ml-1">
              <Ionicons name="checkmark-circle" size={12} color="#34d399" />
              <Text className="text-[10px] text-slate-400 ml-1.5">Gunakan nama asli sesuai identitas KTP Anda.</Text>
            </View>
          </View>

          {/* NIK */}
          <View>
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">NIK (Sesuai KTP)</Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500">
              <Ionicons name="card-outline" size={18} color="#94a3b8" />
              <TextInput
                className="flex-1 ml-3 text-slate-900 font-medium text-sm"
                value={formData.nik}
                onChangeText={(text) => setFormData({ ...formData, nik: text })}
                placeholder="16 digit NIK"
                placeholderTextColor="#cbd5e1"
                keyboardType="numeric"
                maxLength={16}
              />
            </View>
            <View className="flex-row items-center mt-1.5 ml-1">
              <Ionicons name="shield-checkmark-outline" size={12} color="#34d399" />
              <Text className="text-[10px] text-slate-400 ml-1.5">Pastikan NIK valid dan sesuai dengan nama di atas.</Text>
            </View>
          </View>

          {/* Row: Phone & Email */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nomor Telepon</Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500">
                <Ionicons name="call-outline" size={18} color="#94a3b8" />
                <TextInput
                  className="flex-1 ml-3 text-slate-900 font-medium text-sm"
                  value={formData.phone}
                  onChangeText={(text: string) => setFormData({ ...formData, phone: text })}
                  placeholder="08..."
                  placeholderTextColor="#cbd5e1"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Email Aktif</Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500">
                <Ionicons name="mail-outline" size={18} color="#94a3b8" />
                <TextInput
                  className="flex-1 ml-3 text-slate-900 font-bold text-xs"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  placeholder="Email"
                  placeholderTextColor="#cbd5e1"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          {/* Row: Bank & Rekening */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nama Bank</Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500">
                <Ionicons name="business-outline" size={18} color="#94a3b8" />
                <TextInput
                  className="flex-1 ml-3 text-slate-900 font-bold text-sm"
                  value={formData.bank}
                  onChangeText={(text) => setFormData({ ...formData, bank: text })}
                  placeholder="Pilih Bank"
                  placeholderTextColor="#cbd5e1"
                />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nomor Rekening</Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500">
                <Ionicons name="wallet-outline" size={18} color="#94a3b8" />
                <TextInput
                  className="flex-1 ml-3 text-slate-900 font-medium text-sm"
                  value={formData.rekening}
                  onChangeText={(text) => setFormData({ ...formData, rekening: text })}
                  placeholder="Nomor Rekening"
                  placeholderTextColor="#cbd5e1"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <View className="flex-row items-start mt-0 ml-1">
            <Ionicons name="information-circle-outline" size={12} color="#34d399" style={{ marginTop: 2 }} />
            <Text className="text-[10px] text-slate-400 ml-1.5 flex-1">Nama pemilik rekening <Text className="font-bold text-slate-600">wajib sama</Text> dengan Nama Lengkap.</Text>
          </View>

          {/* Foto KTP Upload */}
          <View>
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Foto KTP (Upload)</Text>
            <View className="border border-dashed border-slate-300 bg-slate-50/50 rounded-xl h-24 items-center justify-center mb-1">
              <Ionicons name="cloud-upload-outline" size={24} color="#94a3b8" />
              <Text className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Upload Foto KTP</Text>
            </View>
            <View className="flex-row items-center mt-1.5 ml-1">
              <Ionicons name="image-outline" size={12} color="#34d399" />
              <Text className="text-[10px] text-slate-400 ml-1.5">Format: JPG, PNG (Maks. 2MB). Pastikan foto KTP jelas dan terbaca.</Text>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <Pressable className="w-full bg-[#0f172a] py-4 rounded-xl items-center justify-center active:opacity-90 mt-8 flex-row gap-2">
          <Text className="text-white font-bold text-sm">
            Simpan Data
          </Text>
          <Ionicons name="checkmark" size={16} color="white" />
        </Pressable>

      </View>
    </View>
  );

  const renderNotStarted = () => (
    <View className="flex-1 items-center justify-center py-10 md:py-20 relative">
      {/* Glow Effect */}
      <View
        className="absolute w-full h-64 bg-emerald-400/20 blur-3xl rounded-full"
        style={{ maxWidth: 500, top: '20%' }}
      />

      <View
        className="bg-white rounded-[40px] p-8 md:p-12 items-center text-center relative"
        style={{
          maxWidth: 600,
          width: '100%',
          shadowColor: "#10b981",
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.1,
          shadowRadius: 40,
          elevation: 10,
        }}
      >
        <View className="w-20 h-20 rounded-[28px] bg-emerald-50 items-center justify-center mb-6 relative">
          <Ionicons name="person-outline" size={36} color="#10b981" />
          <View className="absolute top-5 right-5 bg-white rounded-full p-[2px]">
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
          </View>
        </View>

        <Text className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 text-center">
          Lengkapi Profil Anda
        </Text>

        <Text className="text-slate-500 text-center text-sm md:text-base leading-relaxed max-w-md mb-8">
          Mohon lengkapi data profil Anda untuk dapat mengakses fitur <Text className="font-bold text-slate-700">Setra Capital Program</Text>.
        </Text>

        <Pressable
          onPress={() => setShowForm(true)}
          className="w-full max-w-sm bg-emerald-500 py-4 rounded-xl items-center justify-center active:opacity-90 shadow-lg shadow-emerald-500/20"
        >
          <Text className="text-white font-bold text-base">
            Lengkapi Data Sekarang
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderEvaluationResults = () => (
    <View className="items-center py-20">
      <Text className="text-2xl font-bold text-slate-900 mb-2">
        Hasil Evaluasi Anda
      </Text>
      <Text className="text-7xl font-black text-emerald-500 my-4">
        {userData.examinationScore}
      </Text>

      {userData.examinationStatus === "sedang seleksi" ? (
        <Text className="text-slate-600 text-center max-w-md">
          <Text className="font-bold">Selamat!</Text> Anda telah lolos dan masuk tahap seleksi.
          Akun trading Anda sedang kami siapkan, estimasi waktu dalam 1 - 3 bulan.
          Mohon hubungi administrator jika Anda memiliki pertanyaan.
        </Text>
      ) : userData.examinationScore >= 85 ? (
        <Text className="text-slate-600 text-center max-w-md">
          <Text className="font-bold">Selamat!</Text> Anda telah memenuhi syarat kelulusan.
          Akun trading Anda sedang kami proses. Mohon tunggu informasi selanjutnya dalam 1-2 hari kerja.
        </Text>
      ) : (
        <>
          <Text className="text-slate-500 text-center max-w-md mb-4">
            Sayang sekali, skor Anda belum memenuhi syarat kelulusan (minimal 85).
            Jangan menyerah, Anda bisa mencoba lagi.
          </Text>

          {userData.canRetry ? (
            <Pressable className="bg-emerald-500 px-6 py-3 rounded-lg active:bg-emerald-600 mt-6">
              <Text className="text-white font-bold">Coba Lagi</Text>
            </Pressable>
          ) : (
            <View className="mt-6">
              <Text className="text-sm text-slate-500 font-semibold text-center">
                Anda dapat mencoba lagi dalam{" "}
                <Text className="text-emerald-600 font-bold">{userData.daysUntilRetry} hari</Text>.
              </Text>
              <Text className="text-xs text-slate-400 mt-2 text-center">
                Gunakan waktu ini untuk belajar lebih dalam agar lebih siap!
              </Text>
            </View>
          )}
        </>
      )}

      <Text className="text-lg text-slate-500 mt-4">
        Status: <Text className="font-bold">{userData.examinationStatus}</Text>
      </Text>

      <View className="flex-row gap-2 mt-4">
        <Pressable>
          <Text className="text-emerald-600 font-semibold">Lihat Leaderboard</Text>
        </Pressable>
        <Text className="text-slate-300">•</Text>
        <Pressable>
          <Text className="text-emerald-600 font-semibold">Belajar di Modul</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderDashboard = () => (
    <View className="space-y-6 md:space-y-8">
      {/* Top Stats Cards */}
      <View className="flex-row flex-wrap justify-between gap-4 md:gap-6">
        <View
          className="p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border border-white/80 shadow-sm relative overflow-hidden"
          style={{ width: isLargeScreen ? '31%' : '100%' }}
        >
          <Ionicons name="briefcase-outline" size={isLargeScreen ? 96 : 64} color="#f1f5f9" style={{ position: "absolute", right: -16, bottom: -16, opacity: 0.2, transform: [{ rotate: "12deg" }] }} />
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2">
            Total Funding
          </Text>
          <Text className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            ${accountData.tier.account_size.toLocaleString()}
          </Text>
        </View>

        <View
          className="p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border border-white/80 shadow-sm relative overflow-hidden"
          style={{ width: isLargeScreen ? '31%' : '100%' }}
        >
          <Ionicons name="trending-up-outline" size={isLargeScreen ? 96 : 64} color="#f1f5f9" style={{ position: "absolute", right: -16, bottom: -16, opacity: 0.2, transform: [{ rotate: "12deg" }] }} />
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2">
            Unrealized Profit
          </Text>
          <Text className={`text-2xl md:text-3xl font-black tracking-tight ${accountData.profit >= 0 ? "text-emerald-500" : "text-red-500"}`}>
            ${accountData.profit.toFixed(2)}
          </Text>
        </View>

        <View
          className="p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border border-white/80 shadow-sm relative overflow-hidden"
          style={{ width: isLargeScreen ? '31%' : '100%' }}
        >
          <Ionicons name="shield-checkmark-outline" size={isLargeScreen ? 96 : 64} color="#f1f5f9" style={{ position: "absolute", right: -16, bottom: -16, opacity: 0.2, transform: [{ rotate: "12deg" }] }} />
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2">
            Status Akun
          </Text>
          <View className="bg-emerald-100 px-3 py-1 rounded-full self-start">
            <Text className="text-emerald-700 font-bold text-sm">{accountData.status}</Text>
          </View>
        </View>
      </View>

      {/* Account Details Card */}
      <View className="p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border border-white/80">
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <Text className="font-bold text-lg md:text-xl text-slate-900">My Account</Text>
            <Text className="text-xs text-slate-400">Gunakan kredensial ini untuk login ke MetaTrader 5</Text>
          </View>
          <View className="ml-4">
            <Text className="text-xs text-slate-500 mt-1">
              Login: <Text className="font-semibold">{accountData.mt5_login}</Text>
            </Text>
            <Text className="text-xs text-slate-500 mt-1">
              Password: <Text className="font-semibold">{accountData.password}</Text>
            </Text>
            <Text className="text-xs text-slate-500 mt-1">
              Server: <Text className="font-semibold">{accountData.mt5_server}</Text>
            </Text>
          </View>
        </View>

        <View className="border-t border-slate-100 pt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <View>
            <Text className="text-xs text-slate-400">Balance</Text>
            <Text className="font-bold text-lg text-slate-900">${accountData.balance.toFixed(2)}</Text>
          </View>
          <View>
            <Text className="text-xs text-slate-400">Equity</Text>
            <Text className="font-bold text-lg text-slate-900">${accountData.equity.toFixed(2)}</Text>
          </View>
          <View>
            <Text className="text-xs text-slate-400">Tier</Text>
            <Text className="font-bold text-lg text-slate-900">{accountData.tier.name}</Text>
          </View>
          <View>
            <Text className="text-xs text-slate-400">Nickname</Text>
            <Text className="font-bold text-lg text-slate-900">{userData.name}</Text>
          </View>
        </View>
      </View>

      {/* Objectives & Violations */}
      <View className="flex-row flex-wrap justify-between gap-6 md:gap-8">
        {/* Objectives - 3 columns on large screens */}
        <View
          className="p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border border-white/80"
          style={{ width: isLargeScreen ? '58%' : '100%' }}
        >
          <Text className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-slate-900">Objectives</Text>

          <View className="space-y-5 md:space-y-6">
            {/* Profit Target */}
            <View>
              <View className="flex-row justify-between mb-1.5 md:mb-2">
                <Text className="text-[9px] font-black uppercase tracking-tighter text-slate-500">
                  Profit Target ({accountData.tier.profit_target_percentage}%)
                </Text>
                <Text className={`text-[9px] font-black uppercase tracking-tighter ${accountData.profit >= profitTarget ? "text-emerald-500" : "text-slate-500"}`}>
                  ${accountData.profit.toFixed(2)} / ${profitTarget.toFixed(2)}
                </Text>
              </View>
              <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <View className="h-full bg-emerald-500 rounded-full" style={{ width: `${profitProgress}%` }} />
              </View>
            </View>

            {/* Max Daily Loss */}
            <View>
              <View className="flex-row justify-between mb-1.5 md:mb-2">
                <Text className="text-[9px] font-black uppercase tracking-tighter text-slate-500">
                  Max Daily Loss ({accountData.tier.max_daily_loss_percentage}%)
                </Text>
                <Text className="text-[9px] font-black uppercase tracking-tighter text-red-500">
                  ${accountData.daily_drawdown.toFixed(2)} / ${maxDailyLoss.toFixed(2)}
                </Text>
              </View>
              <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <View className="h-full bg-red-500 rounded-full" style={{ width: `${dailyLossProgress}%` }} />
              </View>
            </View>

            {/* Max Total Loss */}
            <View>
              <View className="flex-row justify-between mb-1.5 md:mb-2">
                <Text className="text-[9px] font-black uppercase tracking-tighter text-slate-500">
                  Max Total Loss ({accountData.tier.max_total_loss_percentage}%)
                </Text>
                <Text className="text-[9px] font-black uppercase tracking-tighter text-red-500">
                  ${accountData.total_drawdown.toFixed(2)} / ${maxTotalLoss.toFixed(2)}
                </Text>
              </View>
              <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <View className="h-full bg-red-500 rounded-full" style={{ width: `${totalLossProgress}%` }} />
              </View>
            </View>
          </View>
        </View>

        {/* Rule Violations - 2 columns on large screens */}
        <View
          className="p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border border-white/80"
          style={{ width: isLargeScreen ? '39%' : '100%' }}
        >
          <Text className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-slate-900">Rule Violations</Text>

          {accountData.violations.length === 0 ? (
            <View className="items-center py-6">
              <Ionicons name="trophy" size={64} color="#34d399" />
              <Text className="text-slate-500 mt-2 text-center">No violations recorded. Great job!</Text>
            </View>
          ) : (
            <View className="space-y-3">
              {accountData.violations.map((violation: any, index: number) => (
                <View key={index} className="flex-row items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <Ionicons name="warning" size={20} color="#ef4444" style={{ marginTop: 2 }} />
                  <View className="flex-1">
                    <Text className="font-bold text-sm text-red-700">{violation.rule}</Text>
                    <Text className="text-xs text-slate-500">{violation.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: "#F8FAFC" }}
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
        </View>
      )}

      {/* Desktop Header */}
      {isLargeScreen && (
        <View className="px-10 pt-6 pb-8">
          <Text className="text-3xl font-black tracking-tighter">Setra Capital Program</Text>
          <Text className="text-sm text-slate-400 mt-1">
            Selamat datang di ekosistem trading Setra, {userData.name}.
          </Text>
        </View>
      )}

      {/* Main Container */}
      <View className="flex-1 mx-0 md:mx-4 lg:mx-8 mb-0 md:mb-4 lg:mb-6">
        <View
          className="flex-1 bg-white/60 md:backdrop-blur-2xl md:border md:border-white/60 md:rounded-[32px] lg:rounded-[40px] overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.03,
            shadowRadius: 50,
            elevation: 5,
          }}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              padding: isLargeScreen ? 48 : 16,
              paddingBottom: isLargeScreen ? 48 : 128,
            }}
            showsVerticalScrollIndicator={false}
          >
            {showForm
              ? renderVerificationForm()
              : !userData.hasExamination
                ? renderNotStarted()
                : userData.hasExamination && !userData.hasAccount
                  ? renderEvaluationResults()
                  : renderDashboard()
            }
          </ScrollView>
        </View>
      </View>

      {/* Handled globally */}
    </SafeAreaView>
  );
}
