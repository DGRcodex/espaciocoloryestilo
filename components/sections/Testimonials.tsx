const quotes = [
  ["“El color me duró impecable.”", "Camila R."],
  ["“Entendieron perfecto mi estilo.”", "Javiera M."],
  ["“Corte preciso y fácil de peinar.”", "Benjamín T."],
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-black/[.03]">
      <div className="container-p">
        <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-6">Lo que dicen</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map(([q, a]) => (
            <figure key={a} className="card p-5">
              <blockquote className="text-lg">{q}</blockquote>
              <figcaption className="mt-3 text-sm text-black/70">— {a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
