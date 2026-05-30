"use client";

import { useState } from "react";
import { CloudDownload, CheckCircle2, XCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { importFromGoogleSheet, type ImportResult } from "@/lib/sheet-import";

export default function ImportFromSheetButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<ImportResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleImport = async () => {
    setStatus("loading");
    setResult(null);
    setShowDetails(false);
    try {
      const res = await importFromGoogleSheet();
      setResult(res);
      setStatus(res.errors.length > 0 && res.imported === 0 ? "error" : "success");
    } catch (e) {
      setResult({
        imported: 0,
        updated: 0,
        skipped: 0,
        errors: [e instanceof Error ? e.message : "Unknown error"],
        sheetResults: [],
      });
      setStatus("error");
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleImport}
        disabled={status === "loading"}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-black uppercase tracking-wider transition-all
          ${status === "loading"
            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            : status === "success"
            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
            : status === "error"
            ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20"
            : "bg-primary/10 hover:bg-primary/20 text-primary dark:text-blue-400 border border-primary/20 hover:border-primary/40"
          }`}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : status === "success" ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : status === "error" ? (
          <XCircle className="w-4 h-4" />
        ) : (
          <CloudDownload className="w-4 h-4" />
        )}

        {status === "loading"
          ? "Importing..."
          : status === "success"
          ? `✅ ${result?.imported} imported, ${result?.updated} updated`
          : status === "error"
          ? "Import failed"
          : "Import from Google Sheet"}
      </button>

      {/* Result summary */}
      {result && status !== "loading" && (
        <div className={`rounded-2xl border text-xs overflow-hidden
          ${status === "error" && result.imported === 0
            ? "bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20"
            : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5"
          }`}
        >
          {/* Stats row */}
          <div className="flex items-center gap-4 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-black text-emerald-600 dark:text-emerald-400">{result.imported}</span>
              <span className="text-secondary dark:text-slate-400 font-bold">new</span>
            </div>
            {result.updated > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="font-black text-blue-600 dark:text-blue-400">{result.updated}</span>
                <span className="text-secondary dark:text-slate-400 font-bold">updated</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="font-black text-slate-500 dark:text-slate-400">{result.skipped}</span>
              <span className="text-secondary dark:text-slate-400 font-bold">skipped</span>
            </div>
            {result.errors.length > 0 && (
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-black text-amber-600 dark:text-amber-400">{result.errors.length} warnings</span>
              </div>
            )}
          </div>

          {/* Per-sheet breakdown */}
          {result.sheetResults.length > 0 && (
            <div className="border-t border-slate-200 dark:border-white/5 px-4 py-2 flex flex-wrap gap-3">
              {result.sheetResults.map((s) => (
                <span key={s.sheet} className="text-[10px] font-black uppercase tracking-wide">
                  <span className="text-slate-400 dark:text-slate-500">{s.sheet}:</span>{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">+{s.imported}</span>
                  {s.updated > 0 && (
                    <span className="text-blue-500 dark:text-blue-400 ml-1">↻{s.updated}</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Errors/warnings collapsible */}
          {result.errors.length > 0 && (
            <>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between px-4 py-2 border-t border-amber-200 dark:border-amber-500/20 text-[10px] font-black uppercase tracking-wide text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/5 transition-colors"
              >
                <span>Show warnings ({result.errors.length})</span>
                {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {showDetails && (
                <div className="px-4 pb-3 space-y-1 max-h-40 overflow-y-auto">
                  {result.errors.map((err, i) => (
                    <p key={i} className="text-[10px] text-amber-700 dark:text-amber-400 font-mono leading-relaxed">
                      {err}
                    </p>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
