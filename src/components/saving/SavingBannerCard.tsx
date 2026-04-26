import Link from "next/link";
import { PiggyBank, ArrowRight, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface SavingBannerCardProps {
  year: number;
  total: number;
  goalCount: number;
}

export default function SavingBannerCard({
  year,
  total,
  goalCount,
}: SavingBannerCardProps) {
  return (
    <Link href={`/saving/${year}`} className="block group">
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-violet-500 to-purple-500 p-5 md:p-6 rounded-[2rem] shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-4 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
        <Sparkles className="absolute top-4 right-16 w-4 h-4 text-white/30 animate-pulse" />
        <Sparkles className="absolute bottom-3 right-8 w-3 h-3 text-white/20 animate-pulse delay-700" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
            <PiggyBank className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-black text-sm md:text-base tracking-tight">
                Saving Scheme {year}
              </h3>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-black text-white/90 uppercase tracking-wider">
                {goalCount} goals
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-white/60 text-xs font-bold">Portfolio</span>
              <span className="text-white font-mono font-black text-lg md:text-xl tracking-tighter">
                Rp {formatCurrency(total)}
              </span>
            </div>
          </div>

          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-all">
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
