export interface AnalysisChannel {
  id: string;
  name: string;
  description: string;
  heroStatus: string;
  heroPair: string;
  heroTimeframe: string;
  heroMentor: string;
  heroPerformance: string;
}

export const ANALYSIS_CHANNELS: AnalysisChannel[] = [
  {
    id: "swing",
    name: "Swing Signal",
    description: "Setup jangka menengah",
    heroStatus: "Update London",
    heroPair: "GBPJPY Pullback Zone",
    heroTimeframe: "Swing • H4",
    heroMentor: "Mentor Andra",
    heroPerformance: "+0.8% minggu ini"
  },
  {
    id: "premium",
    name: "Signal Premium",
    description: "High probability setups",
    heroStatus: "Live Sekarang",
    heroPair: "XAUUSD Momentum",
    heroTimeframe: "Scalping • M15",
    heroMentor: "Mentor Rio",
    heroPerformance: "+45 pips hari ini"
  },
  {
    id: "scalping",
    name: "Scalping Recap",
    description: "Review trade cepat",
    heroStatus: "London Recap",
    heroPair: "NAS100 Breakout",
    heroTimeframe: "Scalp • M5",
    heroMentor: "Mentor Naya",
    heroPerformance: "+12 pts closed"
  },
  {
    id: "fundamental",
    name: "Fundamental",
    description: "Outlook berita ekonomi",
    heroStatus: "Macro Watch",
    heroPair: "FOMC Projection",
    heroTimeframe: "Macro • Daily",
    heroMentor: "Mentor Sarah",
    heroPerformance: "Sentimen USD melemah"
  },
  {
    id: "monthly",
    name: "Recap Bulanan",
    description: "Evaluasi kinerja bulanan",
    heroStatus: "Mentor Review",
    heroPair: "Portfolio Insight",
    heroTimeframe: "Monthly • Summary",
    heroMentor: "Mentor Team",
    heroPerformance: "+6.2% bulan ini"
  }
];
