import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";
import { getDoctorById } from "@/lib/doctors";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const fecha = searchParams.get("fecha");

    if (!doctorId || !fecha) {
      return NextResponse.json(
        { error: "Se requieren los parámetros doctorId y fecha" },
        { status: 400 },
      );
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fecha)) {
      return NextResponse.json(
        { error: "Formato de fecha inválido. Use YYYY-MM-DD" },
        { status: 400 },
      );
    }

    const doctor = getDoctorById(doctorId);
    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor no encontrado" },
        { status: 404 },
      );
    }

    const availableSlots = await getAvailableSlots(doctorId, fecha);

    return NextResponse.json({
      doctorId,
      doctorNombre: doctor.nombre,
      fecha,
      duracionCitaMinutos: doctor.duracionCitaMinutos,
      slots: availableSlots,
    });
  } catch (error: any) {
    console.error("Error in disponibilidad API:", error);
    return NextResponse.json(
      { error: "Error al consultar disponibilidad" },
      { status: 500 },
    );
  }
}
