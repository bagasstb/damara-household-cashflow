"use client";

import { useState } from "react";
import { Heart, Pencil, X, Check, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface IhyaQuotaCardProps {
  totalSpent: number;
}

export default function IhyaQuotaCard({ totalSpent }: IhyaQuotaCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState(258_339);
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setEditValue(new Intl.NumberFormat("id-ID").format(total));
    setIsEditing(true);
  };

  const handleSave = () => {
    const cleanAmount = Number(editValue.replace(/\D/g, ""));
    if (cleanAmount > 0) {
      setIsSaving(true);
      // Simulate save
      setTimeout(() => {
        setTotal(cleanAmount);
        setIsSaving(false);
        setIsEditing(false);
      }, 500);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setEditValue("");
      return;
    }
    const formatted = new Intl.NumberFormat("id-ID").format(Number(rawValue));
    setEditValue(formatted);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/20">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white/70 text-xs font-black uppercase tracking-widest">
              Tabungan Ihya
            </h2>
            <p className="text-white text-sm font-bold mt-0.5">
              Total Tabungan Adik
            </p>
          </div>
        </div>

        {/* Total */}
        <div>
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
            Total Tabungan
          </p>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={editValue}
                  onChange={handleAmountChange}
                  autoFocus
                  className="w-full h-12 bg-white/20 border-2 border-white/30 rounded-xl px-4 text-xl font-mono font-black text-white placeholder:text-white/50 focus:outline-none focus:border-white/60"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") handleCancel();
                  }}
                />
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-white/70 text-sm font-black">Rp</span>
                <span className="text-white text-3xl font-black tracking-tighter">
                  {formatCurrency(total)}
                </span>
              </div>
              <button
                onClick={handleEdit}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
