// app/api/booking/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

// Helper para fecha en formato ICS
const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { service, full_name, email, date, time, phone } = body;

        // Validaciones básicas (teléfono es opcional)
        if (!full_name || !email || !date || !time) {
            return NextResponse.json(
                { error: "Faltan datos (nombre, email, fecha u hora)." },
                { status: 400 }
            );
        }

        // --- LÓGICA DE FECHA Y HORA ---
        const startDateTimeString = `${date}T${time}:00`;
        const start = new Date(startDateTimeString);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hora

        const description =
            `Cliente: ${full_name}\n` +
            `Email: ${email}\n` +
            (phone ? `Teléfono: ${phone}\n` : "") +
            `Servicio: ${service}\n` +
            `Agendado web.`;

        // 1. AUTH GOOGLE
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(
                    /\\n/g,
                    "\n"
                ),
            },
            scopes: ["https://www.googleapis.com/auth/calendar"],
        });
        const calendar = google.calendar({ version: "v3", auth });
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        // 2. INSERTAR EVENTO EN CALENDARIO (solo para el salón)
        await calendar.events.insert({
            calendarId,
            requestBody: {
                summary: `Servicio: ${service} - ${full_name}`,
                description,
                start: {
                    dateTime: startDateTimeString,
                    timeZone: "America/Santiago",
                },
                end: {
                    dateTime: end.toISOString().split(".")[0],
                    timeZone: "America/Santiago",
                },
            },
        });

        // 3. ENVIAR CORREOS (Zoho)
        const zohoPass = process.env.ZOHO_PASSWORD;
        if (!zohoPass) throw new Error("Falta ZOHO_PASSWORD en .env");

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: "contacto@coloryestilo.pro",
                pass: zohoPass,
            },
        });

        // --- ICS para que Gmail/otros lo muestren como evento de calendario ---
        const dateCompact = date.replace(/-/g, ""); // YYYYMMDD
        const [hour, minute] = time.split(":");
        const endHourNum = parseInt(hour, 10) + 1;
        const endHour = endHourNum.toString().padStart(2, "0");

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Spazio Color y Estilo//Reserva//ES
BEGIN:VEVENT
UID:${Date.now()}@coloryestilo.pro
DTSTAMP:${formatICSDate(new Date())}
DTSTART;TZID=America/Santiago:${dateCompact}T${hour}${minute}00
DTEND;TZID=America/Santiago:${dateCompact}T${endHour}${minute}00
SUMMARY:💇‍♀️ Cita Spazio: ${service}
DESCRIPTION:Reserva confirmada para ${full_name}.
LOCATION:Spazio Color y Estilo
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`.replace(/\n/g, "\r\n");

        const phoneLine = phone
            ? `<p>📞 <strong>Teléfono de contacto:</strong> ${phone}</p>`
            : "";

        // 3.a Correo al CLIENTE
        await transporter.sendMail({
            from: '"Spazio Color y Estilo" <contacto@coloryestilo.pro>',
            to: email,
            // Aviso interno silencioso a Mabel
            bcc: "mabel.estilistaprofesional@gmail.com",
            subject: `✅ Reserva recibida: ${service}`,
            icalEvent: {
                filename: "cita-spazio.ics",
                method: "REQUEST",
                content: icsContent,
            },
            html: `
        <h1>¡Hola ${full_name}!</h1>
        <p>
          Tu cita para <strong>${service}</strong> en 
          <strong>Spazio Color y Estilo</strong> ha sido registrada.
        </p>

        <p>
          📅 <strong>Fecha solicitada:</strong> ${date}<br/>
          ⏰ <strong>Hora aproximada:</strong> ${time}<br/>
          📍 <strong>Local:</strong> Spazio Color y Estilo
        </p>
        ${phoneLine}

        <p style="font-size:14px;line-height:1.6;">
          En algunos servicios necesitamos conversar contigo para ajustar tiempos y detalles.
          Si es necesario, <strong>te contactaremos para confirmar la hora y la duración</strong>
          de tu cita, ya sea por correo o (si nos dejaste tu número) por WhatsApp o llamada.
        </p>

        <p style="font-size:13px;line-height:1.6;color:#555;">
          Adjuntamos una invitación de calendario (.ics) para que puedas agregar la cita fácilmente
          a tu agenda (Google Calendar, Apple Calendar, Outlook, etc.).
        </p>

        <hr/>

        <h2 style="font-size:16px;margin-bottom:4px;">Cambios y cancelaciones</h2>
        <p style="font-size:14px;line-height:1.6;">
          • Si necesitas <strong>cancelar o reagendar</strong> tu hora, por favor avísanos con al menos 
          <strong>24 horas de anticipación</strong>.<br/>
          • En caso de <strong>urgencia</strong>, intenta avisarnos al menos <strong>6 horas</strong> antes.<br/>
          • Puedes cancelar o reagendar respondiendo a este mismo correo 
          o escribiéndonos directamente a nuestro WhatsApp.
        </p>

        <p style="font-size:14px;line-height:1.6;">
          📧 <strong>Correo:</strong> contacto@coloryestilo.pro<br/>
          💬 <strong>WhatsApp:</strong> 
          <a href="https://wa.me/56987819145?text=Hola%2C%20necesito%20cancelar%20o%20reagendar%20mi%20hora%20del%20${date}%20a%20las%20${time}" target="_blank" rel="noopener noreferrer">
            +56 9 8781 9145
          </a>
        </p>

        <p style="margin-top:24px;font-size:14px;">
          ¡Gracias por elegirnos! 💛<br/>
          <strong>Spazio Color y Estilo</strong>
        </p>
      `,
        });

        // 3.b Correo interno a Mabel
        await transporter.sendMail({
            from: '"Spazio Color y Estilo" <contacto@coloryestilo.pro>',
            to: "mabel.estilistaprofesional@gmail.com",
            subject: `🗓 Nueva reserva web: ${service} - ${full_name}`,
            html: `
        <h2>Nueva reserva desde la web</h2>
        <p>
          <strong>Cliente:</strong> ${full_name}<br/>
          <strong>Email:</strong> ${email}<br/>
          <strong>Teléfono:</strong> ${phone || "No indicado"}<br/>
          <strong>Servicio:</strong> ${service}<br/>
          <strong>Fecha solicitada:</strong> ${date}<br/>
          <strong>Hora aproximada:</strong> ${time}
        </p>

        <p style="font-size:13px;color:#555;">
          El evento ya fue agregado al calendario del salón.
          Puedes contactar a la clienta por correo o WhatsApp si necesitas confirmar hora,
          tiempos o detalles del servicio.
        </p>
      `,
        });

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("Error API:", err);
        return NextResponse.json(
            { error: err.message || "Error interno" },
            { status: 500 }
        );
    }
}
