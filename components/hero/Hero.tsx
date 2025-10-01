import BookingQuick from "@/components/booking/BookingQuick";

export default function Hero() {
  return (
    <section id="hero" className="pt-6 sm:pt-10 pb-10 sm:pb-16 bg-surface-muted">
      {/* Franjas NY */}
      <div className="h-1 bg-betaturquesa"></div>
      <div className="h-1 bg-betadorado"></div>

      <div className="container-p grid md:grid-cols-[1.3fr_.9fr] gap-8 items-start">
        {/* Copy principal */}
        <div>
          <p className="text-betadorado text-sm" style={{ fontFamily: "var(--font-bebas)" }}>
            New York Hair Attitude — 2025
          </p>
          <h1 className="text-[40px] leading-[1.05] sm:text-[56px] md:text-[68px] mb-3 text-brand-ink" style={{ fontFamily: "var(--font-bebas)" }}>
            SPAZIO COLOR Y ESTILO
          </h1>
          <p className="text-lg sm:text-xl text-black/70 max-w-2xl" style={{ fontFamily: "var(--font-mont)" }}>
            Color de autor y cortes precisos. Reserva online y recibe confirmación al correo.
          </p>

          <p className="mt-4 text-xl text-brand-ink" style={{ fontFamily: "var(--font-bodoni)" }}>
            Balayage • Highlights • Corte de precisión
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#reserva" className="px-5 py-3 rounded-full bg-betaturquesa text-white hover:bg-betaturquesa-600 transition-colors">
              Reservar hora
            </a>
            <a href="#servicios" className="px-5 py-3 rounded-full border border-betadorado text-brand-ink hover:bg-betadorado/10 transition-colors">
              Ver servicios
            </a>
          </div>
        </div>

        {/* Tarjeta Reserva rápida */}
        <div id="reserva" className="md:pt-6">
          <BookingQuick />
        </div>
      </div>
    </section>
  );
}
