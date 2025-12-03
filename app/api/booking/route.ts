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

        // Ajuste manual de zona horaria si el servidor está en UTC
        // (Esto asume que el input date/time es la hora local que quiere el usuario)
        // Para simplificar, Google Calendar acepta el string y le decimos que es 'America/Santiago'

        // Calculamos fin (1 hora después)
        // Truco: clonamos la fecha para no modificar 'start'
        const end = new Date(start.getTime() + 60 * 60 * 1000);

        const summary = `Servicio: ${service} - ${full_name}`;
        const description = `Cliente: ${full_name}\nEmail: ${email}\nServicio: ${service}\nAgendado web.`;

        // 1. AUTH GOOGLE
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/calendar"],
        });
        const calendar = google.calendar({ version: "v3", auth });
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        // 2. INSERTAR EVENTO (Sin Attendees para evitar error 403)
        await calendar.events.insert({
            calendarId,
            requestBody: {
                summary,
                description,
                start: {
                    dateTime: startDateTimeString, // Enviamos "YYYY-MM-DDTHH:MM:SS"
                    timeZone: "America/Santiago"   // Forzamos zona horaria de Chile
                },
                end: {
                    dateTime: end.toISOString().split('.')[0], // Formato ISO simple
                    timeZone: "America/Santiago"
                },
            },
        });

        // 3. ENVIAR CORREO (Zoho)
        const zohoPass = process.env.ZOHO_PASSWORD;
        if (!zohoPass) throw new Error("Falta ZOHO_PASSWORD en .env"); // Aquí fallaba antes

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: "contacto@coloryestilo.pro",
                pass: zohoPass,
            },
        });

        // Generar ICS para el correo
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Spazio Color y Estilo//Reserva//ES
BEGIN:VEVENT
UID:${Date.now()}@coloryestilo.pro
DTSTAMP:${formatICSDate(new Date())}
DTSTART;TZID=America/Santiago:${date.replace(/-/g, "")}T${time.replace(":", "")}00
DTEND;TZID=America/Santiago:${date.replace(/-/g, "")}T${parseInt(time.split(":")[0]) + 1}${time.split(":")[1]}00
SUMMARY:💇‍♀️ Cita Spazio: ${service}
DESCRIPTION:Reserva confirmada para ${full_name}.
LOCATION:Spazio Color y Estilo
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`.replace(/\n/g, "\r\n");

        await transporter.sendMail({
            from: '"Spazio Color y Estilo" <contacto@coloryestilo.pro>',
            to: email,
            bcc: "mabelrojasallende@coloryestilo.pro",
            subject: `✅ Reserva Confirmada: ${service}`,
            icalEvent: {
                filename: 'invitacion.ics',
                method: 'REQUEST',
                content: icsContent
            },
            html: `
                <h1>¡Hola ${full_name}!</h1>
                <p>Tu cita para <strong>${service}</strong> está confirmada.</p>
                <p>📅 Fecha: ${date}</p>
                <p>⏰ Hora: ${time}</p>
                <p>Agrega el adjunto a tu calendario.</p>
            `,
        });

        return NextResponse.json({ ok: true });

    } catch (err: any) {
        console.error("Error API:", err);
        return NextResponse.json({ error: err.message || "Error interno" }, { status: 500 });
    }
}