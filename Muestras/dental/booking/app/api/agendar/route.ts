import { NextRequest, NextResponse } from "next/server";
import { createAppointment } from "@/lib/google-calendar";
import { getTratamientoById } from "@/lib/doctors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { doctorId, fecha, hora, tratamientoId, paciente } = body;

    // Validaciones
    if (!doctorId || !fecha || !hora || !tratamientoId || !paciente) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 },
      );
    }

    if (
      !paciente.nombre ||
      !paciente.rut ||
      !paciente.telefono ||
      !paciente.email
    ) {
      return NextResponse.json(
        { error: "Nombre, RUT, teléfono y email son obligatorios" },
        { status: 400 },
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paciente.email)) {
      return NextResponse.json(
        { error: "Formato de email inválido" },
        { status: 400 },
      );
    }

    // Obtener nombre del tratamiento
    const tratamiento = getTratamientoById(tratamientoId);
    const tratamientoNombre = tratamiento?.nombre || tratamientoId;

    const result = await createAppointment({
      doctorId,
      fecha,
      hora,
      tratamientoNombre,
      paciente: {
        nombre: paciente.nombre.trim(),
        rut: paciente.rut.trim(),
        telefono: paciente.telefono.trim(),
        email: paciente.email.trim(),
        notas: paciente.notas || "",
      },
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Error al agendar la cita" },
        { status: 409 },
      );
    }

    return NextResponse.json({
      success: true,
      eventId: result.eventId,
      message: "Cita agendada exitosamente",
    });
  } catch (error: any) {
    console.error("Error in agendar API:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 },
    );
  }
}
