import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-600 to-cyan-800">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center">
            <Image src="/logo.svg" alt="DMI Portal" width={280} height={80} priority />
          </div>
          <p className="text-sm text-gray-500">
            Soporte técnico especializado para equipos dentales
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/cliente/dashboard"
            className="flex items-center justify-center rounded-lg bg-cyan-600 px-4 py-3 font-medium text-white transition hover:bg-cyan-700"
          >
            Acceder como Cliente
          </Link>
          <Link
            href="/ingeniero/dashboard"
            className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Acceder como Ingeniero
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Marcas soportadas: 3Shape · SprintRay · VHF · Profeta
        </p>
      </div>
    </div>
  );
}