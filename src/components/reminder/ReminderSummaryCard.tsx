"use client";

import { Bell } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface ReminderSummaryCardProps {
  totalUnpaid: number;
  unpaidCount: number;
  paidCount: number;
}

export default function ReminderSummaryCard({
  totalUnpaid,
  unpaidCount,
  paidCount,
}: ReminderSummaryCardProps) {
  const total = unpaidCount + paidCount;
  const paidPercent = total > 0 ? Math.round((paidCount / total) * 100) : 0;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-400 p-8 rounded-[2.5rem] shadow-xl shadow-amber-500/20">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white/70 text-xs font-black uppercase tracking-widest">
              Reminder
            </h2>
            <p className="text-white text-sm font-bold mt-0.5">
              Tagihan & Pengingat
            </p>
          </div>
        </div>

        {/* Total Unpaid */}
        <div className="mb-6">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
            Total Belum Dibayar
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-white/70 text-sm font-black">Rp</span>
            <span className="text-white text-3xl font-black tracking-tighter">
              {formatCurrency(totalUnpaid)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-[10px] font-black uppercase tracking-widest">
              {paidCount}/{total} sudah dibayar
            </span>
            <span className="text-white/70 text-[10px] font-black uppercase tracking-widest">
              {paidPercent}%
            </span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${paidPercent}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
              Belum Dibayar
            </p>
            <p className="text-white text-xl font-black">{unpaidCount}</p>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
              Sudah Dibayar
            </p>
            <p className="text-white text-xl font-black">{paidCount}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
