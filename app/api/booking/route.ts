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
        const { service, full_name, email, date, time } = body;

        // Validaciones básicas
        if (!full_name || !email || !date || !time) {
            return NextResponse.json(
                { error: "Faltan datos (nombre, email, fecha u hora)." },
                { status: 400 }
            );
        }

        // --- LÓGICA DE FECHA Y HORA ---
        // Combinamos la fecha (2025-12-04) con la hora (14:00)
        // Creamos un string ISO compatible: "2025-12-04T14:00:00"
        const startDateTimeString = `${date}T${time}:00`;
        const start = new Date(startDateTimeString);

        // Calculamos fin (1 hora después)
        const end = new Date(start.getTime() + 60 * 60 * 1000);

        const summary = `Servicio: ${service} - ${full_name}`;
        const description = `Cliente: ${full_name}\nEmail: ${email}\nServicio: ${service}\nAgendado web.`;

        // 1. AUTH GOOGLE
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process
                    .env
                    .GOOGLE_SERVICE_ACCOUNT_KEY
                    ?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/calendar"],
        });
        const calendar = google.calendar({ version: "v3", auth });
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        // 2. INSERTAR EVENTO
        await calendar.events.insert({
            calendarId,
            requestBody: {
                summary,
                description,
                start: {
                    dateTime: startDateTimeString, // "YYYY-MM-DDTHH:MM:SS"
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

        // Generar ICS para el correo al cliente
        const dateCompact = date.replace(/-/g, ""); // YYYYMMDD
        const [hour, minute] = time.split(":");
        const endHour = parseInt(hour, 10) + 1;

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

        // 3.a Correo al CLIENTE (con política de cancelación)
        await transporter.sendMail({
            from: '"Spazio Color y Estilo" <contacto@coloryestilo.pro>',
            to: email,
            // Aviso interno silencioso a Mabel por bcc
            bcc: "mabel.estilistaprofesional@gmail.com",
            subject: `✅ Reserva Confirmada: ${service}`,
            icalEvent: {
                filename: "invitacion.ics",
                method: "REQUEST",
                content: icsContent,
            },
            html: `
        <h1>¡Hola ${full_name}!</h1>
        <p>Tu cita para <strong>${service}</strong> en <strong>Spazio Color y Estilo</strong> está confirmada.</p>

        <p>
          📅 <strong>Fecha:</strong> ${date}<br/>
          ⏰ <strong>Hora:</strong> ${time}<br/>
          📍 <strong>Local:</strong> Spazio Color y Estilo
        </p>

        <p>Hemos adjuntado la invitación en formato calendario (.ics) para que la agregues fácilmente a tu agenda.</p>

        <hr/>

        <h2 style="font-size:16px;margin-bottom:4px;">Política de cancelación</h2>
        <p style="font-size:14px;line-height:1.6;">
          • Te pedimos por favor que si necesitas <strong>cancelar o reagendar</strong> tu hora, 
          nos avises con al menos <strong>24 horas de anticipación</strong>.<br/>
          • En caso de <strong>urgencia</strong>, intenta avisarnos al menos con <strong>6 horas</strong> de anticipación.<br/>
          • Puedes cancelar o reagendar respondiendo a este mismo correo, 
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

        // 3.b Correo interno a Mabel (aviso de nueva reserva)
        await transporter.sendMail({
            from: '"Spazio Color y Estilo" <contacto@coloryestilo.pro>',
            to: "mabel.estilistaprofesional@gmail.com",
            subject: `🗓 Nueva reserva: ${service} - ${full_name}`,
            html: `
        <h2>Nueva reserva desde la web</h2>
        <p>
          <strong>Cliente:</strong> ${full_name}<br/>
          <strong>Email:</strong> ${email}<br/>
          <strong>Servicio:</strong> ${service}<br/>
          <strong>Fecha:</strong> ${date}<br/>
          <strong>Hora:</strong> ${time}
        </p>

        <p style="font-size:13px;color:#555;">
          El evento ya fue agregado al calendario configurado en la integración.
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
