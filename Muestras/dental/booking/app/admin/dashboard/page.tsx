"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DOCTORS } from "@/lib/doctors";

interface Cita {
  eventId: string;
  doctorId: string;
  doctorNombre: string;
  titulo: string;
  inicio: string;
  fin: string;
  paciente: {
    nombre: string;
    rut: string;
    telefono: string;
    email: string;
  };
  tratamiento: string;
  notas: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [filterDoctor, setFilterDoctor] = useState<string>("all");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockForm, setBlockForm] = useState({
    doctorId: DOCTORS[0]?.id || "",
    horaInicio: "09:00",
    horaFin: "10:00",
    motivo: "",
  });
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getAdminKey = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_key") || "";
    }
    return "";
  };

  const fetchCitas = useCallback(async () => {
    setLoading(true);
    try {
      const key = getAdminKey();
      if (!key) {
        router.push("/admin/login");
        return;
      }
      const res = await fetch(
        `/api/admin/citas?fecha=${selectedDate}&key=${key}`,
      );
      if (res.status === 401) {
        sessionStorage.removeItem("admin_key");
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setCitas(data.citas || []);
    } catch (error) {
      console.error("Error fetching citas:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, router]);

  useEffect(() => {
    const key = getAdminKey();
    if (!key) {
      router.push("/admin/login");
      return;
    }
    fetchCitas();
  }, [fetchCitas, router]);

  const handleCancel = async (doctorId: string, eventId: string) => {
    if (!confirm("¿Estás seguro de cancelar esta cita?")) return;

    setActionLoading(eventId);
    try {
      const key = getAdminKey();
      const res = await fetch("/api/admin/cancelar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId, eventId, key }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCitas();
      } else {
        alert(data.error || "Error al cancelar");
      }
    } catch (error) {
      alert("Error al cancelar la cita");
    } finally {
      setActionLoading(null);
    }
  };

  const handleBlockTime = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading("block");
    try {
      const key = getAdminKey();
      const res = await fetch("/api/admin/bloquear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blockForm,
          fecha: selectedDate,
          key,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowBlockModal(false);
        setBlockForm({
          doctorId: DOCTORS[0]?.id || "",
          horaInicio: "09:00",
          horaFin: "10:00",
          motivo: "",
        });
        fetchCitas();
      } else {
        alert(data.error || "Error al bloquear horario");
      }
    } catch (error) {
      alert("Error al bloquear horario");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredCitas =
    filterDoctor === "all"
      ? citas
      : citas.filter((c) => c.doctorId === filterDoctor);

  const citasPorDoctor = DOCTORS.map((doctor) => ({
    ...doctor,
    count: citas.filter((c) => c.doctorId === doctor.id).length,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm">
              🦷
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-sm">
                Panel Administrativo
              </h1>
              <p className="text-[10px] text-gray-400">Clínica Dental Care</p>
            </div>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_key");
              router.push("/admin/login");
            }}
            className="text-xs text-gray-500 hover:text-red-500 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-dental pr-10 w-44"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
            <button
              onClick={() => setShowBlockModal(true)}
              className="btn-dental-ghost btn-dental-sm text-amber-600 hover:bg-amber-50"
            >
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
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Bloquear
            </button>
          </div>

          {/* Doctor filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterDoctor("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filterDoctor === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
              }`}
            >
              Todos ({citas.length})
            </button>
            {citasPorDoctor.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setFilterDoctor(doc.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  filterDoctor === doc.id
                    ? "bg-primary-500 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
                }`}
              >
                {doc.nombre.split(" ")[1]} ({doc.count})
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="card-dental p-4">
            <p className="text-xs text-gray-500">Total citas</p>
            <p className="text-2xl font-bold text-gray-800">{citas.length}</p>
          </div>
          <div className="card-dental p-4">
            <p className="text-xs text-gray-500">Doctores</p>
            <p className="text-2xl font-bold text-gray-800">
              {new Set(citas.map((c) => c.doctorId)).size}
            </p>
          </div>
          <div className="card-dental p-4">
            <p className="text-xs text-gray-500">Pacientes</p>
            <p className="text-2xl font-bold text-gray-800">
              {new Set(citas.map((c) => c.paciente.nombre)).size}
            </p>
          </div>
          <div className="card-dental p-4">
            <p className="text-xs text-gray-500">Próxima cita</p>
            <p className="text-lg font-bold text-gray-800">
              {citas.length > 0 ? citas[0].inicio : "--:--"}
            </p>
          </div>
        </div>

        {/* Citas list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="spinner text-primary-500" />
            <span className="ml-3 text-sm text-gray-500">
              Cargando citas...
            </span>
          </div>
        ) : filteredCitas.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              No hay citas para esta fecha
            </h3>
            <p className="text-sm text-gray-500">
              Selecciona otra fecha o agrega un bloqueo manual.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCitas.map((cita) => (
              <div
                key={cita.eventId}
                className="card-dental p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Time */}
                    <div className="text-center flex-shrink-0 w-16">
                      <p className="text-lg font-bold text-primary-600">
                        {cita.inicio}
                      </p>
                      <p className="text-[10px] text-gray-400">hrs</p>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                          {cita.doctorNombre}
                        </span>
                        {cita.tratamiento && (
                          <span className="text-xs text-gray-500">
                            {cita.tratamiento}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {cita.paciente.nombre || cita.titulo}
                      </h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        {cita.paciente.rut && (
                          <span className="text-xs text-gray-500">
                            RUT: {cita.paciente.rut}
                          </span>
                        )}
                        {cita.paciente.telefono && (
                          <a
                            href={`tel:${cita.paciente.telefono}`}
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                          >
                            📞 {cita.paciente.telefono}
                          </a>
                        )}
                        {cita.paciente.email && (
                          <span className="text-xs text-gray-500">
                            {cita.paciente.email}
                          </span>
                        )}
                      </div>
                      {cita.notas && (
                        <p className="text-xs text-gray-400 mt-1 italic">
                          {cita.notas}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`tel:${cita.paciente.telefono}`}
                      className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                      title="Llamar"
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
                    </a>
                    <button
                      onClick={() => handleCancel(cita.doctorId, cita.eventId)}
                      disabled={actionLoading === cita.eventId}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors disabled:opacity-50"
                      title="Cancelar cita"
                    >
                      {actionLoading === cita.eventId ? (
                        <div className="spinner w-4 h-4 text-red-500" />
                      ) : (
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Block Time Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="card-dental p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Bloquear Horario</h3>
              <button
                onClick={() => setShowBlockModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleBlockTime} className="space-y-4">
              <div>
                <label className="label-dental">Doctor</label>
                <select
                  className="input-dental"
                  value={blockForm.doctorId}
                  onChange={(e) =>
                    setBlockForm({ ...blockForm, doctorId: e.target.value })
                  }
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-dental">Desde</label>
                  <input
                    type="time"
                    className="input-dental"
                    value={blockForm.horaInicio}
                    onChange={(e) =>
                      setBlockForm({
                        ...blockForm,
                        horaInicio: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="label-dental">Hasta</label>
                  <input
                    type="time"
                    className="input-dental"
                    value={blockForm.horaFin}
                    onChange={(e) =>
                      setBlockForm({ ...blockForm, horaFin: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="label-dental">Motivo</label>
                <input
                  type="text"
                  className="input-dental"
                  placeholder="Ej: Reunión administrativa"
                  value={blockForm.motivo}
                  onChange={(e) =>
                    setBlockForm({ ...blockForm, motivo: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBlockModal(false)}
                  className="btn-dental-ghost"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={actionLoading === "block"}
                  className="btn-dental-primary"
                >
                  {actionLoading === "block" ? (
                    <span className="flex items-center gap-2">
                      <div className="spinner border-white" />
                      Bloqueando...
                    </span>
                  ) : (
                    "Bloquear"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
