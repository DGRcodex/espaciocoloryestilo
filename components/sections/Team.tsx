type Stylist = { name: string; role: string; bio: string; img?: string };
const team: Stylist[] = [
  { name: "Ari", role: "Colorista • Balayage", bio: "Color de alto impacto con foco en salud capilar." },
  { name: "Luca", role: "Cortes de precisión", bio: "Geometría y textura para resultados que duran." },
  { name: "Sofi", role: "Blonding • Highlights", bio: "Rubios limpios, técnica meticulosa." },
];

export default function Team() {
  return (
    <section id="equipo" className="py-12 md:py-16">
      <div className="container-p">
        <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-6">Nuestro equipo</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((p) => (
            <article key={p.name} className="card p-5">
              <div className="aspect-[4/3] rounded-xl bg-black/5" />
              <h3 className="mt-4 text-xl font-semibold">{p.name}</h3>
              <p className="text-sm text-black/70">{p.role}</p>
              <p className="text-black/70 mt-2">{p.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
