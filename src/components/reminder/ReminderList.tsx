"use client";

import { Trash2, Loader2, Bell, Calendar, Check, Clock } from "lucide-react";
import { formatCurrency, formatDateFull } from "@/lib/utils/formatCurrency";
import { deleteReminder, toggleReminderPaid } from "@/lib/reminder-actions";
import type { Reminder } from "@/types/reminder";
import { CATEGORY_LABELS, CATEGORY_COLORS, getDaysRemaining, getUrgencyColor } from "@/types/reminder";
import { useState, useTransition } from "react";

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

function getMonthKey(dateStr: string): string {
  const clean = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const parts = clean.split("-");
  if (parts.length >= 2) {
    return `${parts[0]}-${parts[1]}`;
  }
  const d = new Date(dateStr);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getFullYear()}-${m}`;
}

function formatMonthTitle(monthKey: string): string {
  const [yearStr, monthStr] = monthKey.split("-");
  const monthIdx = Number(monthStr) - 1;
  const monthName = MONTH_NAMES[monthIdx] ?? monthStr;
  return `${monthName} ${yearStr}`;
}

interface ReminderListProps {
  items: Reminder[];
}

export default function ReminderList({ items }: ReminderListProps) {
  const [filterStatus, setFilterStatus] = useState<"all" | "unpaid" | "paid">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Hapus reminder ini?")) return;
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteReminder(id);
      } catch {
        alert("Gagal menghapus reminder.");
      } finally {
        setDeletingId(null);
      }
    });
  };

  const handleTogglePaid = (id: string, currentPaid: boolean) => {
    setTogglingId(id);
    startTransition(async () => {
      try {
        await toggleReminderPaid(id, !currentPaid);
      } catch {
        alert("Gagal mengupdate status.");
      } finally {
        setTogglingId(null);
      }
    });
  };

  if (items.length === 0) {
    return (
      <section className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
            <Bell className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black tracking-tight leading-none">
            Daftar Tagihan
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-slate-400 dark:text-slate-500 font-bold text-sm">
            Belum ada tagihan
          </p>
          <p className="text-slate-300 dark:text-slate-600 text-xs mt-1">
            Tambahkan tagihan pertamamu
          </p>
        </div>
      </section>
    );
  }

  const unpaidCount = items.filter((r) => !r.is_paid).length;
  const paidCount = items.filter((r) => r.is_paid).length;

  const filteredItems = items.filter((item) => {
    if (filterStatus === "unpaid") return !item.is_paid;
    if (filterStatus === "paid") return item.is_paid;
    return true;
  });

  // Group by month YYYY-MM
  const groups: Record<string, Reminder[]> = {};
  for (const item of filteredItems) {
    const key = getMonthKey(item.due_date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }

  // Sort month keys chronologically
  const sortedMonthKeys = Object.keys(groups).sort();

  // Within each month, sort: unpaid first, then by date ascending
  for (const key of sortedMonthKeys) {
    groups[key].sort((a, b) => {
      if (a.is_paid !== b.is_paid) {
        return a.is_paid ? 1 : -1;
      }
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
  }

  const renderCard = (item: Reminder) => {
    const daysRemaining = getDaysRemaining(item.due_date);
    const urgency = getUrgencyColor(daysRemaining);
    const catColor = CATEGORY_COLORS[item.category];
    const isOverdue = daysRemaining < 0;

    return (
      <div
        key={item.id}
        className={`group flex items-start gap-4 p-4 rounded-2xl transition-all ${
          item.is_paid
            ? "bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/10"
            : "bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50"
        }`}
      >
        {/* Checkbox */}
        <button
          onClick={() => handleTogglePaid(item.id, item.is_paid)}
          disabled={isPending && togglingId === item.id}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
            item.is_paid
              ? "bg-green-500 border-green-500 text-white"
              : "border-slate-300 dark:border-slate-600 hover:border-amber-400"
          }`}
        >
          {isPending && togglingId === item.id ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : item.is_paid ? (
            <Check className="w-3 h-3" />
          ) : null}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-bold text-sm ${item.is_paid ? "text-green-600 dark:text-green-400 line-through" : "text-slate-800 dark:text-slate-200"}`}>
              {item.name}
            </p>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${catColor.bg} ${catColor.text}`}>
              {CATEGORY_LABELS[item.category]}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3 h-3" />
              {formatDateFull(item.due_date)}
            </div>
            {!item.is_paid && (
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${urgency.bg} ${urgency.text}`}>
                {isOverdue && <Clock className="w-2.5 h-2.5 inline mr-0.5" />}
                {urgency.label}
              </span>
            )}
          </div>
        </div>

        {/* Amount + Delete */}
        <div className="flex items-center gap-3 shrink-0">
          <p className={`font-mono font-black text-sm ${item.is_paid ? "text-green-600 dark:text-green-400" : "text-slate-800 dark:text-white"}`}>
            Rp {formatCurrency(item.amount)}
          </p>
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
    );
  };

  return (
    <section className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight leading-none">
              Daftar Tagihan
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-1">
              {items.length} tagihan
            </p>
          </div>
        </div>

        {/* Filter Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-white dark:bg-dark-surface text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Semua ({items.length})
          </button>
          <button
            onClick={() => setFilterStatus("unpaid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              filterStatus === "unpaid"
                ? "bg-white dark:bg-dark-surface text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Belum ({unpaidCount})
          </button>
          <button
            onClick={() => setFilterStatus("paid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              filterStatus === "paid"
                ? "bg-white dark:bg-dark-surface text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Lunas ({paidCount})
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {sortedMonthKeys.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-bold">
            Tidak ada tagihan pada filter ini.
          </div>
        ) : (
          sortedMonthKeys.map((monthKey) => {
            const monthItems = groups[monthKey];
            const monthTitle = formatMonthTitle(monthKey);
            const monthUnpaid = monthItems.filter((r) => !r.is_paid);
            const monthUnpaidTotal = monthUnpaid.reduce((acc, r) => acc + r.amount, 0);
            const allPaidInMonth = monthItems.length > 0 && monthUnpaid.length === 0;

            return (
              <div key={monthKey} className="space-y-3">
                {/* Month Section Header */}
                <div className="flex items-center justify-between flex-wrap gap-2 px-1 pb-2 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        allPaidInMonth ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    <h3 className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                      {monthTitle}
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                      ({monthItems.length})
                    </span>
                  </div>

                  <div>
                    {allPaidInMonth ? (
                      <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                        Semua Lunas
                      </span>
                    ) : (
                      <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-500/20">
                        Rp {formatCurrency(monthUnpaidTotal)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cards for this month */}
                <div className="space-y-2">
                  {monthItems.map(renderCard)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
