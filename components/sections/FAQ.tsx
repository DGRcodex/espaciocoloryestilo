const faqs = [
  ["¿Debo ir con el pelo limpio?", "Idealmente sí, sin productos pesados para un mejor diagnóstico."],
  ["¿Con cuánta anticipación reservo?", "Recomendamos 48–72 horas. Si estás contra el tiempo, escríbenos por WhatsApp."],
  ["¿Qué métodos de pago aceptan?", "Efectivo, tarjetas y transferencia."],
];

export default function FAQ() {
  return (
    <section id="faq" className="py-12 md:py-16">
      <div className="container-p">
        <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-6">Preguntas frecuentes</h2>
        <ul className="space-y-3">
          {faqs.map(([q, a]) => (
            <li key={q} className="border rounded-xl p-4">
              <p className="font-semibold">{q}</p>
              <p className="text-black/70 mt-1">{a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
