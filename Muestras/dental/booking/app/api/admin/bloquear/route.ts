import { NextRequest, NextResponse } from "next/server";
import { blockTimeSlot } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { doctorId, fecha, horaInicio, horaFin, motivo, key } = body;

    if (key !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!doctorId || !fecha || !horaInicio || !horaFin || !motivo) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 },
      );
    }

    const result = await blockTimeSlot(
      doctorId,
      fecha,
      horaInicio,
      horaFin,
      motivo,
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Error al bloquear horario" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      eventId: result.eventId,
      message: "Horario bloqueado exitosamente",
    });
  } catch (error: any) {
    console.error("Error in admin/bloquear API:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 },
    );
  }
}
