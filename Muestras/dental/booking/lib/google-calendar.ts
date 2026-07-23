import { google } from "googleapis";
import { getDoctorById, Doctor } from "./doctors";

// Tipos
export interface TimeSlot {
  hora: string; // HH:mm
  disponible: boolean;
}

// Obtener autenticación de Google
function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google Calendar credentials not configured. Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local",
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return auth;
}

// Obtener cliente de Calendar
function getCalendarClient() {
  const auth = getAuth();
  return google.calendar({ version: "v3", auth });
}

// Generar bloques de tiempo teóricos para un doctor en una fecha
export function generateTimeSlots(doctor: Doctor, dateStr: string): string[] {
  const date = new Date(dateStr + "T12:00:00-04:00");
  const diaSemana = date.getDay();
  const horario = doctor.horariosAtencion[diaSemana];

  if (!horario) return []; // No atiende este día

  const [horaInicio, minInicio] = horario.inicio.split(":").map(Number);
  const [horaFin, minFin] = horario.fin.split(":").map(Number);
  const duracion = doctor.duracionCitaMinutos;

  // Calcular colación
  let colacionInicioMin = -1;
  let colacionFinMin = -1;
  if (doctor.intervaloColacion) {
    const [ciH, ciM] = doctor.intervaloColacion.inicio.split(":").map(Number);
    const [cfH, cfM] = doctor.intervaloColacion.fin.split(":").map(Number);
    colacionInicioMin = ciH * 60 + ciM;
    colacionFinMin = cfH * 60 + cfM;
  }

  const inicioTotalMin = horaInicio * 60 + minInicio;
  const finTotalMin = horaFin * 60 + minFin;

  const slots: string[] = [];
  let currentMin = inicioTotalMin;

  while (currentMin + duracion <= finTotalMin) {
    // Saltar colación
    if (
      colacionInicioMin >= 0 &&
      currentMin >= colacionInicioMin &&
      currentMin < colacionFinMin
    ) {
      currentMin = colacionFinMin;
      continue;
    }

    const h = Math.floor(currentMin / 60);
    const m = currentMin % 60;
    slots.push(
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
    );
    currentMin += duracion;
  }

  return slots;
}

// Consultar ocupados en Google Calendar
export async function getBusySlots(
  doctorId: string,
  dateStr: string,
): Promise<string[]> {
  const doctor = getDoctorById(doctorId);
  if (!doctor) throw new Error("Doctor no encontrado");

  const calendar = getCalendarClient();
  const timeMin = new Date(`${dateStr}T00:00:00-04:00`);
  const timeMax = new Date(`${dateStr}T23:59:59-04:00`);

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: doctor.calendarId }],
      },
    });

    const busyPeriods =
      response.data.calendars?.[doctor.calendarId]?.busy ?? [];

    // Convertir ocupados a bloques de tiempo en minutos
    const busySlots: string[] = [];
    for (const period of busyPeriods) {
      if (!period.start || !period.end) continue;

      const startDate = new Date(period.start);
      const endDate = new Date(period.end);

      // Redondear al slot más cercano
      let startMin = startDate.getHours() * 60 + startDate.getMinutes();
      let endMin = endDate.getHours() * 60 + endDate.getMinutes();

      // Marcar slots ocupados en intervalos de la duración de la cita
      const duration = doctor.duracionCitaMinutos;
      let current = startMin;
      while (current < endMin) {
        const h = Math.floor(current / 60);
        const m = current % 60;
        busySlots.push(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
        );
        current += duration;
      }
    }

    return busySlots;
  } catch (error: any) {
    console.error("Error fetching free/busy:", error.message);
    // Si hay error con Google Calendar, devolvemos todos los slots como disponibles
    return [];
  }
}

// Obtener slots disponibles
export async function getAvailableSlots(
  doctorId: string,
  dateStr: string,
): Promise<string[]> {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return [];

  const theoreticalSlots = generateTimeSlots(doctor, dateStr);
  const busySlots = await getBusySlots(doctorId, dateStr);

  return theoreticalSlots.filter((slot) => !busySlots.includes(slot));
}

// Crear evento en Google Calendar
export async function createAppointment(data: {
  doctorId: string;
  fecha: string;
  hora: string;
  paciente: {
    nombre: string;
    rut: string;
    telefono: string;
    email: string;
    notas: string;
  };
  tratamientoNombre: string;
}): Promise<{ success: boolean; eventId?: string; error?: string }> {
  const doctor = getDoctorById(data.doctorId);
  if (!doctor) return { success: false, error: "Doctor no encontrado" };

  // Validar disponibilidad nuevamente
  const availableSlots = await getAvailableSlots(data.doctorId, data.fecha);
  if (!availableSlots.includes(data.hora)) {
    return {
      success: false,
      error:
        "El horario seleccionado ya no está disponible. Por favor, selecciona otro horario.",
    };
  }

  const calendar = getCalendarClient();

  const [hora, minuto] = data.hora.split(":").map(Number);
  const startDate = new Date(`${data.fecha}T${data.hora}:00-04:00`);
  const endDate = new Date(
    startDate.getTime() + doctor.duracionCitaMinutos * 60000,
  );

  const descripcion = [
    `--- DATOS DEL PACIENTE ---`,
    `Nombre: ${data.paciente.nombre}`,
    `RUT: ${data.paciente.rut}`,
    `Teléfono: ${data.paciente.telefono}`,
    `Email: ${data.paciente.email}`,
    `Tratamiento: ${data.tratamientoNombre}`,
    ``,
    `--- NOTAS ---`,
    data.paciente.notas || "Sin notas adicionales",
    ``,
    `--- RESERVADO DESDE SISTEMA WEB ---`,
    `Agendado vía: Clínica Dental Care - Booking Online`,
    `Fecha de reserva: ${new Date().toLocaleString("es-CL")}`,
  ].join("\n");

  try {
    const event = await calendar.events.insert({
      calendarId: doctor.calendarId,
      requestBody: {
        summary: `${data.paciente.nombre} - ${data.tratamientoNombre}`,
        description: descripcion,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "America/Santiago",
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "America/Santiago",
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 1440 }, // 1 día antes
            { method: "popup", minutes: 60 }, // 1 hora antes
          ],
        },
        colorId: "7", // Turquesa
      },
    });

    return {
      success: true,
      eventId: event.data.id || undefined,
    };
  } catch (error: any) {
    console.error("Error creating event:", error.message);
    return {
      success: false,
      error: `Error al crear la cita: ${error.message}`,
    };
  }
}

