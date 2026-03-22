import { Utensils, Flame } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { CategorySpending } from "@/types";

interface TopCategoryProps {
  category?: CategorySpending | null;
}

export default function TopCategory({ category }: TopCategoryProps) {
  if (!category) {
    return (
      <div className="bg-slate-100 dark:bg-white/5 p-6 rounded-[2rem] text-slate-500 dark:text-slate-400 h-36 flex items-center justify-center border-dashed border-2 border-slate-300 dark:border-white/10">
        <p className="font-bold text-sm">No spendings yet</p>
      </div>
    );
  }
  return (
    <div className="bg-primary p-6 rounded-[2rem] shadow-xl shadow-primary/20 text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
          Top Category
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-black">{category.category}</h4>
            <p className="text-xs font-bold opacity-80">
              Rp {formatCurrency(category.total_spent)} this cycle
            </p>
          </div>
        </div>
      </div>
      <Flame className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10 rotate-12" />
    </div>
  );
}
