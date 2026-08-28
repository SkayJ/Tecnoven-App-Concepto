import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, CreditCard, Receipt, Wallet, Wifi } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import SocialLinks from "@/components/SocialLinks";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

const NAV = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/pagar", label: "Pagar", icon: CreditCard },
  { to: "/reportar", label: "Reportar", icon: Receipt },
  { to: "/mis-pagos", label: "Mis pagos", icon: Wallet },
  { to: "/servicios", label: "Servicios", icon: Wifi },
];

export default function Layout() {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-body">
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <BrandMark className="h-10 w-10" />
            <span className="text-[1.05rem] font-semibold tracking-tight">
              <span className="text-neutral-900">Tecno</span>
              <span className="text-[#9B0E17]">ven</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    pathname === to ? "bg-[#9B0E17] text-white" : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Button variant="ghost" size="sm" className="text-neutral-500" onClick={() => logout()}>
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 pb-28 pt-6 md:pb-16">
        <Outlet />
      </main>

      <footer className="hidden border-t border-neutral-200 bg-white md:block">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <div>
            <p className="font-semibold text-neutral-900">Tecno<span className="text-[#9B0E17]">ven</span> Services C.A.</p>
            <p className="text-sm text-neutral-500">Internet + Televisión · Soporte 24/7</p>
          </div>
          <SocialLinks compact />
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to} className="flex flex-1 flex-col items-center gap-1 py-2.5">
                <Icon className={`h-5 w-5 ${active ? "text-[#9B0E17]" : "text-neutral-400"}`} />
                <span className={`text-[10px] ${active ? "font-semibold text-[#9B0E17]" : "text-neutral-500"}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <WhatsAppSupport />
    </div>
  );
}