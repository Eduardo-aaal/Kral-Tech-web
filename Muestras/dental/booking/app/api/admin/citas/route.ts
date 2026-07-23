import { NextRequest, NextResponse } from "next/server";
import { getAllAppointments } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get("fecha");
    const key = searchParams.get("key");

    // Validar clave de administración
    if (key !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!fecha) {
      const hoy = new Date().toISOString().split("T")[0];
      const citas = await getAllAppointments(hoy);
      return NextResponse.json({ fecha: hoy, citas });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fecha)) {
      return NextResponse.json(
        { error: "Formato de fecha inválido. Use YYYY-MM-DD" },
        { status: 400 },
      );
    }

    const citas = await getAllAppointments(fecha);
    return NextResponse.json({ fecha, citas });
  } catch (error: any) {
    console.error("Error in admin/citas API:", error);
    return NextResponse.json(
      { error: "Error al obtener citas" },
      { status: 500 },
    );
  }
}
