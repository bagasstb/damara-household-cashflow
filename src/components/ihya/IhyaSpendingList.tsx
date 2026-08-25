"use client";

import { Trash2, Loader2, Heart, Calendar } from "lucide-react";
import { formatCurrency, formatDateFull } from "@/lib/utils/formatCurrency";
import { deleteIhyaAssistance } from "@/lib/ihya-actions";
import type { IhyaAssistance } from "@/types/ihya";
import { useState, useTransition } from "react";

interface IhyaSpendingListProps {
  items: IhyaAssistance[];
}

export default function IhyaSpendingList({ items }: IhyaSpendingListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Hapus bantuan ini?")) return;
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteIhyaAssistance(id);
      } catch {
        alert("Gagal menghapus bantuan.");
      } finally {
        setDeletingId(null);
      }
    });
  };

  if (items.length === 0) {
    return (
      <section className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black tracking-tight leading-none">
            Riwayat Bantuan
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-slate-400 dark:text-slate-500 font-bold text-sm">
            Belum ada bantuan untuk Ihya
          </p>
          <p className="text-slate-300 dark:text-slate-600 text-xs mt-1">
            Tambahkan bantuan pertamamu
          </p>
        </div>
      </section>
    );
  }

  // Group by date
  const grouped = items.reduce<Record<string, IhyaAssistance[]>>((acc, item) => {
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
        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
          <Heart className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-black tracking-tight leading-none">
            Riwayat Bantuan
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-1">
            {items.length} bantuan
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
                    className="group flex items-start md:items-center gap-3 md:gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all"
                  >
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 shrink-0 mt-0.5 md:mt-0">
                      <Heart className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                        {item.description}
                      </p>
                      <p className="font-mono font-black text-sm text-blue-600 dark:text-blue-400 mt-1 md:hidden">
                        Rp {formatCurrency(item.amount)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden md:block">
                        <p className="font-mono font-black text-sm text-slate-800 dark:text-white">
                          Rp {formatCurrency(item.amount)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending && deletingId === item.id}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer disabled:opacity-50"
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

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Total Bantuan
          </span>
          <span className="text-lg font-mono font-black text-blue-600 dark:text-blue-400">
            Rp {formatCurrency(items.reduce((s, i) => s + i.amount, 0))}
          </span>
        </div>
      </div>
    </section>
  );
}
