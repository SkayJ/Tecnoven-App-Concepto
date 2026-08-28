import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/socialLinks";

export default function WhatsAppSupport() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl md:bottom-24">
          <div className="flex items-center justify-between bg-[#25D366] px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold leading-tight">Soporte TecnoVen</p>
                <p className="text-[11px] text-white/80">IA disponible 24/7</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-neutral-600">
              Escríbenos por WhatsApp. Nuestro asistente con IA te responde al instante, a cualquier hora.
            </p>
            <p className="mt-2 text-xs text-neutral-400">Número: {WHATSAPP_DISPLAY}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white hover:bg-[#1ebd5a]"
            >
              <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110 active:scale-95 md:bottom-6"
        aria-label="Soporte por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#9B0E17]" />
        </span>
      </button>
    </>
  );
}