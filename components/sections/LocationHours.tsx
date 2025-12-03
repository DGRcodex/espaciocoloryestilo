export default function LocationHours() {
  return (
    <section id="ubicacion" className="py-12 md:py-16">
      <div className="container-p grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-3">Ubicación</h2>
          <p className="text-black/70">Avenida Vicuña Mackenna Oriente 6100, La Florida, Región Metropolitana, Chile.</p>
          <div className="mt-4 aspect-video rounded-xl bg-black/5 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.687664654321!2d-70.58987692386963!3d-33.50942447336647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d04a6a6616ad%3A0x6333668866750730!2sAv.%20Vicu%C3%B1a%20Mackenna%20Ote.%206100%2C%208240000%20La%20Florida%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1701634000000!5m2!1ses-419!2scl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div>
          <h2 className="font-bebas text-3xl md:text-4xl text-brand-ink mb-3">Horarios</h2>
          <ul className="text-black/70">
            <li>Lunes a Sábado: 10:30–20:00</li>
            <li>Domingo: cerrado</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
