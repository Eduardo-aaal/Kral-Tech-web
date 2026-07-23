"use client";

import { DOCTORS, TRATAMIENTOS } from "@/lib/doctors";

interface StepDoctorProps {
  selectedDoctor: string | null;
  selectedTratamiento: string | null;
  onSelectDoctor: (id: string) => void;
  onSelectTratamiento: (id: string) => void;
  onNext: () => void;
}

export default function StepDoctor({
  selectedDoctor,
  selectedTratamiento,
  onSelectDoctor,
  onSelectTratamiento,
  onNext,
}: StepDoctorProps) {
  // Cuando se selecciona un tratamiento, filtramos doctores que lo ofrecen
  const doctoresFiltrados = selectedTratamiento
    ? DOCTORS.filter((d) => {
        const tratamiento = TRATAMIENTOS.find(
          (t) => t.id === selectedTratamiento,
        );
        return tratamiento?.doctores.includes(d.id);
      })
    : DOCTORS;

  // Cuando cambia el tratamiento, resetear doctor seleccionado si ya no aplica
  const handleSelectTratamiento = (id: string) => {
    onSelectTratamiento(id);
    // Si el doctor actual no ofrece este tratamiento, se resetea
    const tratamiento = TRATAMIENTOS.find((t) => t.id === id);
    if (selectedDoctor && !tratamiento?.doctores.includes(selectedDoctor)) {
      onSelectDoctor("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* PASO 1: Selección de TRATAMIENTO (primero) */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          1. ¿Qué tratamiento necesitas?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Primero elige el tratamiento que deseas realizarte.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TRATAMIENTOS.map((tratamiento) => {
            const isSelected = selectedTratamiento === tratamiento.id;
            return (
              <button
                key={tratamiento.id}
                onClick={() => handleSelectTratamiento(tratamiento.id)}
                className={`card-dental p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-primary-500 border-primary-500 shadow-md scale-[1.02]"
                    : "hover:border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">
                    {tratamiento.icono}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {tratamiento.nombre}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {tratamiento.descripcion}
                    </p>
                    <span className="inline-block mt-2 text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                      {tratamiento.precio}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PASO 2: Selección de DOCTOR (filtrado por tratamiento) */}
      {selectedTratamiento && (
        <div className="mb-8 animate-fadeIn">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            2. Elige tu especialista
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Selecciona al profesional que realizará tu{" "}
            {TRATAMIENTOS.find(
              (t) => t.id === selectedTratamiento,
            )?.nombre.toLowerCase()}
            .
          </p>
          {doctoresFiltrados.length === 0 ? (
            <div className="bg-amber-50 text-amber-700 rounded-xl p-4 text-sm text-center">
              Lo sentimos, ningún doctor disponible para este tratamiento
              actualmente.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctoresFiltrados.map((doctor) => {
                const isSelected = selectedDoctor === doctor.id;
                return (
                  <button
                    key={doctor.id}
                    onClick={() => onSelectDoctor(doctor.id)}
                    className={`card-dental p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-primary-500 border-primary-500 shadow-md scale-[1.02]"
                        : "hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={doctor.foto}
                          alt={doctor.nombre}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {doctor.nombre}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {doctor.especialidad}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                            {doctor.duracionCitaMinutos} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Botón Siguiente */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          disabled={!selectedDoctor || !selectedTratamiento}
          className="btn-dental-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          Continuar
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
