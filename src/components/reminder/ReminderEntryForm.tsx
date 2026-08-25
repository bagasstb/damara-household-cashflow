"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  PlusCircle,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { addReminder } from "@/lib/reminder-actions";
import type { ReminderCategory } from "@/types/reminder";
import { CATEGORY_LABELS } from "@/types/reminder";

export default function ReminderEntryForm() {
  const formRef = useRef<HTMLFormElement>(null);

  type ActionState = { error: string; success: boolean; timestamp?: number };

  const handleAction = async (
    state: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    const name = formData.get("name") as string;
    if (!name?.trim()) {
      return { error: "Masukkan nama tagihan.", success: false };
    }

    const rawAmount = formData.get("amount-display") as string;
    const cleanAmount = Number(rawAmount.replace(/\D/g, ""));
    if (!cleanAmount || cleanAmount <= 0) {
      return { error: "Masukkan nominal yang valid.", success: false };
    }

    const dueDate = formData.get("due_date") as string;
    if (!dueDate) {
      return { error: "Masukkan tanggal jatuh tempo.", success: false };
    }

    const category = formData.get("category") as ReminderCategory;

    try {
      await addReminder({
        name: name.trim(),
        amount: cleanAmount,
        due_date: dueDate,
        category,
      });
      return { success: true, timestamp: Date.now(), error: "" };
    } catch {
      return { error: "Gagal menyimpan reminder.", success: false };
    }
  };

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    handleAction,
    { error: "", success: false }
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [displayAmount, setDisplayAmount] = useState("");
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ReminderCategory>("lainnya");

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setDisplayAmount("");
      setSelectedDate("");
      setSelectedCategory("lainnya");
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
          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
            <CheckCircle2
              className={`w-12 h-12 text-amber-500 transition-all duration-700 ${
                showSuccess ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            />
          </div>
          <p className="text-lg font-black text-amber-600 dark:text-amber-400">
            Berhasil Disimpan!
          </p>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Reminder tagihan berhasil ditambahkan
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
          <PlusCircle className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black tracking-tight leading-none">
          Tambah Tagihan
        </h2>
      </div>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl">
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-6">
        {/* Nama Tagihan */}
        <div className="space-y-2">
          <label
            htmlFor="reminder-name-input"
            className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
          >
            Nama Tagihan
          </label>
          <input
            id="reminder-name-input"
            name="name"
            type="text"
            placeholder="e.g. Pajak Motor"
            required
            disabled={isPending}
            className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-2xl px-6 text-sm font-bold focus:outline-none transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 disabled:opacity-50"
          />
        </div>

        {/* Kategori */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1">
            Kategori
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(CATEGORY_LABELS) as ReminderCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`h-10 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                  selectedCategory === cat
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-amber-300"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <input type="hidden" name="category" value={selectedCategory} />
        </div>

        {/* Nominal */}
        <div className="space-y-2">
          <label
            htmlFor="reminder-amount-input"
            className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
          >
            Nominal (Rp)
          </label>
          <div className="relative">
            <input
              id="reminder-amount-input"
              name="amount-display"
              type="text"
              inputMode="numeric"
              required
              placeholder="0"
              value={displayAmount}
              onChange={handleAmountChange}
              disabled={isPending}
              className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-2xl px-14 text-lg font-mono font-black focus:outline-none transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 disabled:opacity-50"
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">
              Rp
            </div>
          </div>
        </div>

        {/* Tanggal Jatuh Tempo */}
        <div className="space-y-2">
          <label
            htmlFor="reminder-date-input"
            className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
          >
            Tanggal Jatuh Tempo
          </label>
          <input
            id="reminder-date-input"
            name="due_date"
            type="date"
            required
            value={selectedDate}
            min={todayStr}
            onChange={(e) => setSelectedDate(e.target.value)}
            disabled={isPending}
            className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-2xl px-6 text-sm font-bold focus:outline-none transition-all dark:text-white disabled:opacity-50"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-16 bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 cursor-pointer disabled:opacity-70 disabled:active:scale-100"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Simpan Reminder</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
