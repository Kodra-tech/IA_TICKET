"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    section: "General",
    items: [
      { href: "/ingeniero/dashboard", label: "Dashboard", icon: "📊" },
      { href: "/ingeniero/tickets", label: "Mis Tickets", icon: "🎫" },
      { href: "/ingeniero/tickets/global", label: "Todos los Tickets", icon: "🌐" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:block">
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <span className="text-xl">🦷</span>
        <span className="text-lg font-bold text-gray-900">DentisPortal</span>
      </div>
      <nav className="p-4">
        {links.map((group) => (
          <div key={group.section}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {group.section}
            </p>
            <div className="space-y-1">
              {group.items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    pathname === link.href
                      ? "bg-cyan-50 text-cyan-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}