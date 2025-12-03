// app/api/availability/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        if (!date) {
            return NextResponse.json({ error: "Fecha requerida" }, { status: 400 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
        });

        const calendar = google.calendar({ version: "v3", auth });
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        const timeMin = new Date(`${date}T00:00:00-04:00`).toISOString();
        const timeMax = new Date(`${date}T23:59:59-04:00`).toISOString();

        const response = await calendar.events.list({
            calendarId,
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = response.data.items || [];

        // CAMBIO IMPORTANTE AQUÍ: Ahora extraemos hora Y minutos
        const busyHours = events.map((event) => {
            const start = event.start?.dateTime || event.start?.date;
            if (!start) return null;

            const dateObj = new Date(start);
            const hour = dateObj.getHours();
            const minutes = dateObj.getMinutes();

            // Formateamos para que siempre tenga dos dígitos (ej: "9:00", "10:05", "10:30")
            // Nota: Si Google devuelve 10:0, lo convertimos a "10:00"
            const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

            return `${hour}:${minutesStr}`;
        }).filter(Boolean);

        return NextResponse.json({ busyHours });

    } catch (error: any) {
        console.error("Error disponibilidad:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}