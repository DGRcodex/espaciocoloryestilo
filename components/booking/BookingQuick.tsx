"use client";
import { useState } from "react";

type S = "idle" | "loading" | "ok" | "err";

export default function BookingQuick() {
  const [s, setS] = useState<S>("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setS("loading"); setMsg("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      // Si luego activamos Supabase, aquí va el fetch al /api/appointments
      await new Promise(r => setTimeout(r, 600)); // demo
      setS("ok"); (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setS("err"); setMsg(err.message || "Error");
    }
  }

  return (
    <form onSubmit={submit} className="card p-5 sm:p-6 w-full">
      <h3 className="text-2xl mb-1" style={{ fontFamily: "var(--font-bebas)" }}>Reserva rápida</h3>
      <p className="text-sm text-black/60 mb-4">Elige servicio y deja tu correo. Te contactamos para confirmar.</p>

      <div className="grid sm:grid-cols-2 gap-3">
        <input name="service" placeholder="Servicio (balayage, corte…)" className="w-full rounded-xl border border-black/10 px-3 py-2" />
        <input name="full_name" placeholder="Nombre" className="w-full rounded-xl border border-black/10 px-3 py-2" />
        <input type="date" name="date" className="w-full rounded-xl border border-black/10 px-3 py-2" />
        <input type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-black/10 px-3 py-2" />
        <button
          className="sm:col-span-2 rounded-xl bg-betaturquesa text-white py-3 font-semibold hover:bg-betaturquesa-600 transition-colors"
          disabled={s === "loading"}
        >
          {s === "loading" ? "Enviando…" : "Confirmar"}
        </button>
      </div>

      {s === "ok" && <p className="text-green-600 mt-3">¡Reserva enviada! Te escribiremos para coordinar.</p>}
      {s === "err" && <p className="text-red-600 mt-3">{msg}</p>}

      <a
        href="https://wa.me/56912345678?text=Hola%20Spazio%20Color%20y%20Estilo%2C%20quiero%20reservar."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-4 text-sm text-betaturquesa hover:underline"
      >
        ¿Prefieres WhatsApp?
      </a>
    </form>
  );
}
