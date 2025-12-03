"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      {/* franja superior turquesa + dorado */}
      <div className="h-1 bg-primary"></div>
      <div className="h-1 bg-secondary"></div>

      <div className="container-p h-16 flex items-center justify-center lg:justify-between">
        {/* Marca (Bebas) */}
        <Link
          href="/"
          className="block"
          aria-label="Spazio Color y Estilo — inicio"
        >
          <Image
            src="/logotransparente.png"
            alt="Spazio Color y Estilo"
            width={180}
            height={50}
            className="h-14 lg:h-12 w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden lg:flex items-center gap-7 font-mont text-sm text-brand-ink/80">
          <a href="#servicios" className="hover:text-brand-ink">Servicios</a>
          <a href="#equipo" className="hover:text-brand-ink">Equipo</a>
          <a href="#reserva" className="hover:text-brand-ink">Reserva</a>
          <a href="#galeria" className="hover:text-brand-ink">Galería</a>
          <a href="#contacto" className="hover:text-brand-ink">Contacto</a>
          <a
            href="#reserva"
            className="inline-flex items-center rounded-full px-4 py-2 bg-primary text-white hover:bg-primary-600 transition-colors"
            aria-label="Reservar hora"
          >
            Reservar hora
          </a>
        </nav>
      </div>
    </header>
  );
}
