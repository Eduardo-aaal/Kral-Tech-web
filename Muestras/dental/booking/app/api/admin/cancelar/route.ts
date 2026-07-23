import { NextRequest, NextResponse } from "next/server";
import { cancelAppointment } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { doctorId, eventId, key } = body;

    if (key !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!doctorId || !eventId) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 },
      );
    }

    const result = await cancelAppointment(doctorId, eventId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Error al cancelar la cita" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cita cancelada exitosamente",
    });
  } catch (error: any) {
    console.error("Error in admin/cancelar API:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 },
    );
  }
}
