"use client";

import { useEffect } from "react";
import { CheckCircle2, Trash2, X } from "lucide-react";

export type ToastType = "success" | "delete" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  delete: <Trash2 className="w-5 h-5 text-red-400" />,
  error: <X className="w-5 h-5 text-red-400" />,
};

const BG: Record<ToastType, string> = {
  success: "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-500/30",
  delete: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-500/30",
  error: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-500/30",
};

const TEXT: Record<ToastType, string> = {
  success: "text-emerald-800 dark:text-emerald-200",
  delete: "text-red-800 dark:text-red-200",
  error: "text-red-800 dark:text-red-200",
};

export function Toast({ message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-bottom-4 fade-in duration-300 ${BG[type]}`}
    >
      {ICONS[type]}
      <span className={`text-sm font-black ${TEXT[type]}`}>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
