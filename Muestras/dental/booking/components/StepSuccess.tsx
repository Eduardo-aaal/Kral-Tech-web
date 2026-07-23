"use client";

import { DOCTORS, TRATAMIENTOS } from "@/lib/doctors";

interface StepSuccessProps {
  selectedDoctor: string;
  selectedTratamiento: string;
  selectedDate: string;
  selectedTime: string;
  formData: {
    nombre: string;
    email: string;
  };
}

export default function StepSuccess({
  selectedDoctor,
  selectedTratamiento,
  selectedDate,
  selectedTime,
  formData,
}: StepSuccessProps) {
  const doctor = DOCTORS.find((d) => d.id === selectedDoctor);
  const tratamiento = TRATAMIENTOS.find((t) => t.id === selectedTratamiento);

  const fechaFormateada = new Date(selectedDate).toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="card-dental p-8">
        {/* Icono de éxito */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Cita agendada con éxito!
        </h2>
        <p className="text-gray-500 mb-6">
          Hemos enviado un resumen a tu correo <strong>{formData.email}</strong>
        </p>

        {/* Resumen */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-5 text-left mb-6">
          <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-4">
            Detalles de tu cita
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-lg">🦷</span>
              <div>
                <p className="text-xs text-gray-500">Especialista</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {doctor?.nombre}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">💊</span>
              <div>
                <p className="text-xs text-gray-500">Tratamiento</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {tratamiento?.nombre}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">📅</span>
              <div>
                <p className="text-xs text-gray-500">Fecha</p>
                <p className="font-semibold text-gray-800 text-sm capitalize">
                  {fechaFormateada}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">⏰</span>
              <div>
                <p className="text-xs text-gray-500">Hora</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {selectedTime} hrs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">📍</span>
              <div>
                <p className="text-xs text-gray-500">Dirección</p>
                <p className="font-semibold text-gray-800 text-sm">
                  Av. Providencia 1234, Santiago
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recordatorio */}
        <div className="bg-amber-50 rounded-xl p-4 text-left mb-6">
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">
                Recuerda
              </p>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• Llega 15 minutos antes de tu cita.</li>
                <li>• Trae tu cédula de identidad.</li>
                <li>
                  • Si necesitas cancelar, háznoslo saber con 24 hrs de
                  anticipación.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <a
            href={`tel:+56912345678`}
            className="btn-dental-primary w-full inline-flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            +56 9 1234 5678
          </a>
          <a
            href="/"
            className="btn-dental-outline w-full inline-flex items-center justify-center gap-2"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
