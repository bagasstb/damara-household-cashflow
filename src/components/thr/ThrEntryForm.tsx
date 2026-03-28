"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  PlusCircle,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { formatDateFull } from "@/lib/utils/formatCurrency";
import { addThrSpending } from "@/lib/thr-actions";

export default function ThrEntryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  type ActionState = { error: string; success: boolean; timestamp?: number };

  const handleAction = async (
    state: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    const rawAmount = formData.get("amount-display") as string;
    const cleanAmount = Number(rawAmount.replace(/\D/g, ""));

    if (!cleanAmount || cleanAmount <= 0) {
      return { error: "Masukkan nominal yang valid.", success: false };
    }

    const description = formData.get("description") as string;
    if (!description?.trim()) {
      return { error: "Masukkan keterangan.", success: false };
    }

    try {
      await addThrSpending({
        amount: cleanAmount,
        description: description.trim(),
        date: formData.get("date") as string,
      });
      return { success: true, timestamp: Date.now(), error: "" };
    } catch {
      return { error: "Gagal menyimpan pengeluaran THR.", success: false };
    }
  };

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    handleAction,
    { error: "", success: false }
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [displayAmount, setDisplayAmount] = useState("");
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setDisplayAmount("");
      setSelectedDate(todayStr);
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setDisplayAmount("");
      return;
    }
    const formatted = new Intl.NumberFormat("id-ID").format(Number(rawValue));
    setDisplayAmount(formatted);
  };

  return (
    <section className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden">
      {/* Success Toast */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[2.5rem] transition-all duration-500 pointer-events-none ${
          showSuccess
            ? "opacity-100 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80"
            : "opacity-0"
        }`}
      >
        <div
          className={`flex flex-col items-center gap-4 transition-all duration-500 ${
            showSuccess
              ? "scale-100 translate-y-0"
              : "scale-75 translate-y-6"
          }`}
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2
              className={`w-12 h-12 text-emerald-500 transition-all duration-700 ${
                showSuccess ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            />
          </div>
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            Berhasil Disimpan!
          </p>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Pengeluaran THR berhasil dicatat
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
          <PlusCircle className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black tracking-tight leading-none">
          Tambah Pengeluaran
        </h2>
      </div>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl">
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-6">
        {/* Date Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <label
              htmlFor="thr-date-input"
              className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider"
            >
              Tanggal
            </label>
            <button
              type="button"
              onClick={() => setSelectedDate(todayStr)}
              className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Hari Ini
            </button>
          </div>
          <div className="relative">
            <div
              className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 rounded-2xl px-6 flex items-center justify-between text-sm font-bold transition-all dark:text-white cursor-pointer"
            >
              <span>{formatDateFull(selectedDate || todayStr)}</span>
            </div>
            <input
              ref={dateInputRef}
              id="thr-date-input"
              name="date"
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              onClick={(e) => (e.target as HTMLInputElement).showPicker()}
              disabled={isPending}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto z-10"
            />
          </div>
        </div>

        {/* Nominal */}
        <div className="space-y-2">
          <label
            htmlFor="thr-nominal-input"
            className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
          >
            Nominal (Rp)
          </label>
          <div className="relative">
            <input
              id="thr-nominal-input"
              name="amount-display"
              type="text"
              inputMode="numeric"
              required
              placeholder="0"
              value={displayAmount}
              onChange={handleAmountChange}
              disabled={isPending}
              className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-14 text-lg font-mono font-black focus:outline-none transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 disabled:opacity-50"
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">
              Rp
            </div>
          </div>
        </div>

        {/* Keterangan */}
        <div className="space-y-2">
          <label
            htmlFor="thr-desc-input"
            className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
          >
            Keterangan
          </label>
          <input
            id="thr-desc-input"
            name="description"
            type="text"
            placeholder="e.g. Beli Baju Lebaran"
            required
            disabled={isPending}
            className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-6 text-sm font-bold focus:outline-none transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 disabled:opacity-50"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 cursor-pointer disabled:opacity-70 disabled:active:scale-100"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Simpan Pengeluaran</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
