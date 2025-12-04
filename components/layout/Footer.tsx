import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="mt-16 border-t border-black/10 bg-brand-bg text-brand-ink">
      {/* Líneas finas de acento */}
      <div className="h-[2px] bg-betaturquesa"></div>
      <div className="h-[2px] bg-betadorado"></div>

      <div className="container-p py-10">
        {/* Marca + claim */}
        <div className="mb-8">
          <div className="mb-4 relative h-16 w-48">
            <Image
              src="/ColoryEstiloLogo.png"
              alt="Spazio Color y Estilo"
              fill
              className="object-contain object-left mix-blend-multiply"
            />
          </div>
          <p className="font-mont text-sm text-brand-ink/70">
            Color de autor y cortes precisos para señoras, jóvenes y caballeros.
          </p>
        </div>

        {/* Grid principal */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contacto */}
          <div>
            <h4 className="font-bodoni text-lg mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm font-mont">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-ink/60" aria-hidden />
                <a href="mailto:contacto@coloryestilo.pro" className="underline underline-offset-2">
                  contacto@coloryestilo.pro
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-ink/60" aria-hidden />
                <a href="tel:+56987819145" className="underline underline-offset-2">
                  +56 9 87819145
                </a>
              </li>
            </ul>
          </div>

          {/* Dirección y horarios */}
          <div>
            <h4 className="font-bodoni text-lg mb-3">Dónde estamos</h4>
            <address className="not-italic text-sm font-mont text-brand-ink/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-ink/60" aria-hidden />
                <span>
                  Avenida Vicuña Mackenna Oriente 6100,<br /> La Florida, Región Metropolitana, Chile.
                </span>
              </div>
            </address>
            <p className="mt-3 text-sm font-mont text-brand-ink/80 flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-ink/60" aria-hidden />
              Lun–Sáb: 10:00–20:00
            </p>
            <p className="mt-1 text-xs text-brand-ink/60">
              *Reserva recomendada. Atendemos con agenda.
            </p>
          </div>

          {/* Reservas / Social */}
          <div>
            <h4 className="font-bodoni text-lg mb-3">Reserva</h4>
            <div className="flex flex-wrap gap-2">
              <Link
                href="#reserva"
                className="inline-flex items-center rounded-full px-4 py-2 bg-betaturquesa text-white hover:bg-betaturquesa-600 transition-colors text-sm"
                aria-label="Reservar hora"
              >
                Reservar hora
              </Link>
              <a
                href="https://wa.me/+56987819145?text=Hola%20Spazio%20Color%20y%20Estilo%2C%20quiero%20reservar%20una%20hora."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full px-4 py-2 border border-betaturquesa text-betaturquesa hover:bg-betaturquesa/5 transition-colors text-sm"
                aria-label="Escríbenos por WhatsApp"
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-5">
              <h5 className="font-bodoni text-base mb-2">Síguenos</h5>
              <div className="flex items-center gap-3">
                <a aria-label="Instagram" href="#" className="p-2 rounded-full border border-black/10 hover:bg-black/5" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
                <a aria-label="Facebook" href="#" className="p-2 rounded-full border border-black/10 hover:bg-black/5" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
                <a aria-label="YouTube" href="#" className="p-2 rounded-full border border-black/10 hover:bg-black/5" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea legal y créditos (muy sutil) */}
        <div className="mt-10 pt-6 border-t border-black/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs font-mont text-brand-ink/60">
              © {new Date().getFullYear()} Spazio Color y Estilo — Todos los derechos reservados.
            </p>

            {/* Créditos casi invisibles, como hacen las agencias */}
            <p className="text-[11px] leading-none text-brand-ink/40 select-none">
              Creado y diseñado por{" "}
              <a href="https://dgrcodex.sambalab.pro" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                dgrcodex
              </a>{" "}
              ·{" "}
              <a href="https://github.com/dgrcodex" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                GitHub
              </a>{" "}
              — Publicado por{" "}
              <a href="https://sambalab.pro" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                SAMbalab Agency
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
