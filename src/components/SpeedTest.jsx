import React, { useState, useRef } from "react";
import { Gauge, Loader2, Play, RotateCcw } from "lucide-react";

const MB = 1024 * 1024;
const DOWNLOAD_BYTES = 25 * MB;

export default function SpeedTest() {
  const [phase, setPhase] = useState("idle"); // idle | testing | done
  const [progress, setProgress] = useState(0);
  const [mbps, setMbps] = useState(0);
  const [ping, setPing] = useState(null);
  const reqRef = useRef(null);

  const measurePing = async () => {
    const t0 = performance.now();
    await fetch(`https://speed.cloudflare.com/__down?bytes=0&t=${Date.now()}`, { cache: "no-store" });
    return Math.round(performance.now() - t0);
  };

  const runTest = async () => {
    setPhase("testing");
    setProgress(0);
    setMbps(0);
    try {
      const p = await measurePing();
      setPing(p);

      const url = `https://speed.cloudflare.com/__down?bytes=${DOWNLOAD_BYTES}&t=${Date.now()}`;
      const res = await fetch(url, { cache: "no-store" });
      const reader = res.body.getReader();
      let received = 0;
      const t0 = performance.now();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.length;
        const elapsed = (performance.now() - t0) / 1000;
        const inst = (received * 8) / (elapsed * 1e6);
        setMbps(inst);
        setProgress(Math.min(100, (received / DOWNLOAD_BYTES) * 100));
      }
      const totalSec = (performance.now() - t0) / 1000;
      setMbps(Math.round(((received * 8) / (totalSec * 1e6)) * 100) / 100);
      setProgress(100);
      setPhase("done");
    } catch {
      setPhase("idle");
      setProgress(0);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="inline-flex rounded-xl bg-[#9B0E17]/8 p-2.5">
          <Gauge className="h-5 w-5 text-[#9B0E17]" />
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900">Medidor de velocidad</h3>
          <p className="text-sm text-neutral-500">Revisa cómo va tu internet TecnoVen.</p>
        </div>
      </div>

      <div className="my-6 flex flex-col items-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#f1f1f1" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="44" fill="none" stroke="#9B0E17" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(progress / 100) * 276} 276`}
              className="transition-all duration-200"
            />
          </svg>
          <div className="text-center">
            <p className="text-3xl font-bold text-neutral-900">{mbps.toFixed(mbps < 100 ? 1 : 0)}</p>
            <p className="text-xs text-neutral-400">Mbps</p>
          </div>
        </div>

        {ping !== null && phase === "done" && (
          <p className="mt-2 text-sm text-neutral-500">Ping: {ping} ms</p>
        )}
      </div>

      <button
        onClick={runTest}
        disabled={phase === "testing"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9B0E17] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#7d0b12] disabled:opacity-60"
      >
        {phase === "testing" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Midiendo…</>
        ) : phase === "done" ? (
          <><RotateCcw className="h-4 w-4" /> Repetir prueba</>
        ) : (
          <><Play className="h-4 w-4" /> Iniciar prueba</>
        )}
      </button>
    </div>
  );
}