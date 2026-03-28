"use client";

import { Trash2, Loader2, ShoppingBag, Calendar } from "lucide-react";
import { formatCurrency, formatDateFull } from "@/lib/utils/formatCurrency";
import { deleteThrSpending } from "@/lib/thr-actions";
import type { ThrSpending } from "@/types/thr";
import { useState, useTransition } from "react";

interface ThrSpendingListProps {
  items: ThrSpending[];
}

export default function ThrSpendingList({ items }: ThrSpendingListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Hapus pengeluaran ini?")) return;
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteThrSpending(id);
      } catch {
        alert("Gagal menghapus pengeluaran.");
      } finally {
        setDeletingId(null);
      }
    });
  };

  if (items.length === 0) {
    return (
      <section className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black tracking-tight leading-none">
            Riwayat Pengeluaran
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-slate-400 dark:text-slate-500 font-bold text-sm">
            Belum ada pengeluaran THR
          </p>
          <p className="text-slate-300 dark:text-slate-600 text-xs mt-1">
            Tambahkan pengeluaran pertamamu
          </p>
        </div>
      </section>
    );
  }

  // Group by date
  const grouped = items.reduce<Record<string, ThrSpending[]>>((acc, item) => {
    const dateKey = item.date;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <section className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-black tracking-tight leading-none">
            Riwayat Pengeluaran
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-1">
            {items.length} transaksi
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {sortedDates.map((dateKey) => {
          const dayItems = grouped[dateKey];
          const dayTotal = dayItems.reduce((s, i) => s + i.amount, 0);

          return (
            <div key={dateKey}>
              {/* Date header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDateFull(dateKey)}
                </div>
                <span className="text-xs font-black text-slate-400 dark:text-slate-500 font-mono">
                  Rp {formatCurrency(dayTotal)}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {dayItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all"
                  >
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="font-mono font-black text-sm text-slate-800 dark:text-white">
                          Rp {formatCurrency(item.amount)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending && deletingId === item.id}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer disabled:opacity-50"
                      >
                        {isPending && deletingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
