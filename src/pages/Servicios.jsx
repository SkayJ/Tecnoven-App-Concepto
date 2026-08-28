import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import localClient from "@/api/localClient";
import { Button } from "@/components/ui/button";
import { Wifi } from "lucide-react";

export default function Servicios() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    localClient.entities.Service.list().then(setServices);
  }, []);

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#9B0E17]">Mi plan</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">Servicios</h1>
        <p className="mt-2 max-w-lg text-neutral-500">El servicio TecnoVen al que estás suscrito.</p>
      </header>

      {services === null ? (
        <p className="text-neutral-400">Cargando…</p>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
          <p className="font-medium text-neutral-800">Aún no tienes un servicio asociado</p>
          <p className="mt-1 text-sm text-neutral-500">
            Comunícate con soporte para activar tu plan TecnoVen.
          </p>
          <Link to="/pagar">
            <Button variant="outline" className="mt-4 border-[#9B0E17] text-[#9B0E17] hover:bg-[#9B0E17]/5">
              Ver datos de pago
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.id} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-xl bg-[#9B0E17]/8 p-2.5 text-[#9B0E17]">
                  <Wifi className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-900">{s.plan_nombre}</h2>
                  <p className="text-sm text-neutral-500">{s.tipo}</p>
                </div>
              </div>
              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-neutral-400">Velocidad</dt>
                  <dd className="mt-1 font-semibold text-neutral-900">
                    {s.velocidad_mbps ? `${s.velocidad_mbps} Mbps` : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-neutral-400">Mensualidad</dt>
                  <dd className="mt-1 font-semibold text-neutral-900">
                    {s.moneda === "USD" ? "$" : "Bs "}
                    {s.precio_mensual?.toLocaleString("es-VE", { minimumFractionDigits: 2 })}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-neutral-400">Día de corte</dt>
                  <dd className="mt-1 font-semibold text-neutral-900">Día {s.fecha_corte || 5}</dd>
                </div>
              </dl>
              {s.direccion && (
                <p className="mt-4 text-sm text-neutral-500">Dirección: {s.direccion}</p>
              )}
              <Link to="/pagar">
                <Button className="mt-5 bg-[#9B0E17] hover:bg-[#7d0b12]">Pagar mensualidad</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}