type Item = { title: string; desc: string; price?: string; duration?: string };
const items: Item[] = [
  { title: "Balayage de autor", desc: "Color saludable y transición suave", price: "desde $", duration: "60–180 min" },
  { title: "Highlights precisos", desc: "Luz medida, técnica impecable", price: "desde $", duration: "60–180 min" },
  { title: "Corte + Styling", desc: "Corte con carácter y peinado", price: "desde $", duration: "60–90 min" },
  { title: "Color global", desc: "Cobertura pareja y brillo", price: "desde $", duration: "60–120 min" },
];

export default function Services() {
  return (
    <section id="servicios" className="py-12 md:py-16">
      <div className="container-p">
        <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-6">Servicios destacados</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <article key={it.title} className="card p-5 relative">
              <h3 className="text-xl font-semibold">{it.title}</h3>
              <p className="text-black/60 mt-1">{it.desc}</p>
              <div className="mt-4 text-sm text-black/70 flex items-center gap-3">
                <span>{it.price}</span>
                <span className="inline-block rounded-full px-2 py-0.5 border text-xs">{it.duration}</span>
              </div>
              <a href="#reserva" className="mt-4 inline-block rounded-full border px-4 py-2 text-sm hover:bg-black/[.03]">
                Reservar
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