// Obtener citas de un doctor en una fecha
export async function getDoctorAppointments(doctorId: string, dateStr: string) {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return [];

  const calendar = getCalendarClient();

  const timeMin = new Date(`${dateStr}T00:00:00-04:00`);
  const timeMax = new Date(`${dateStr}T23:59:59-04:00`);

  try {
    const response = await calendar.events.list({
      calendarId: doctor.calendarId,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return (response.data.items ?? []).map((event) => {
      const start = event.start?.dateTime
        ? new Date(event.start.dateTime)
        : null;
      const end = event.end?.dateTime ? new Date(event.end.dateTime) : null;

      // Parsear descripción para extraer datos del paciente
      const descripcion = event.description || "";
      const extractData = (label: string): string => {
        const match = descripcion.match(
          new RegExp(`${label}:\\s*(.+?)\\s*$`, "m"),
        );
        return match ? match[1].trim() : "";
      };

      return {
        eventId: event.id,
        doctorId: doctorId,
        doctorNombre: doctor.nombre,
        titulo: event.summary || "Sin título",
        inicio: start
          ? `${start.getHours().toString().padStart(2, "0")}:${start.getMinutes().toString().padStart(2, "0")}`
          : "",
        fin: end
          ? `${end.getHours().toString().padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")}`
          : "",
        paciente: {
          nombre: extractData("Nombre"),
          rut: extractData("RUT"),
          telefono: extractData("Teléfono"),
          email: extractData("Email"),
        },
        tratamiento: extractData("Tratamiento"),
        notas: descripcion.includes("--- NOTAS ---")
          ? descripcion.split("--- NOTAS ---")[1]?.split("---")[0]?.trim() || ""
          : "",
      };
    });
  } catch (error: any) {
    console.error("Error listing events:", error.message);
    return [];
  }
}

// Obtener todas las citas del día
export async function getAllAppointments(dateStr: string) {
  const { DOCTORS } = await import("./doctors");
  const allAppointments = [];

  for (const doctor of DOCTORS) {
    const appointments = await getDoctorAppointments(doctor.id, dateStr);
    allAppointments.push(...appointments);
  }

  // Ordenar por hora
  allAppointments.sort((a, b) =>
    (a.inicio || "").localeCompare(b.inicio || ""),
  );

  return allAppointments;
}

// Cancelar cita (eliminar evento)
export async function cancelAppointment(
  doctorId: string,
  eventId: string,
): Promise<{ success: boolean; error?: string }> {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return { success: false, error: "Doctor no encontrado" };

  const calendar = getCalendarClient();

  try {
    await calendar.events.delete({
      calendarId: doctor.calendarId,
      eventId: eventId,
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting event:", error.message);
    return { success: false, error: `Error al cancelar: ${error.message}` };
  }
}

// Reagendar cita (mover evento)
export async function rescheduleAppointment(
  doctorId: string,
  eventId: string,
  nuevaFecha: string,
  nuevaHora: string,
): Promise<{ success: boolean; error?: string }> {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return { success: false, error: "Doctor no encontrado" };

  const calendar = getCalendarClient();

  const startDate = new Date(`${nuevaFecha}T${nuevaHora}:00-04:00`);
  const endDate = new Date(
    startDate.getTime() + doctor.duracionCitaMinutos * 60000,
  );

  try {
    await calendar.events.patch({
      calendarId: doctor.calendarId,
      eventId: eventId,
      requestBody: {
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "America/Santiago",
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "America/Santiago",
        },
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error updating event:", error.message);
    return {
      success: false,
      error: `Error al reagendar: ${error.message}`,
    };
  }
}

// Bloquear horario manualmente
export async function blockTimeSlot(
  doctorId: string,
  fecha: string,
  horaInicio: string,
  horaFin: string,
  motivo: string,
): Promise<{ success: boolean; eventId?: string; error?: string }> {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return { success: false, error: "Doctor no encontrado" };

  const calendar = getCalendarClient();

  const startDate = new Date(`${fecha}T${horaInicio}:00-04:00`);
  const endDate = new Date(`${fecha}T${horaFin}:00-04:00`);

  try {
    const event = await calendar.events.insert({
      calendarId: doctor.calendarId,
      requestBody: {
        summary: `🔒 BLOQUEADO: ${motivo}`,
        description: `Bloqueado manualmente desde el panel de administración.\nMotivo: ${motivo}\nFecha: ${fecha}`,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "America/Santiago",
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "America/Santiago",
        },
        colorId: "5", // Amarillo
      },
    });

    return { success: true, eventId: event.data.id || undefined };
  } catch (error: any) {
    console.error("Error blocking time:", error.message);
    return {
      success: false,
      error: `Error al bloquear horario: ${error.message}`,
    };
  }
}
