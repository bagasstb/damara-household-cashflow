// ===== Saving Scheme Types =====

export interface SavingGoal {
  id: string;
  year: number;
  name: string;
  instrument: string;
  icon: string;
  parent_goal_id: string | null;
  sort_order: number;
  created_at: string;
  // Joined / computed
  entries?: SavingEntry[];
  children?: SavingGoal[];
}

export interface SavingEntry {
  id: string;
  goal_id: string;
  year: number;
  month: number;
  amount: number;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavingEntryFormData {
  goal_id: string;
  year: number;
  month: number;
  amount: number;
  note?: string;
}

// Monthly totals for the chart
export interface MonthlyTotal {
  month: number;
  monthLabel: string;
  total: number;
}

// Icon mapping for instruments
export const INSTRUMENT_ICONS: Record<string, { icon: string; color: string }> = {
  "Bibit": { icon: "Sprout", color: "#10b981" },
  "Crypto/Saham Bagas": { icon: "TrendingUp", color: "#f97316" },
  "Flexi Saver 1": { icon: "Wallet", color: "#3b82f6" },
  "Bank Mandiri": { icon: "Landmark", color: "#ca8a04" },
  "Jenius X-Card": { icon: "CreditCard", color: "#06b6d4" },
  "Valas (USD)": { icon: "DollarSign", color: "#22c55e" },
  "Valas (100 USD)": { icon: "DollarSign", color: "#22c55e" },
  "Valas (SGD)": { icon: "Banknote", color: "#14b8a6" },
  "Valas (74 SGD)": { icon: "Banknote", color: "#14b8a6" },
  "Valas (JPY)": { icon: "Banknote", color: "#f43f5e" },
  "Valas (1,3196 JPY)": { icon: "Banknote", color: "#f43f5e" },
  "Valas (10 EUR)": { icon: "Banknote", color: "#8b5cf6" },
  "Valas (5000 KRW)": { icon: "Banknote", color: "#ec4899" },
  "Valas (10 RM)": { icon: "Banknote", color: "#eab308" },
  "Crypto Dean": { icon: "Bitcoin", color: "#f59e0b" },
  "Emas Dean": { icon: "Gem", color: "#eab308" },
  "Emas Bagas": { icon: "Gem", color: "#facc15" },
  "LM 10gr": { icon: "Coins", color: "#ca8a04" },
  "Flexi Saver 2": { icon: "WalletCards", color: "#6366f1" },
};

export const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

export const MONTH_LABELS_FULL = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
