"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { MONTH_LABELS_FULL } from "@/types/saving";
import { upsertSavingEntry } from "@/lib/saving-actions";

interface SavingEntryModalProps {
  goalId: string;
  goalName: string;
  instrument: string;
  month: number;
  year: number;
  currentAmount: number;
  onClose: () => void;
}

export default function SavingEntryModal({
  goalId,
  goalName,
  instrument,
  month,
  year,
  currentAmount,
  onClose,
}: SavingEntryModalProps) {
  const [amount, setAmount] = useState(currentAmount > 0 ? currentAmount.toString() : "");
  const [note, setNote] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const formatInputValue = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    return new Intl.NumberFormat("id-ID").format(Number(digits));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setAmount(raw ? formatInputValue(raw) : "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const numericAmount = Number(amount.replace(/\D/g, ""));
    if (isNaN(numericAmount) || numericAmount < 0) {
      setError("Please enter a valid amount");
      return;
    }

    startTransition(async () => {
      try {
        await upsertSavingEntry({
          goal_id: goalId,
          year,
          month,
          amount: numericAmount,
          note: note || undefined,
        });
        onClose();
      } catch {
        setError("Failed to save. Please try again.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full md:max-w-md bg-white dark:bg-dark-surface rounded-t-[2rem] md:rounded-[2rem] p-6 md:p-8 shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-black tracking-tight">
            {currentAmount > 0 ? "Edit" : "Add"} Saving Entry
          </h3>
          <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mt-1">
            {goalName} · {instrument}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Month (read-only) */}
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 block">
              Month
            </label>
            <div className="px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300">
              {MONTH_LABELS_FULL[month - 1]} {year}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 block">
              Balance Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-sm font-mono font-black text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 block">
              Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any notes..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs font-bold text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-violet-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? "Saving..." : currentAmount > 0 ? "Update Entry" : "Add Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
