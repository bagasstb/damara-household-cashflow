import { Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { IHYA_TOTAL } from "@/types/ihya";

interface IhyaQuotaCardProps {
  totalSpent: number;
}

export default function IhyaQuotaCard({ totalSpent }: IhyaQuotaCardProps) {
  const remaining = IHYA_TOTAL - totalSpent;
  const usedPercent = Math.min(
    Math.round((totalSpent / IHYA_TOTAL) * 100),
    100
  );
  const isOverBudget = remaining < 0;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/20">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white/70 text-xs font-black uppercase tracking-widest">
              Tabungan Ihya
            </h2>
            <p className="text-white text-sm font-bold mt-0.5">
              Total Tabungan Adik
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="mb-6">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
            Total Tabungan
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-white/70 text-sm font-black">Rp</span>
            <span className="text-white text-3xl font-black tracking-tighter">
              {formatCurrency(IHYA_TOTAL)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-[10px] font-black uppercase tracking-widest">
              Terpakai {usedPercent}%
            </span>
            <span className="text-white/70 text-[10px] font-black uppercase tracking-widest">
              {formatCurrency(totalSpent)} / {formatCurrency(IHYA_TOTAL)}
            </span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isOverBudget
                  ? "bg-red-400"
                  : usedPercent > 75
                  ? "bg-amber-300"
                  : "bg-white"
              }`}
              style={{ width: `${Math.min(usedPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Remaining */}
        <div className={`p-4 rounded-2xl ${isOverBudget ? "bg-red-500/20" : "bg-white/10"} backdrop-blur-sm`}>
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
            {isOverBudget ? "Melebihi Budget" : "Sisa Tabungan"}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-white/70 text-sm font-black">Rp</span>
            <span
              className={`text-2xl font-black tracking-tighter ${
                isOverBudget ? "text-red-200" : "text-white"
              }`}
            >
              {formatCurrency(Math.abs(remaining))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
