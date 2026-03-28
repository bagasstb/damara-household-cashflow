"use client";

import { useState, useTransition, useCallback } from "react";
import type { Transaction } from "@/types";
import { formatDateFull, formatCurrency } from "@/lib/utils/formatCurrency";
import { getCategoryConfig, CHANNEL_STYLES, CATEGORIES, CHANNELS } from "@/lib/utils/constants";
import { deleteTransaction, updateTransaction } from "@/lib/actions";
import { Trash2, Pencil, CheckCircle2 } from "lucide-react";
import { Toast, type ToastType } from "@/components/ui/Toast";

interface TransactionCardProps {
  transaction: Transaction;
  showDate?: boolean;
}

interface ToastState {
  message: string;
  type: ToastType;
}

export default function TransactionCard({ transaction: tx, showDate = true }: TransactionCardProps) {
  const catConfig = getCategoryConfig(tx.category?.name ?? "");
  const channelStyle = CHANNEL_STYLES[tx.channel] ?? CHANNEL_STYLES.Cash;
  const Icon = catConfig?.icon;

  const [mode, setMode] = useState<"view" | "edit" | "confirm-delete">("view");
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<ToastState | null>(null);

  const todayStr = tx.date.split("T")[0];
  const [editForm, setEditForm] = useState({
    description: tx.description,
    amount: String(tx.amount),
    category: tx.category?.name ?? "",
    channel: tx.channel,
    cost_type: tx.cost_type,
    date: todayStr,
    is_reimbursable: tx.is_reimbursable || false,
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
  }, []);

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTransaction(tx.id);
      showToast("Transaction deleted", "delete");
    });
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateTransaction(tx.id, {
        description: editForm.description,
        amount: Number(editForm.amount),
        category: editForm.category,
        channel: editForm.channel,
        cost_type: editForm.cost_type,
        is_reimbursable: editForm.is_reimbursable,
        date: editForm.date,
      });
      setMode("view");
      showToast("Transaction updated!", "success");
    });
  };

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}

      {/* DELETE CONFIRM */}
      {mode === "confirm-delete" ? (
        <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-3xl border border-red-200 dark:border-red-500/30">
          <p className="text-sm font-black dark:text-white mb-1">{tx.description}</p>
          <p className="text-xs text-red-600 dark:text-red-400 font-bold mb-4">Are you sure you want to delete this transaction?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setMode("view")}
              className="flex-1 py-2.5 text-sm font-black text-slate-500 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex-1 py-2.5 text-sm font-black text-white bg-red-500 hover:bg-red-600 rounded-xl cursor-pointer disabled:opacity-60"
            >
              {isPending ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      ) : mode === "edit" ? (
        /* EDIT MODE */
        <div className="bg-blue-50/60 dark:bg-blue-900/15 p-5 rounded-3xl border border-blue-200 dark:border-blue-500/20">
          <p className="text-[10px] font-black uppercase text-primary dark:text-blue-400 tracking-wider mb-4">Edit Transaction</p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 relative">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Date</label>
                <div className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 flex items-center text-sm font-bold dark:text-white cursor-pointer">
                  {formatDateFull(editForm.date)}
                </div>
                <input
                  id={`date-edit-${tx.id}`}
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm((f) => ({ ...f, date: e.target.value }))}
                  onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto z-10 pt-5"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Amount</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={editForm.amount ? formatCurrency(Number(editForm.amount)) : ""}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");
                    setEditForm((f) => ({ ...f, amount: rawValue }));
                  }}
                  className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Description</label>
              <input
                type="text"
                value={editForm.description}
                onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Wallet</label>
                <select
                  value={editForm.channel}
                  onChange={(e) => setEditForm((f) => ({ ...f, channel: e.target.value }))}
                  className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none cursor-pointer"
                >
                  {CHANNELS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Reimburse Checkbox */}
            <div className="flex items-center gap-3 pl-1 pt-1">
              <input
                type="checkbox"
                id={`reimburse-card-${tx.id}`}
                checked={editForm.is_reimbursable}
                onChange={(e) => setEditForm((f) => ({ ...f, is_reimbursable: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-300 text-primary accent-primary cursor-pointer"
              />
              <label
                htmlFor={`reimburse-card-${tx.id}`}
                className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none"
              >
                Need to reimburse?
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setMode("view")}
              className="flex-1 py-2.5 text-sm font-black text-slate-500 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex-1 py-2.5 text-sm font-black text-white bg-primary hover:bg-blue-700 rounded-xl shadow-md shadow-primary/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPending ? "Saving…" : (
                <><CheckCircle2 className="w-4 h-4" /> Save</>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* VIEW MODE */
        <div className="bg-white dark:bg-dark-surface p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5">
          <div className="flex justify-between items-start mb-3">
            <div className="text-[10px] font-black text-secondary dark:text-slate-400 uppercase tracking-wider">
              {showDate && formatDateFull(tx.date)}
            </div>
            <div className="text-sm font-mono font-black tracking-tighter">
              {formatCurrency(tx.amount)}
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            {catConfig && Icon && (
              <div className={`w-10 h-10 ${catConfig.bgLight} ${catConfig.bgDark} rounded-xl flex items-center justify-center ${catConfig.textLight} ${catConfig.textDark}`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h4 className="text-sm font-black dark:text-white">{tx.description}</h4>
              <p className={`text-[10px] font-bold uppercase ${
                tx.cost_type === "fixed" || tx.cost_type === "fixed cost"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-slate-400"
              }`}>
                {tx.cost_type}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${channelStyle.bg} ${channelStyle.text}`}>
              {tx.channel}
            </span>
            {catConfig && (
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${catConfig.badgeBg} ${catConfig.badgeText}`}>
                {tx.category?.name}
              </span>
            )}
            <div className="ml-auto flex items-center gap-1">
              <button
                onClick={() => setMode("edit")}
                className="text-slate-300 dark:text-slate-600 hover:text-primary dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMode("confirm-delete")}
                className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
