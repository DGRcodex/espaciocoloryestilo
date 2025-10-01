export default function LocationHours() {
  return (
    <section id="ubicacion" className="py-12 md:py-16">
      <div className="container-p grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-3">Ubicación</h2>
          <p className="text-black/70">Calle Ficticia 1234, Piso 2 — Providencia, Santiago</p>
          <div className="mt-4 aspect-video rounded-xl bg-black/5" />
        </div>
        <div>
          <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-3">Horarios</h2>
          <ul className="text-black/70">
            <li>Lunes a Sábado: 10:00–20:00</li>
            <li>Domingo: cerrado</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
