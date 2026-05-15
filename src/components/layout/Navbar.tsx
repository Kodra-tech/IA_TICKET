"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ role = "cliente" }: { role?: "cliente" | "ingeniero" }) {
  const pathname = usePathname();
  const router = useRouter();
  const isCliente = role === "cliente";

  const clienteLinks = [
    { href: "/cliente/dashboard", label: "Dashboard" },
    { href: "/cliente/equipos", label: "Mis Equipos" },
  ];

  const ingenieroLinks = [
    { href: "/ingeniero/dashboard", label: "Dashboard" },
    { href: "/ingeniero/tickets", label: "Mis Tickets" },
    { href: "/ingeniero/tickets/global", label: "Todos los Tickets" },
  ];

  const links = isCliente ? clienteLinks : ingenieroLinks;

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href={isCliente ? "/cliente/dashboard" : "/ingeniero/dashboard"} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-sm font-bold text-white">D</div>
            <span className="text-lg font-bold text-gray-900">DMI Portal</span>
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-cyan-50 text-cyan-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            Salir
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-sm font-medium text-cyan-700">
              {isCliente ? "DG" : "CM"}
            </div>
            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              {isCliente ? "Dra. García" : "Ing. Carlos Mendoza"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}