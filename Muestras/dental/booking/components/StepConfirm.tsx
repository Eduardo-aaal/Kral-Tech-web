"use client";

import { useState } from "react";
import { DOCTORS, TRATAMIENTOS } from "@/lib/doctors";

interface StepConfirmProps {
  selectedDoctor: string;
  selectedTratamiento: string;
  selectedDate: string;
  selectedTime: string;
  formData: {
    nombre: string;
    rut: string;
    telefono: string;
    email: string;
    notas: string;
  };
  onBack: () => void;
  onConfirm: () => Promise<void>;
}

export default function StepConfirm({
  selectedDoctor,
  selectedTratamiento,
  selectedDate,
  selectedTime,
  formData,
  onBack,
  onConfirm,
}: StepConfirmProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doctor = DOCTORS.find((d) => d.id === selectedDoctor);
  const tratamiento = TRATAMIENTOS.find((t) => t.id === selectedTratamiento);

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await onConfirm();
    } catch (err: any) {
      setError(err.message || "Error al confirmar la cita");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor || !tratamiento) return null;

  const fechaFormateada = new Date(selectedDate).toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="btn-dental-ghost btn-dental-sm">
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="text-lg font-bold text-gray-800">Confirma tu cita</h3>
      </div>

      <div className="card-dental p-6 space-y-5">
        {/* Resumen de la cita */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">
            Resumen de tu cita
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Especialista</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {doctor.nombre}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tratamiento</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {tratamiento.nombre}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fecha y hora</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {fechaFormateada} a las {selectedTime} hrs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Duración estimada</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {doctor.duracionCitaMinutos} minutos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Datos del paciente */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Tus datos
          </h4>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Nombre:</span>
              <span className="font-medium text-gray-800">
                {formData.nombre}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">RUT:</span>
              <span className="font-medium text-gray-800">{formData.rut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Teléfono:</span>
              <span className="font-medium text-gray-800">
                {formData.telefono}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium text-gray-800">
                {formData.email}
              </span>
            </div>
            {formData.notas && (
              <div className="pt-2 border-t border-gray-200">
                <span className="text-gray-500 block mb-1">Notas:</span>
                <span className="text-gray-700">{formData.notas}</span>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Acciones */}
        <div className="flex justify-between pt-2">
          <button
            onClick={onBack}
            disabled={loading}
            className="btn-dental-ghost disabled:opacity-50"
          >
            Volver
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="btn-dental-primary disabled:opacity-60 min-w-[180px]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="spinner border-white" />
                Agendando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Confirmar cita
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
