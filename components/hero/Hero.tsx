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
          <p className="text-betadorado font-medium tracking-widest text-sm mb-4" style={{ fontFamily: "var(--font-mont)" }}>
            NEW YORK HAIR ATTITUDE
          </p>
          <h1 className="text-[42px] leading-[1.1] sm:text-[56px] md:text-[72px] mb-6 text-brand-ink" style={{ fontFamily: "var(--font-bodoni)" }}>
            Experiencia de Lujo <br />
            <span className="italic text-black/80">para tu cabello</span>
          </h1>
          <p className="text-lg sm:text-xl text-black/70 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-mont)" }}>
            Color de autor y cortes de precisión en un ambiente diseñado para ti.
          </p>

          <p className="mt-8 text-lg text-brand-ink font-medium" style={{ fontFamily: "var(--font-mont)" }}>
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
