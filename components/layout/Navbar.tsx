"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      {/* franja superior turquesa + dorado */}
      <div className="h-1 bg-primary"></div>
      <div className="h-1 bg-secondary"></div>

      <div className="mx-auto max-w-screen-3xl px-4 xs:px-5 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Marca (Bebas) */}
        <Link
          href="/"
          className="text-2xl tracking-wide text-brand-ink"
          style={{ fontFamily: "var(--font-bebas)" }}
          aria-label="Spazio Color y Estilo — inicio"
        >
          SPAZIO COLOR Y ESTILO
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

        {/* Botón menú móvil (placeholder, lo activamos si quieres drawer) */}
        <button
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-black/10 text-brand-ink"
          aria-label="Abrir menú"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
