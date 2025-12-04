"use client";
import { useState, useEffect } from "react";

type S = "idle" | "loading" | "ok" | "err";

export default function BookingQuick() {
  const [s, setS] = useState<S>("idle");
  const [msg, setMsg] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // --- LÓGICA DE HORARIO NUEVA ---
  // Generamos horas de 10:30 a 19:00 con saltos de 30 mins
  const timeSlots: string[] = [];
  // Empezamos a las 10 y terminamos a las 19
  for (let h = 10; h <= 19; h++) {
    const minutes = ["00", "30"];

    minutes.forEach((m) => {
      // Regla 1: Si es las 10, solo queremos 10:30 (saltamos 10:00)
      if (h === 10 && m === "00") return;

      // Regla 2: Si es las 19, solo permitimos 19:00
      if (h === 19 && m === "30") return;

      timeSlots.push(`${h}:${m}`);
    });
  }
  // -------------------------------

  useEffect(() => {
    if (!selectedDate) return;
    const checkAvailability = async () => {
      setLoadingAvailability(true);
      setBusySlots([]);
      try {
        const res = await fetch(`/api/availability?date=${selectedDate}`);
        const data = await res.json();
        if (data.busyHours) setBusySlots(data.busyHours);
      } catch (error) {
        console.error(error);
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
        throw new Error(json.error || "No se pudo agendar.");
      }

      setS("ok");
      (e.target as HTMLFormElement).reset();
      setBusySlots([]);
      setSelectedDate("");

      // Reset automático a los 5 segundos
      setTimeout(() => {
        setS("idle");
        setMsg("");
      }, 5000);
    } catch (error: any) {
      setS("err");
      setMsg(error.message || "Error al procesar.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-black/10 px-4 py-3 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-[#0F766E] outline-none transition-all font-mont text-sm text-gray-800 placeholder:text-gray-400";
  const labelClass =
    "text-xs font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wide font-mont";

  return (
    <form
      onSubmit={submit}
      className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 relative transition-all duration-500"
    >
      <h3 className="text-3xl mb-2 font-bebas tracking-wide text-gray-900">
        RESERVA RÁPIDA
      </h3>
      <p className="text-sm text-gray-500 mb-7 font-mont leading-relaxed">
        Selecciona tu servicio y horario. Recibirás confirmación inmediata vía
        correo.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className={labelClass}>Servicio</label>
          <input
            required
            name="service"
            placeholder="Ej: Balayage, Corte..."
            className={inputClass}
          />
        </div>

        <div className="flex flex-col">
          <label className={labelClass}>Tu Nombre</label>
          <input
            required
            name="full_name"
            placeholder="Nombre y Apellido"
            className={inputClass}
          />
        </div>

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

        <div className="flex flex-col">
          <label className={labelClass}>
            Hora{" "}
            {loadingAvailability && (
              <span className="text-[#0F766E] ml-2 animate-pulse lowercase font-medium">
                (verificando...)
              </span>
            )}
          </label>
          <select
            required
            name="time"
            disabled={!selectedDate || loadingAvailability}
            className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230F766E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="">
              {!selectedDate
                ? "← Primero elige fecha"
                : "Seleccionar horario..."}
            </option>
            {timeSlots.map((t) => {
              const isBusy = busySlots.includes(t);
              return (
                <option
                  key={t}
                  value={t}
                  disabled={isBusy}
                  className={isBusy ? "bg-gray-100 text-gray-400" : ""}
                >
                  {t} {isBusy ? "(Ocupado)" : ""}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className={labelClass}>Correo Electrónico</label>
          <input
            required
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[11px] text-gray-400 font-mont leading-relaxed">
          Te pedimos que, si necesitas cancelar o reagendar, nos avises con al
          menos <span className="font-semibold">24 horas</span> de
          anticipación. En caso de urgencia, al menos{" "}
          <span className="font-semibold">6 horas</span> antes, escribiendo a
          nuestro WhatsApp o respondiendo el correo de confirmación.
        </p>
      </div>

      <div className="mt-8 pt-2">
        <button
          type="submit"
          disabled={s === "loading" || s === "ok"}
          className={`
            w-full flex items-center justify-center px-6 py-4 rounded-full font-bold text-white text-sm tracking-widest font-mont transition-all shadow-md transform duration-300
            ${s === "loading" ? "bg-gray-400 cursor-not-allowed" : ""}
            ${
              s === "idle" || s === "err"
                ? "bg-[#0F766E] hover:bg-[#115E59] hover:shadow-lg active:scale-[0.98]"
                : ""
            }
            ${
              s === "ok"
                ? "bg-[#16a34a] cursor-default ring-4 ring-green-100"
                : ""
            }
          `}
        >
          {s === "loading" ? (
            <span className="flex items-center gap-3">AGENDANDO...</span>
          ) : s === "ok" ? (
            <span className="flex items-center gap-2 animate-in fade-in zoom-in">
              ¡AGENDADO!
            </span>
          ) : (
            "CONFIRMAR RESERVA"
          )}
        </button>
      </div>

      {/* MENSAJES DE ESTADO */}
      {s === "ok" && (
        <div className="mt-6 p-5 bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#166534] shadow-sm border border-[#DCFCE7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-bebas tracking-wide text-[#14532D] mb-1">
              ¡LISTO, REVISA TU CORREO!
            </h4>
            <p className="text-sm font-mont text-[#166534]/80 leading-relaxed">
              Te enviamos la confirmación e invitación a tu calendario.
            </p>
            <p className="mt-2 text-xs font-mont text-[#166534]/80 leading-relaxed">
              Si necesitas cancelar o reagendar, responde el correo de
              confirmación o escríbenos por WhatsApp con al menos{" "}
              <span className="font-semibold">24 horas</span> de anticipación.
              En caso de urgencia, intenta avisar al menos{" "}
              <span className="font-semibold">6 horas</span> antes.
            </p>
          </div>
        </div>
      )}

      {s === "err" && (
        <div className="mt-6 p-5 bg-[#FEF2F2] border border-[#FECACA] rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#991B1B] shadow-sm border border-[#FECACA]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-bebas tracking-wide text-[#7F1D1D] mb-1">
              ALGO SALIÓ MAL
            </h4>
            <p className="text-sm font-mont text-[#991B1B]/80 leading-relaxed">
              {msg}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 text-center border-t border-gray-100 pt-5">
        <a
          href="https://wa.me/56987819145"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#0F766E] transition-colors font-mont uppercase tracking-wider"
        >
          ¿Dudas? Escríbenos al WhatsApp
        </a>
        <p className="mt-2 text-[11px] text-gray-400 font-mont">
          Para cancelar o reagendar tu hora, por favor avísanos con 24 horas de
          anticipación (6 horas en caso de urgencia).
        </p>
      </div>
    </form>
  );
}
