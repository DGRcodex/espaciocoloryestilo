import Image from "next/image";

const works = [
  { title: "Rubio Vainilla", img: "/images/gallery/rubiovainilla1.png" },
  { title: "Morena Iluminada", img: "/images/gallery/morenailuminada.png" },
  { title: "Corte Bob Italiano", img: "/images/gallery/bobitaliano.png" },
  { title: "Styling Ondas Glam", img: "/images/gallery/ondasglam.png" },
  { title: "Corte Mariposa", img: "/images/gallery/cortemariposa.png" },
  { title: "Cobrizo Intenso", img: "/images/gallery/cobrizointenso.png" },
  { title: "Liso Espejo", img: "/images/gallery/lisoespejo.png" },
  { title: "Pixie Moderno", img: "/images/gallery/pixiemoderno.png" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-12 md:py-16">
      <div className="container-p">
        <h2 className="font-bodoni text-3xl md:text-4xl text-brand-ink mb-6">Trabajos recientes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {works.map((work, i) => (
            <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-black/5">
              <Image src={work.img} alt={work.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium text-sm">{work.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
