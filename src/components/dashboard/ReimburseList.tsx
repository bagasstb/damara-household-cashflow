"use client";

import { useState, useTransition } from "react";
import type { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils/formatCurrency";
import { Receipt, Check, ArrowRightLeft, Loader2 } from "lucide-react";
import { markAsTransferred } from "@/lib/actions";
import { Toast, type ToastType } from "@/components/ui/Toast";

interface ReimburseListProps {
  transactions: Transaction[];
}

export default function ReimburseList({ transactions }: ReimburseListProps) {
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const pending = transactions.filter((t) => t.is_reimbursable && !t.is_transferred);
  const transferred = transactions.filter((t) => t.is_reimbursable && t.is_transferred);
  
  const totalPending = pending.reduce((acc, t) => acc + t.amount, 0);

  const handleMarkTransferred = (id: string, description: string) => {
    setPendingId(id);
    startTransition(async () => {
      try {
        await markAsTransferred(id);
        setToast({ message: `"${description}" marked as transferred!`, type: "success" });
      } catch (error) {
        setToast({ message: "Failed to update status", type: "error" });
      } finally {
        setPendingId(null);
      }
    });
  };

  if (pending.length === 0 && transferred.length === 0) {
    return null; // hide entirely if nothing to reimburse
  }

  return (
    <div id="reimburse-section" className="bg-white dark:bg-dark-surface p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5 space-y-8 relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      {/* Pending Reimbursable */}
      {pending.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-500">
                <Receipt className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black tracking-tight leading-none">
                Reimbursable
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-wider text-secondary dark:text-slate-400 mb-1">
                Expected Total
              </p>
              <p className="text-lg font-black tracking-tighter text-amber-600 dark:text-amber-400">
                Rp {formatCurrency(totalPending)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {pending.map((tx) => (
              <div
                key={tx.id}
                className={`flex justify-between items-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-4 rounded-2xl group transition-all ${
                  pendingId === tx.id ? "opacity-50" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-black dark:text-white leading-tight">
                    {tx.description}
                  </p>
                  <p className="text-[10px] font-bold text-secondary dark:text-slate-400 uppercase tracking-widest mt-1">
                    {formatDate(tx.date)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right font-mono font-black text-sm text-slate-700 dark:text-slate-300">
                    {formatCurrency(tx.amount)}
                  </div>
                  <button 
                    disabled={isPending && pendingId === tx.id}
                    onClick={() => handleMarkTransferred(tx.id, tx.description)}
                    title="Mark as Transferred" 
                    className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending && pendingId === tx.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Check className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transferred */}
      {transferred.length > 0 && (
        <div className={pending.length > 0 ? "pt-2 border-t border-slate-100 dark:border-white/5 mt-4" : ""}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-500">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-black tracking-tight leading-none text-emerald-600 dark:text-emerald-500">
              Transferred
            </h2>
          </div>

          <div className="space-y-3">
            {transferred.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100/50 dark:border-white/5 p-4 rounded-2xl opacity-75 grayscale-[0.3]"
              >
                <div>
                  <p className="text-sm font-bold dark:text-white leading-tight line-through decoration-emerald-500/40">
                    {tx.description}
                  </p>
                  <p className="text-[10px] font-bold text-secondary dark:text-slate-400 uppercase tracking-widest mt-1">
                    {formatDate(tx.date)}
                  </p>
                </div>
                <div className="text-right font-mono font-bold text-sm text-slate-500 dark:text-slate-500">
                  {formatCurrency(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
