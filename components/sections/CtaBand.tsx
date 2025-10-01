export default function CtaBand() {
  return (
    <section className="py-8">
      <div className="container-p rounded-2xl border px-6 py-8 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <h3 className="font-bebas text-2xl text-brand-ink">Reserva hoy</h3>
          <p className="text-black/70">Atendemos con agenda. Confirmación por correo.</p>
        </div>
        <div className="flex gap-3">
          <a href="#reserva" className="px-5 py-3 rounded-full border text-sm hover:bg-black/[.03]">Reservar</a>
          <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-full border text-sm">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
