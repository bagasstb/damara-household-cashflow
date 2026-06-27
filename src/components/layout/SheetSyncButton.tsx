"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CloudDownload,
  RefreshCw,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { importFromGoogleSheet } from "@/lib/sheet-import";
import { syncBudgetLimitsFromSheet } from "@/lib/sheet-import";

type ActionStatus = "idle" | "loading" | "success" | "error";

export default function SheetSyncButton() {
  const [open, setOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<ActionStatus>("idle");
  const [syncStatus, setSyncStatus] = useState<ActionStatus>("idle");
  const [importMsg, setImportMsg] = useState("");
  const [syncMsg, setSyncMsg] = useState("");
  const [isPendingImport, startImport] = useTransition();
  const [isPendingSync, startSync] = useTransition();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleImport = () => {
    setImportStatus("loading");
    setImportMsg("");
    startImport(async () => {
      try {
        const res = await importFromGoogleSheet();
        const hasError = res.errors.length > 0 && res.imported === 0;
        setImportStatus(hasError ? "error" : "success");
        setImportMsg(
          hasError
            ? "Import gagal"
            : `+${res.imported} baru, ↻${res.updated} updated`
        );
        if (!hasError) router.refresh();
      } catch {
        setImportStatus("error");
        setImportMsg("Import gagal");
      }
    });
  };

  const handleSync = () => {
    setSyncStatus("loading");
    setSyncMsg("");
    startSync(async () => {
      try {
        const res = await syncBudgetLimitsFromSheet();
        setSyncStatus(res.errors.length > 0 && res.updated === 0 ? "error" : "success");
        setSyncMsg(
          res.errors.length > 0 && res.updated === 0
            ? "Sync gagal"
            : `${res.updated} limit diupdate`
        );
        router.refresh();
      } catch {
        setSyncStatus("error");
        setSyncMsg("Sync gagal");
      }
    });
  };

  const isAnyLoading = isPendingImport || isPendingSync;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider transition-all border border-slate-200 dark:border-white/10 cursor-pointer"
        title="Sync Sheet"
      >
        {isAnyLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <CloudDownload className="w-3.5 h-3.5" />
        )}
        <span className="hidden sm:inline">Sheet</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 overflow-hidden z-50">
          <div className="px-3 py-2.5 border-b border-slate-100 dark:border-white/5">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Google Sheet
            </p>
          </div>

          {/* Import transactions */}
          <button
            onClick={handleImport}
            disabled={isPendingImport}
            className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            <div className="mt-0.5">
              {importStatus === "loading" ? (
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              ) : importStatus === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : importStatus === "error" ? (
                <XCircle className="w-4 h-4 text-red-500" />
              ) : (
                <CloudDownload className="w-4 h-4 text-primary dark:text-blue-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-black text-slate-800 dark:text-white leading-none">
                Import Transaksi
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-1 leading-snug">
                {importMsg || "Tarik semua transaksi dari Google Sheet"}
              </p>
            </div>
          </button>

          <div className="h-px bg-slate-100 dark:bg-white/5 mx-4" />

          {/* Sync budget limits */}
          <button
            onClick={handleSync}
            disabled={isPendingSync}
            className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            <div className="mt-0.5">
              {syncStatus === "loading" ? (
                <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
              ) : syncStatus === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : syncStatus === "error" ? (
                <XCircle className="w-4 h-4 text-red-500" />
              ) : (
                <RefreshCw className="w-4 h-4 text-violet-500 dark:text-violet-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-black text-slate-800 dark:text-white leading-none">
                Sync Budget Limit
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-1 leading-snug">
                {syncMsg || "Update limit dari nilai di Google Sheet"}
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
