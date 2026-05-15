"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ role = "cliente" }: { role?: "cliente" | "ingeniero" }) {
  const pathname = usePathname();
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
            <span className="text-xl">🦷</span>
            <span className="text-lg font-bold text-gray-900">DentisPortal</span>
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

        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
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