import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DMI Portal - Soporte Técnico Dental",
  description: "DMI Portal - Soporte técnico para equipos dentales 3Shape, SprintRay, VHF y Profeta",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}