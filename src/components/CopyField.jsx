import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyField({ label, value, copyValue }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(copyValue || value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      onClick={copy}
      className="w-full flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left transition-all hover:border-[#9B0E17]/40 hover:shadow-sm active:scale-[0.99]"
    >
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-widest text-neutral-400">{label}</span>
        <span className="block truncate font-medium text-neutral-900">{value}</span>
      </span>
      <span className={`shrink-0 rounded-lg p-2 ${copied ? "bg-emerald-50 text-emerald-600" : "bg-neutral-50 text-neutral-500"}`}>
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </span>
    </button>
  );
}