"use client";

import { useState } from "react";

interface StepPatientProps {
  formData: {
    nombre: string;
    rut: string;
    telefono: string;
    email: string;
    notas: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepPatient({
  formData,
  onChange,
  onBack,
  onNext,
}: StepPatientProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!formData.rut.trim()) {
      newErrors.rut = "El RUT es obligatorio";
    } else if (
      !/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}[-][0-9kK]{1}$/.test(formData.rut)
    ) {
      newErrors.rut = "Formato de RUT inválido (ej: 12.345.678-9)";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (
      !/^[+]?[0-9]{8,15}$/.test(formData.telefono.replace(/[\s-]/g, ""))
    ) {
      newErrors.telefono = "Formato de teléfono inválido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  const handleRutChange = (value: string) => {
    // Limpiar todo excepto dígitos y K
    let rut = value.replace(/[^0-9kK]/g, "").toUpperCase();

    if (rut.length === 0) {
      onChange("rut", "");
      return;
    }

    // Separar dígito verificador (último carácter)
    const dv = rut.slice(-1);
    let cuerpo = rut.slice(0, -1);

    // Limitar el cuerpo a 8 dígitos (máximo RUT chileno: 99.999.999)
    if (cuerpo.length > 8) {
      cuerpo = cuerpo.slice(0, 8);
    }

    // Formatear con puntos de miles
    let cuerpoFormateado = "";
    const cuerpoArr = cuerpo.split("");
    let contador = 0;
    for (let i = cuerpoArr.length - 1; i >= 0; i--) {
      if (contador > 0 && contador % 3 === 0) {
        cuerpoFormateado = "." + cuerpoFormateado;
      }
      cuerpoFormateado = cuerpoArr[i] + cuerpoFormateado;
      contador++;
    }

    // Armar RUT completo: cuerpo + guión + DV
    const rutFormateado = `${cuerpoFormateado}-${dv}`;
    onChange("rut", rutFormateado);
  };

  const handlePhoneChange = (value: string) => {
    // Solo números, + y espacios
    const cleaned = value.replace(/[^0-9+\s]/g, "");
    onChange("telefono", cleaned);
  };

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
        <h3 className="text-lg font-bold text-gray-800">
          Tus datos personales
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="card-dental p-6 space-y-5">
        <div>
          <label className="label-dental">Nombre Completo *</label>
          <input
            type="text"
            className={`input-dental ${errors.nombre ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
            placeholder="Ej: Juan Pérez González"
            value={formData.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
          />
          {errors.nombre && (
            <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label className="label-dental">RUT *</label>
          <input
            type="text"
            className={`input-dental ${errors.rut ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
            placeholder="Ej: 12.345.678-9"
            value={formData.rut}
            onChange={(e) => handleRutChange(e.target.value)}
            maxLength={12}
          />
          {errors.rut && (
            <p className="mt-1 text-xs text-red-500">{errors.rut}</p>
          )}
        </div>

        <div>
          <label className="label-dental">Teléfono / WhatsApp *</label>
          <input
            type="tel"
            className={`input-dental ${errors.telefono ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
            placeholder="Ej: +569 1234 5678"
            value={formData.telefono}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
          {errors.telefono && (
            <p className="mt-1 text-xs text-red-500">{errors.telefono}</p>
          )}
        </div>

        <div>
          <label className="label-dental">Correo Electrónico *</label>
          <input
            type="email"
            className={`input-dental ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
            placeholder="Ej: juan@correo.cl"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="label-dental">Notas (opcional)</label>
          <textarea
            className="input-dental resize-none h-24"
            placeholder="¿Algo que debamos saber? (alergias, medicamentos, etc.)"
            value={formData.notas}
            onChange={(e) => onChange("notas", e.target.value)}
          />
        </div>

        <div className="flex justify-between pt-2">
          <button type="button" onClick={onBack} className="btn-dental-ghost">
            Volver
          </button>
          <button type="submit" className="btn-dental-primary">
            Revisar y confirmar
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
      </form>
    </div>
  );
}
