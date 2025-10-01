const pics = Array.from({ length: 8 }).map((_, i) => `/gallery/${i + 1}.jpg`);

export default function Gallery() {
  return (
    <section id="galeria" className="py-12 md:py-16">
      <div className="container-p">
        <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-6">Trabajos recientes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {pics.map((src) => (
            <div key={src} className="aspect-square rounded-xl overflow-hidden bg-black/5">
              {/* Cuando tengamos imágenes reales, cambiamos por <Image fill .../> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
