import React from "react";
import { FileText } from "lucide-react";

const STATES = {
  en_revision: { label: "En revisión", cls: "bg-amber-50 text-amber-700" },
  verificado: { label: "Verificado", cls: "bg-emerald-50 text-emerald-700" },
  rechazado: { label: "Rechazado", cls: "bg-red-50 text-red-700" },
};

export default function PaymentRow({ payment }) {
  const st = STATES[payment.estado] || STATES.en_revision;
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-5 py-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-neutral-900">
            {payment.moneda === "USD" ? "$" : "Bs "}
            {Number(payment.monto).toLocaleString("es-VE", { minimumFractionDigits: 2 })}
          </p>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${st.cls}`}>{st.label}</span>
        </div>
        <p className="mt-0.5 truncate text-sm text-neutral-500">
          {payment.metodo} · Ref. {payment.referencia} · {payment.fecha}
        </p>
      </div>
      {payment.comprobante_url && (
        <a
          href={payment.comprobante_url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-lg bg-neutral-50 p-2 text-neutral-500 hover:text-[#9B0E17]"
        >
          <FileText className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}