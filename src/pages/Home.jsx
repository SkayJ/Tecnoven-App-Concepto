import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/SocialLinks";
import SpeedTest from "@/components/SpeedTest";
import { CreditCard, Receipt, Wallet, Wifi } from "lucide-react";

const QUICK = [
  { to: "/pagar", label: "Pagar", desc: "Datos de cuenta", icon: CreditCard },
  { to: "/reportar", label: "Reportar pago", desc: "Sube tu comprobante", icon: Receipt },
  { to: "/mis-pagos", label: "Mis pagos", desc: "Historial", icon: Wallet },
  { to: "/servicios", label: "Servicios", desc: "Tu plan", icon: Wifi },
];

export default function Home() {
  return (
    <div>
      <section className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#9B0E17] to-[#7d0b12] p-8 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">TecnoVen</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight">Hola 👋</h1>
        <p className="mt-2 max-w-md text-white/80">
          Gestiona tu servicio de internet y televisión: paga, reporta tus comprobantes y revisa tu historial.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/pagar">
            <Button className="bg-white text-[#9B0E17] hover:bg-white/90">Pagar ahora</Button>
          </Link>
          <Link to="/reportar">
            <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
              Reportar pago
            </Button>
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">Accesos rápidos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-[#9B0E17]"
            >
              <div className="inline-flex rounded-xl bg-[#9B0E17]/8 p-2.5 text-[#9B0E17]">
                <q.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 font-semibold text-neutral-900">{q.label}</p>
              <p className="text-sm text-neutral-500">{q.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <SpeedTest />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">Síguenos</h2>
        <SocialLinks />
      </section>
    </div>
  );
}