"use client";
import { useState, useEffect } from "react";

// Definimos los posibles estados del formulario
type S = "idle" | "loading" | "ok" | "err";

export default function BookingQuick() {
  const [s, setS] = useState<S>("idle");
  const [msg, setMsg] = useState("");

  // Estados para la lógica de disponibilidad
  const [selectedDate, setSelectedDate] = useState("");
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // Rango de horas: 9:00 AM a 9:00 PM (21:00)
  const timeSlots = Array.from({ length: 13 }, (_, i) => `${i + 9}:00`);

  // Hook: Consulta la API cuando cambia la fecha seleccionada
  useEffect(() => {
    if (!selectedDate) return;

    const checkAvailability = async () => {
      setLoadingAvailability(true);
      setBusySlots([]); // Limpiamos estado previo
      try {
        // Consulta a nuestra API ruta api/availability
        const res = await fetch(`/api/availability?date=${selectedDate}`);
        const data = await res.json();
        if (data.busyHours) {
          setBusySlots(data.busyHours);
        }
      } catch (error) {
        console.error("Error consultando disponibilidad", error);
      } finally {
        setLoadingAvailability(false);
      }
    };

    checkAvailability();
  }, [selectedDate]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setS("loading");
    setMsg("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "No se pudo agendar en este momento.");
      }

      // Éxito
      setS("ok");
      (e.target as HTMLFormElement).reset(); // Limpiar formulario
      setBusySlots([]);
      setSelectedDate("");

      // Opcional: resetear el estado a 'idle' después de unos segundos para permitir otra reserva
      // setTimeout(() => setS("idle"), 5000);

    } catch (error: any) {
      setS("err");
      setMsg(error.message || "Error al procesar la solicitud.");
    }
  }

  // --- Estilos base (basados en tu tailwind.config.ts) ---
  const inputClass = "w-full rounded-xl border border-black/10 px-4 py-3 bg-surface-muted focus:bg-surface-base focus:ring-1 focus:ring-betaturquesa outline-none transition-all font-mont text-sm text-brand-fg placeholder:text-black/40";
  const labelClass = "text-xs font-bold text-black/50 mb-1 ml-1 uppercase tracking-wide font-mont";

  return (
    <form onSubmit={submit} className="w-full bg-surface-base p-6 sm:p-8 rounded-2xl shadow-soft border border-black/5 relative overflow-hidden">

      {/* Título */}
      <h3 className="text-3xl mb-2 font-bebas tracking-wide text-brand-fg">
        RESERVA RÁPIDA
      </h3>
      <p className="text-sm text-black/60 mb-7 font-mont leading-relaxed">
        Selecciona tu servicio y horario. Recibirás confirmación inmediata vía correo.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Input: Servicio */}
        <div className="flex flex-col">
          <label className={labelClass}>Servicio</label>
          <input required name="service" placeholder="Ej: Balayage, Corte..." className={inputClass} />
        </div>

        {/* Input: Nombre */}
        <div className="flex flex-col">
          <label className={labelClass}>Tu Nombre</label>
          <input required name="full_name" placeholder="Nombre y Apellido" className={inputClass} />
        </div>

        {/* Input: Fecha */}
        <div className="flex flex-col">
          <label className={labelClass}>Fecha</label>
          <input
            required
            type="date"
            name="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Input: Hora (Select Inteligente) */}
        <div className="flex flex-col">
          <label className={labelClass}>
            Hora {loadingAvailability && <span className="text-betaturquesa ml-2 animate-pulse lowercase font-medium">(verificando...)</span>}
          </label>
          <select
            required
            name="time"
            disabled={!selectedDate || loadingAvailability}
            className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230F766E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="">
              {!selectedDate ? "← Primero elige fecha" : "Seleccionar horario..."}
            </option>

            {timeSlots.map((t) => {
              const isBusy = busySlots.includes(t);
              return (
                <option key={t} value={t} disabled={isBusy} className={isBusy ? "bg-gray-100 text-gray-400" : ""}>
                  {t} {isBusy ? "(Ocupado)" : ""}
                </option>
              );
            })}
          </select>
        </div>

        {/* Input: Email */}
        <div className="flex flex-col sm:col-span-2">
          <label className={labelClass}>Correo Electrónico</label>
          <input required type="email" name="email" placeholder="ejemplo@correo.com" className={inputClass} />
        </div>
      </div>

      {/* Botón Principal */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={s === "loading" || s === "ok"}
          className={`
            w-full flex items-center justify-center px-6 py-4 rounded-full font-bold text-white text-sm tracking-widest font-mont transition-all shadow-soft transform active:scale-[0.99]
            ${s === "loading" ? "bg-gray-300 cursor-not-allowed" : "bg-betaturquesa hover:bg-betaturquesa-600 hover:shadow-hover"}
            ${s === "ok" ? "bg-success-500 cursor-default" : ""}
          `}
        >
          {s === "loading" ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              PROCESANDO...
            </span>
          ) : s === "ok" ? (
            "¡AGENDADO!"
          ) : (
            "CONFIRMAR RESERVA"
          )}
        </button>
      </div>

      {/* =========================================
          MENSAJES DE ESTADO ESTILIZADOS (NUEVO)
      ========================================= */}

      {/* Mensaje de ÉXITO Estilizado */}
      {s === "ok" && (
        <div className="mt-6 p-5 bg-success-50/50 border border-success-100 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-bottom-1 duration-300">
          {/* Icono SVG estilizado dentro de un círculo blanco */}
          <div className="flex-shrink-0 h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-success-100 text-success-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bebas tracking-wide text-success-700 mb-1">
              ¡RESERVA CONFIRMADA!
            </h4>
            <p className="text-sm font-mont text-success-800/80 leading-snug">
              Revisa tu correo (bandeja de entrada o spam) para ver los detalles y la invitación a tu calendario.
            </p>
          </div>
        </div>
      )}

      {/* Mensaje de ERROR Estilizado */}
      {s === "err" && (
        <div className="mt-6 p-5 bg-danger-50/50 border border-danger-100 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-bottom-1 duration-300">
          {/* Icono SVG estilizado de 'X' */}
          <div className="flex-shrink-0 h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-danger-100 text-danger-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bebas tracking-wide text-danger-700 mb-1">
              HUBO UN PROBLEMA
            </h4>
            <p className="text-sm font-mont text-danger-800/80 leading-snug">
              {msg}
            </p>
          </div>
        </div>
      )}
      {/* ========================================= */}


      {/* Link de Ayuda */}
      <div className="mt-6 text-center border-t border-black/5 pt-5">
        <a
          href="https://wa.me/56987819145?text=Hola%20Mabel%2C%20tengo%20dudas%20para%20agendar%20en%20la%20web."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-black/40 hover:text-betaturquesa transition-colors font-mont uppercase tracking-wider"
        >
          <svg className="w-4 h-4 opacity-60" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
          ¿Dudas? Escríbenos al WhatsApp
        </a>
      </div>
    </form>
  );
}