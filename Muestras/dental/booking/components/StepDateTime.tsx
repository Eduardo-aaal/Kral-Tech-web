"use client";

import { useState, useEffect, useCallback } from "react";
import { DOCTORS, DIAS_SEMANA } from "@/lib/doctors";

interface StepDateTimeProps {
  selectedDoctor: string;
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepDateTime({
  selectedDoctor,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onBack,
  onNext,
}: StepDateTimeProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const doctor = DOCTORS.find((d) => d.id === selectedDoctor);

  // Fetch available slots
  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    setError("");
    setSlots([]);
    onSelectTime(null);

    const fetchSlots = async () => {
      try {
        const res = await fetch(
          `/api/disponibilidad?doctorId=${selectedDoctor}&fecha=${selectedDate}`,
        );
        if (!res.ok) throw new Error("Error al consultar disponibilidad");
        const data = await res.json();
        setSlots(data.slots || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate, selectedDoctor, onSelectTime]);

  const getDaysInMonth = useCallback((year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  }, []);

  const isDateDisabled = useCallback(
    (day: number) => {
      if (!doctor) return true;
      const date = new Date(currentMonth.year, currentMonth.month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // No permitir fechas pasadas
      if (date < today) return true;

      // No permitir más de 60 días en el futuro
      const maxDate = new Date(today);
      maxDate.setDate(maxDate.getDate() + 60);
      if (date > maxDate) return true;

      // Verificar horario del doctor para ese día
      const diaSemana = date.getDay();
      const horario = doctor.horariosAtencion[diaSemana];
      if (!horario) return true;

      return false;
    },
    [doctor, currentMonth],
  );

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  const today = new Date();
  const isCurrentMonth =
    currentMonth.year === today.getFullYear() &&
    currentMonth.month === today.getMonth();

  if (!doctor) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="btn-dental-ghost btn-dental-sm">
          <svg
            className="w-4 h-4 mr-1"
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
          Volver
        </button>
        <h3 className="text-lg font-bold text-gray-800">Elige fecha y hora</h3>
        <div className="w-16" />
      </div>

      <div className="card-dental p-5">
        {/* Doctor info */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <img
            src={doctor.foto}
            alt={doctor.nombre}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm text-gray-800">
              {doctor.nombre}
            </p>
            <p className="text-xs text-gray-500">
              Duración: {doctor.duracionCitaMinutos} min
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              disabled={isCurrentMonth}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
            <h4 className="font-bold text-gray-800">
              {new Date(
                currentMonth.year,
                currentMonth.month,
              ).toLocaleDateString("es-CL", {
                month: "long",
                year: "numeric",
              })}
            </h4>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
              <div
                key={d}
                className="text-center text-[11px] font-semibold text-gray-400 py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({
              length: getFirstDayOfMonth(currentMonth.year, currentMonth.month),
            }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({
              length: getDaysInMonth(currentMonth.year, currentMonth.month),
            }).map((_, i) => {
              const day = i + 1;
              const disabled = isDateDisabled(day);
              const dateStr = `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSelected = selectedDate === dateStr;
              const isToday =
                today.getFullYear() === currentMonth.year &&
                today.getMonth() === currentMonth.month &&
                today.getDate() === day;

              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() => onSelectDate(dateStr)}
                  className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-primary-500 text-white shadow-md"
                      : disabled
                        ? "text-gray-200 cursor-not-allowed"
                        : isToday
                          ? "bg-primary-50 text-primary-600 hover:bg-primary-100"
                          : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        {selectedDate && (
          <div className="border-t border-gray-100 pt-5">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Horarios disponibles para{" "}
              {new Date(selectedDate).toLocaleDateString("es-CL", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h4>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="spinner text-primary-500" />
                <span className="ml-3 text-sm text-gray-500">
                  Consultando disponibilidad...
                </span>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm text-center">
                {error}
              </div>
            ) : slots.length === 0 ? (
              <div className="bg-amber-50 text-amber-700 rounded-xl p-4 text-sm text-center">
                No hay horarios disponibles para esta fecha. Por favor,
                selecciona otra fecha.
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => onSelectTime(slot)}
                      className={`py-2.5 px-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-primary-500 text-white shadow-md scale-105"
                          : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
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
