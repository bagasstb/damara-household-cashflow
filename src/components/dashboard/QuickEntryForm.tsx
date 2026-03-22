"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { PlusCircle, ArrowRight, Loader2, Calendar, CheckCircle2 } from "lucide-react";
import { CATEGORIES, CHANNELS } from "@/lib/utils/constants";
import { formatDateFull } from "@/lib/utils/formatCurrency";
import { addTransaction } from "@/lib/actions";

interface QuickEntryFormProps {
  activeCycleId?: string;
}

export default function QuickEntryForm({ activeCycleId }: QuickEntryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  type ActionState = { error: string; success: boolean; timestamp?: number };

  const handleAction = async (state: ActionState, formData: FormData): Promise<ActionState> => {
    if (!activeCycleId) return { error: "No active cycle.", success: false };
    
    try {
      await addTransaction(activeCycleId, {
        amount: Number(formData.get('amount')),
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        channel: formData.get('channel') as string,
        cost_type: formData.get('cost_type') as string,
        is_reimbursable: formData.get('is_reimbursable') === 'true',
        date: formData.get('date') as string,
      });
      return { success: true, timestamp: Date.now(), error: "" };
    } catch (e) {
      return { error: "Failed to save entry.", success: false };
    }
  };

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(handleAction, { error: "", success: false });

  const [showSuccess, setShowSuccess] = useState(false);

  // Reset form on success and trigger success animation
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setFormattedAmount("");
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const [formattedAmount, setFormattedAmount] = useState("");
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // Handle number formatting with dot separators
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digits
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setFormattedAmount("");
      return;
    }
    // Convert to number and format with dots (IDR style)
    const formatted = new Intl.NumberFormat("id-ID").format(Number(rawValue));
    setFormattedAmount(formatted);
  };

  const cleanAmount = parseInt(formattedAmount.replace(/\D/g, ""), 10) || 0;

  if (!activeCycleId) {
    return (
       <section className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5 opacity-50">
           <p className="text-center font-bold">No active cycle available.</p>
       </section>
    );
  }

  return (
    <section id="quick-entry-section" className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden">

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
            showSuccess ? "scale-100 translate-y-0" : "scale-75 translate-y-6"
          }`}
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2
              className={`w-12 h-12 text-emerald-500 transition-all duration-700 ${
                showSuccess ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            />
          </div>
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">Entry Saved!</p>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Transaction recorded successfully</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
          <PlusCircle className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black tracking-tight leading-none">
          Quick Entry
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
              htmlFor="date-input"
              className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider"
            >
              Date
            </label>
            <button
              type="button"
              onClick={() => setSelectedDate(todayStr)}
              className="text-[10px] font-black uppercase text-primary hover:text-blue-700 transition-colors cursor-pointer"
            >
              Set to Today
            </button>
          </div>
          <div className="relative">
            <div 
              onClick={() => {
                try {
                  (document.getElementById('date-input') as HTMLInputElement)?.showPicker();
                } catch (e) {
                  // Fallback for extremely old browsers that don't support showPicker
                  document.getElementById('date-input')?.focus();
                }
              }}
              className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 rounded-2xl px-6 flex items-center justify-between text-sm font-bold transition-all dark:text-white group-disabled:opacity-50 cursor-pointer"
            >
              <span>{formatDateFull(selectedDate || todayStr)}</span>
              <Calendar className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              id="date-input"
              name="date"
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={isPending}
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
            />
          </div>
        </div>

        {/* Nominal */}
        <div className="space-y-2">
          <label
            htmlFor="nominal-input"
            className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
          >
            Nominal (Rp)
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">
              Rp
            </span>
            <input
              type="hidden"
              name="amount"
              value={cleanAmount > 0 ? cleanAmount : ""}
            />
            <input
              id="nominal-input"
              type="text"
              inputMode="numeric"
              placeholder="0"
              required
              value={formattedAmount}
              onChange={handleAmountChange}
              disabled={isPending}
              className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl pl-12 pr-6 text-xl font-black focus:outline-none transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Keterangan */}
        <div className="space-y-2">
          <label
            htmlFor="desc-input"
            className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
          >
            Keterangan
          </label>
          <input
            id="desc-input"
            name="description"
            type="text"
            placeholder="e.g. Starbucks"
            required
            disabled={isPending}
            className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-6 text-sm font-bold focus:outline-none transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 disabled:opacity-50"
          />
        </div>

        {/* Cost Category */}
        <div className="space-y-2">
          <label
            htmlFor="cost-type-select"
            className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
          >
            Cost Category
          </label>
          <select
            id="cost-type-select"
            name="cost_type"
            disabled={isPending}
            className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 text-sm font-bold focus:outline-none transition-all dark:text-white cursor-pointer disabled:opacity-50"
          >
            <option value="fixed cost">Fixed Cost</option>
            <option value="expense cost">Expense Cost</option>
            <option value="urgent cost">Urgent Cost</option>
            <option value="gift (family)">Gift (Family)</option>
            <option value="gift (others)">Gift (Others)</option>
            <option value="tabungan rumah">Tabungan Rumah</option>
            <option value="tabungan anak">Tabungan Anak</option>
            <option value="tabungan couple">Tabungan Couple</option>
            <option value="tabungan">Tabungan</option>
            <option value="household maintenance">Household Maintenance</option>
          </select>
        </div>

        {/* Category + Wallet */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="category-select"
              className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
            >
              Category
            </label>
            <select
              id="category-select"
              name="category"
              disabled={isPending}
              className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 text-sm font-bold focus:outline-none transition-all dark:text-white cursor-pointer disabled:opacity-50"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="channel-select"
              className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-wider ml-1"
            >
              Wallet
            </label>
            <select
              id="channel-select"
              name="channel"
              disabled={isPending}
              className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 text-sm font-bold focus:outline-none transition-all dark:text-white cursor-pointer disabled:opacity-50"
            >
              {CHANNELS.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reimburse Checkbox */}
        <div className="flex items-center gap-3 pl-2 pt-2">
          <input
            type="checkbox"
            id="reimburse-checkbox"
            name="is_reimbursable"
            value="true"
            disabled={isPending}
            className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary/20 bg-slate-50 dark:bg-slate-900 border-2 dark:border-white/10 transition-all cursor-pointer accent-primary"
          />
          <label
            htmlFor="reimburse-checkbox"
            className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none"
          >
            Need to reimburse?
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-16 bg-primary hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 cursor-pointer disabled:opacity-70 disabled:active:scale-100"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Save Entry</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
