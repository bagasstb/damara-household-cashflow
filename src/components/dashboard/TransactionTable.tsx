import type { Transaction } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils/formatCurrency";
import { getCategoryConfig, CHANNEL_STYLES } from "@/lib/utils/constants";

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="hidden md:block bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50/80 dark:bg-slate-900/40 text-secondary dark:text-slate-400 text-[10px] uppercase font-black tracking-[0.15em] border-b border-slate-100 dark:border-white/5">
            <th className="px-8 py-5">Tanggal</th>
            <th className="px-8 py-5">Keterangan</th>
            <th className="px-8 py-5">Channel</th>
            <th className="px-8 py-5">Category</th>
            <th className="px-8 py-5 text-right">Nominal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
          {transactions.map((tx, index) => {
            const catConfig = getCategoryConfig(tx.category?.name ?? "");
            const channelStyle = CHANNEL_STYLES[tx.channel] ?? CHANNEL_STYLES.Cash;

            const formattedDate = formatDate(tx.date);
            const prevFormattedDate = index > 0 ? formatDate(transactions[index - 1].date) : null;
            const showDate = formattedDate !== prevFormattedDate;

            return (
              <tr
                key={tx.id}
                className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-all cursor-pointer"
              >
                <td className="px-8 py-6 whitespace-nowrap align-top">
                  {showDate && (
                    <div className="text-xs font-black text-secondary dark:text-slate-400">
                      {formattedDate}
                    </div>
                  )}
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-black dark:text-white">
                    {tx.description}
                  </div>
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wide ${
                      tx.cost_type === "fixed" || tx.cost_type === "fixed cost"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-400"
                    }`}
                  >
                    {tx.cost_type}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${channelStyle.bg} ${channelStyle.text}`}
                  >
                    {tx.channel}
                  </span>
                </td>
                <td className="px-8 py-6">
                  {catConfig && (
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${catConfig.badgeBg} ${catConfig.badgeText}`}
                    >
                      {tx.category?.name}
                    </span>
                  )}
                </td>
                <td className="px-8 py-6 text-right font-mono font-black tracking-tighter">
                  {formatCurrency(tx.amount)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="p-6 border-t border-slate-100 dark:border-white/5 text-center">
        <a
          href="#"
          className="text-xs font-black uppercase text-primary dark:text-blue-400 hover:tracking-widest transition-all duration-300"
        >
          View Full Cycle History
        </a>
      </div>
    </div>
  );
}
