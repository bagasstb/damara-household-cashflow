"use client";

import { useState, useTransition, useCallback } from "react";
import type { Transaction } from "@/types";
import { formatDate, formatDateFull, formatCurrency } from "@/lib/utils/formatCurrency";
import { getCategoryConfig, CHANNEL_STYLES, CATEGORIES, CHANNELS } from "@/lib/utils/constants";
import { deleteTransaction, updateTransaction } from "@/lib/actions";
import { Trash2, Pencil } from "lucide-react";
import { Toast, type ToastType } from "@/components/ui/Toast";

interface TransactionTableProps {
  transactions: Transaction[];
}

interface ToastState {
  message: string;
  type: ToastType;
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<ToastState | null>(null);

  // Edit form state
  const editingTx = transactions.find((t) => t.id === editId);
  const todayStr = new Date().toISOString().split("T")[0];
  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    category: "",
    channel: "",
    cost_type: "",
    date: todayStr,
    is_reimbursable: false,
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
  }, []);

  const startEdit = (tx: Transaction) => {
    setConfirmId(null);
    setEditId(tx.id);
    setEditForm({
      description: tx.description,
      amount: String(tx.amount),
      category: tx.category?.name ?? "",
      channel: tx.channel,
      cost_type: tx.cost_type,
      date: tx.date.split("T")[0],
      is_reimbursable: tx.is_reimbursable || false,
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTransaction(id);
      setConfirmId(null);
      showToast("Transaction deleted", "delete");
    });
  };

  const handleSave = () => {
    if (!editId) return;
    startTransition(async () => {
      await updateTransaction(editId, {
        description: editForm.description,
        amount: Number(editForm.amount),
        category: editForm.category,
        channel: editForm.channel,
        cost_type: editForm.cost_type,
        is_reimbursable: editForm.is_reimbursable,
        date: editForm.date,
      });
      setEditId(null);
      showToast("Transaction updated!", "success");
    });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      <div className="hidden md:block bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-900/40 text-secondary dark:text-slate-400 text-[10px] uppercase font-black tracking-[0.15em] border-b border-slate-100 dark:border-white/5">
              <th className="px-8 py-5">Tanggal</th>
              <th className="px-8 py-5">Keterangan</th>
              <th className="px-8 py-5">Channel</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5 text-right">Nominal</th>
              <th className="px-4 py-5 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5">
            {transactions.map((tx, index) => {
              const catConfig = getCategoryConfig(tx.category?.name ?? "");
              const channelStyle = CHANNEL_STYLES[tx.channel] ?? CHANNEL_STYLES.Cash;

              const formattedDate = formatDate(tx.date);
              const prevFormattedDate = index > 0 ? formatDate(transactions[index - 1].date) : null;
              const showDate = formattedDate !== prevFormattedDate;
              const isConfirming = confirmId === tx.id;
              const isEditing = editId === tx.id;

              return (
                <>
                  {/* Main row */}
                  <tr
                    key={tx.id}
                    className={`group transition-all duration-200 ${
                      isConfirming
                        ? "bg-red-50 dark:bg-red-500/10"
                        : isEditing
                        ? "bg-blue-50/50 dark:bg-blue-500/5"
                        : "hover:bg-slate-50/50 dark:hover:bg-white/[0.02]"
                    }`}
                  >
                    <td className="px-8 py-5 whitespace-nowrap align-top">
                      {showDate && (
                        <div className="text-xs font-black text-secondary dark:text-slate-400">
                          {formattedDate}
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-black dark:text-white">{tx.description}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-wide ${
                        tx.cost_type === "fixed" || tx.cost_type === "fixed cost"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400"
                      }`}>
                        {tx.cost_type}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${channelStyle.bg} ${channelStyle.text}`}>
                        {tx.channel}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      {catConfig && (
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${catConfig.badgeBg} ${catConfig.badgeText}`}>
                          {tx.category?.name}
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right font-mono font-black tracking-tighter">
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="pr-4 py-5">
                      {isConfirming ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => setConfirmId(null)} className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors px-2 py-1 rounded cursor-pointer">
                            Cancel
                          </button>
                          <button onClick={() => handleDelete(tx.id)} disabled={isPending} className="text-[10px] font-black uppercase text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-60">
                            {isPending ? "…" : "Delete"}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <button
                            onClick={() => startEdit(tx)}
                            className="text-slate-300 hover:text-primary dark:text-slate-600 dark:hover:text-blue-400 cursor-pointer p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { setEditId(null); setConfirmId(tx.id); }}
                            className="text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 cursor-pointer p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* Inline edit panel row */}
                  {isEditing && (
                    <tr key={`${tx.id}-edit`} className="bg-blue-50/40 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-500/20">
                      <td colSpan={6} className="px-8 py-5">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                          {/* Date */}
                          <div className="space-y-1 relative">
                            <label className="text-[9px] font-black uppercase text-secondary/50 dark:text-slate-500 tracking-wider">Date</label>
                            <div className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 flex items-center text-sm font-bold dark:text-white">
                              {editForm.date}
                            </div>
                            <input
                              id={`date-edit-table-${tx.id}`}
                              type="date"
                              value={editForm.date}
                              onChange={(e) => setEditForm((f) => ({ ...f, date: e.target.value }))}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto z-10 pt-5"
                            />
                          </div>
                          {/* Amount */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-secondary/50 dark:text-slate-500 tracking-wider">Amount</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={editForm.amount ? formatCurrency(Number(editForm.amount)) : ""}
                              onChange={(e) => {
                                const rawValue = e.target.value.replace(/\D/g, "");
                                setEditForm((f) => ({ ...f, amount: rawValue }));
                              }}
                              className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                          </div>
                          {/* Description */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Description</label>
                            <input
                              type="text"
                              value={editForm.description}
                              onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                              className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                          </div>
                          {/* Category */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Category</label>
                            <select
                              value={editForm.category}
                              onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                              className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
                            >
                              {CATEGORIES.map((c) => (
                                <option key={c.name} value={c.name}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                          {/* Channel */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Wallet</label>
                            <select
                              value={editForm.channel}
                              onChange={(e) => setEditForm((f) => ({ ...f, channel: e.target.value }))}
                              className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
                            >
                              {CHANNELS.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                          {/* Cost Type */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Cost Type</label>
                            <select
                              value={editForm.cost_type}
                              onChange={(e) => setEditForm((f) => ({ ...f, cost_type: e.target.value }))}
                              className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
                            >
                              <option value="fixed cost">Fixed Cost</option>
                              <option value="expense cost">Expense Cost</option>
                              <option value="urgent cost">Urgent Cost</option>
                              <option value="household maintenance">Household Maintenance</option>
                            </select>
                          </div>
                          {/* Reimburse Checkbox */}
                          <div className="flex items-center gap-3 pl-1 h-10">
                            <input
                              type="checkbox"
                              id={`reimburse-${tx.id}`}
                              checked={editForm.is_reimbursable}
                              onChange={(e) => setEditForm((f) => ({ ...f, is_reimbursable: e.target.checked }))}
                              className="w-4 h-4 rounded border-slate-300 text-primary accent-primary cursor-pointer"
                            />
                            <label
                              htmlFor={`reimburse-${tx.id}`}
                              className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 cursor-pointer select-none"
                            >
                              Reimburse?
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 justify-end">
                          <button
                            onClick={() => setEditId(null)}
                            className="text-xs font-black uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="text-xs font-black uppercase text-white bg-primary hover:bg-blue-700 px-6 py-2 rounded-xl shadow-lg shadow-primary/20 transition-all cursor-pointer disabled:opacity-60"
                          >
                            {isPending ? "Saving…" : "Save Changes"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
        <div className="p-6 border-t border-slate-100 dark:border-white/5 text-center">
          <a href="#" className="text-xs font-black uppercase text-primary dark:text-blue-400 hover:tracking-widest transition-all duration-300">
            View Full Cycle History
          </a>
        </div>
      </div>
    </>
  );
}
