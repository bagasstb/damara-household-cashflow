import type { Transaction } from "@/types";
import { formatDateFull, formatCurrency } from "@/lib/utils/formatCurrency";
import { getCategoryConfig, CHANNEL_STYLES } from "@/lib/utils/constants";

interface TransactionCardProps {
  transaction: Transaction;
  showDate?: boolean;
}

export default function TransactionCard({ transaction: tx, showDate = true }: TransactionCardProps) {
  const catConfig = getCategoryConfig(tx.category?.name ?? "");
  const channelStyle = CHANNEL_STYLES[tx.channel] ?? CHANNEL_STYLES.Cash;
  const Icon = catConfig?.icon;

  return (
    <div className="bg-white dark:bg-dark-surface p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5">
      <div className="flex justify-between items-start mb-3">
        <div className="text-[10px] font-black text-secondary dark:text-slate-400 uppercase tracking-wider">
          {showDate && formatDateFull(tx.date)}
        </div>
        <div className="text-sm font-mono font-black tracking-tighter">
          {formatCurrency(tx.amount)}
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        {catConfig && Icon && (
          <div
            className={`w-10 h-10 ${catConfig.bgLight} ${catConfig.bgDark} rounded-xl flex items-center justify-center ${catConfig.textLight} ${catConfig.textDark}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-black dark:text-white">
            {tx.description}
          </h4>
          <p
            className={`text-[10px] font-bold uppercase ${
              tx.cost_type === "fixed" || tx.cost_type === "fixed cost"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-400"
            }`}
          >
            {tx.cost_type}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${channelStyle.bg} ${channelStyle.text}`}
        >
          {tx.channel}
        </span>
        {catConfig && (
          <span
            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${catConfig.badgeBg} ${catConfig.badgeText}`}
          >
            {tx.category?.name}
          </span>
        )}
      </div>
    </div>
  );
}
