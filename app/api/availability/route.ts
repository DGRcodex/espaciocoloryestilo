// app/api/availability/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic"; // Para que no cachee resultados viejos

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date"); // Formato YYYY-MM-DD

        if (!date) {
            return NextResponse.json({ error: "Fecha requerida" }, { status: 400 });
        }

        // Auth (copiamos tu config de siempre)
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/calendar.readonly"], // Solo lectura
        });

        const calendar = google.calendar({ version: "v3", auth });
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        // Definir inicio y fin del día en Chile
        // Agregamos la hora para asegurar el rango completo del día seleccionado
        const timeMin = new Date(`${date}T00:00:00-04:00`).toISOString();
        const timeMax = new Date(`${date}T23:59:59-04:00`).toISOString();

        // Preguntamos a Google por los eventos de ese día
        const response = await calendar.events.list({
            calendarId,
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = response.data.items || [];

        // Extraemos solo las horas de inicio ocupadas (Ej: "14:00")
        const busyHours = events.map((event) => {
            const start = event.start?.dateTime || event.start?.date;
            if (!start) return null;
            // Extraemos la hora del string ISO (2025-12-04T14:00:00...)
            const dateObj = new Date(start);
            // Ajustamos a hora local
            return `${dateObj.getHours()}:00`;
        }).filter(Boolean);

        return NextResponse.json({ busyHours });

    } catch (error: any) {
        console.error("Error fetching availability:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}