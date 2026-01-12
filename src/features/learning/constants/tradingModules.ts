export interface TradingModule {
  id: number;
  title: string;
  category: string;
  isRecommended?: boolean;
  content: string;
  youtubeId?: string; // Adding youtubeId for the video player
}

export const TRADING_MODULES: TradingModule[] = [
  {
    id: 1,
    title: "12 Tahun Pengalaman Trading Forex dalam 18 Menit",
    category: "Recommended",
    isRecommended: true,
    youtubeId: "vJ-example", // Placeholder
    content: `
      <h2 class="text-xl font-bold mb-4">12 Tahun Pengalaman Trading Forex</h2>
      <p>Video ini merangkum pengalaman trading forex selama 12 tahun menjadi 18 menit yang padat dan edukatif.</p>
    `
  },
  {
    id: 2,
    title: "Money Management Trading Forex",
    category: "Recommended",
    isRecommended: true,
    youtubeId: "mm-example",
    content: `
      <h2 class="text-xl font-bold mb-4">Pentingnya Money Management</h2>
      <p>Pelajari cara mengelola modal dan risiko agar akun trading Anda tetap aman dan berkembang.</p>
    `
  },
  {
    id: 3,
    title: "Teknikal Analisis dari Nol Sampai Mahir",
    category: "Recommended",
    isRecommended: true,
    youtubeId: "ta-example",
    content: `
      <h2 class="text-xl font-bold mb-4">Analisis Teknikal Lengkap</h2>
      <p>Panduan lengkap belajar analisis teknikal dari dasar hingga tingkat lanjut presisi tinggi.</p>
    `
  },
  {
    id: 4,
    title: "Belajar Forex dari Nol sampai Mahir",
    category: "Recommended",
    isRecommended: true,
    youtubeId: "bf-example",
    content: `
      <h2 class="text-xl font-bold mb-4">Course Forex Komprehensif</h2>
      <p>Materi pembelajaran forex dari pemula hingga menjadi trader profesional yang konsisten.</p>
    `
  }
];
