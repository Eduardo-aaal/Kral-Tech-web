"use client";

import { useState, useCallback } from "react";
import StepIndicator from "@/components/StepIndicator";
import StepDoctor from "@/components/StepDoctor";
import StepDateTime from "@/components/StepDateTime";
import StepPatient from "@/components/StepPatient";
import StepConfirm from "@/components/StepConfirm";
import StepSuccess from "@/components/StepSuccess";

const STEPS = ["Doctor", "Fecha", "Datos", "Confirmar"];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTratamiento, setSelectedTratamiento] = useState<string | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    telefono: "",
    email: "",
    notas: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectDoctor = useCallback((id: string) => {
    setSelectedDoctor(id);
    setSelectedTratamiento(null);
  }, []);

  const handleSelectTratamiento = useCallback((id: string) => {
    setSelectedTratamiento(id);
  }, []);

  const handleSelectDate = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  }, []);

  const handleSelectTime = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const handleFormChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleConfirm = async () => {
    const response = await fetch("/api/agendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: selectedDoctor,
        fecha: selectedDate,
        hora: selectedTime,
        tratamientoId: selectedTratamiento,
        paciente: formData,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al agendar la cita");
    }

    setIsSuccess(true);
  };

  // Render current step
  const renderStep = () => {
    if (isSuccess) {
      return (
        <StepSuccess
          selectedDoctor={selectedDoctor!}
          selectedTratamiento={selectedTratamiento!}
          selectedDate={selectedDate!}
          selectedTime={selectedTime!}
          formData={formData}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <StepDoctor
            selectedDoctor={selectedDoctor}
            selectedTratamiento={selectedTratamiento}
            onSelectDoctor={handleSelectDoctor}
            onSelectTratamiento={handleSelectTratamiento}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <StepDateTime
            selectedDoctor={selectedDoctor!}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={handleSelectDate}
            onSelectTime={handleSelectTime}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <StepPatient
            formData={formData}
            onChange={handleFormChange}
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        );
      case 4:
        return (
          <StepConfirm
            selectedDoctor={selectedDoctor!}
            selectedTratamiento={selectedTratamiento!}
            selectedDate={selectedDate!}
            selectedTime={selectedTime!}
            formData={formData}
            onBack={() => setCurrentStep(3)}
            onConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-dental-light via-white to-primary-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              🦷
            </div>
            <span className="font-bold text-lg">
              Dental <span className="text-primary-500">Care</span>
            </span>
          </a>
          <div className="text-xs text-gray-400">Agenda tu hora online</div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {!isSuccess && (
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Agenda tu consulta
            </h1>
            <p className="text-gray-500 text-sm">
              En 4 simples pasos puedes reservar tu hora con el especialista que
              necesitas.
            </p>
          </div>
        )}

        {!isSuccess && (
          <StepIndicator currentStep={currentStep} steps={STEPS} />
        )}

        {renderStep()}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-gray-400">
          <p>© 2024 Clínica Dental Care. Todos los derechos reservados.</p>
          <p className="mt-1">
            Av. Providencia 1234, Santiago | +56 9 1234 5678
          </p>
        </div>
      </footer>
    </main>
  );
}
