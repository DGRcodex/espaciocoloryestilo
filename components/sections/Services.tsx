import Image from "next/image";

type Item = { title: string; desc: string; price?: string; duration?: string; img: string };
const items: Item[] = [
  { title: "Balayage de autor", desc: "Color saludable y transición suave", price: "desde $", duration: "60–180 min", img: "/images/services/balayage.jpg" },
  { title: "Highlights precisos", desc: "Luz medida, técnica impecable", price: "desde $", duration: "60–180 min", img: "/images/services/highlights.jpg" },
  { title: "Corte + Styling", desc: "Corte con carácter y peinado", price: "desde $", duration: "60–90 min", img: "/images/services/cut-styling.jpg" },
  { title: "Color global", desc: "Cobertura pareja y brillo", price: "desde $", duration: "60–120 min", img: "/images/services/global-color.jpg" },
];

export default function Services() {
  return (
    <section id="servicios" className="py-12 md:py-16">
      <div className="container-p">
        <h2 className="font-bodoni text-3xl md:text-4xl text-brand-ink mb-6">Servicios destacados</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <article key={it.title} className="card group flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white transition-shadow hover:shadow-lg">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image src={it.img} alt={it.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold text-brand-ink">{it.title}</h3>
                <p className="text-black/60 mt-2 text-sm leading-relaxed mb-6">{it.desc}</p>

                <div className="mt-auto pt-4 border-t border-black/5">
                  <div className="flex items-center justify-between text-sm text-black/70 mb-4">
                    <span className="font-medium">{it.price}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {it.duration}
                    </span>
                  </div>
                  <a href="#reserva" className="block w-full rounded-lg bg-black text-white py-3 text-center text-sm font-medium transition-colors hover:bg-black/80">
                    Reservar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
