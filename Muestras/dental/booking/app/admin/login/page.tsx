"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError("Ingresa la clave de acceso");
      return;
    }
    // Store in sessionStorage for simplicity
    sessionStorage.setItem("admin_key", key.trim());
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="card-dental p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            Panel de Administración
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ingresa la clave de acceso para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-dental">Clave de acceso</label>
            <input
              type="password"
              className="input-dental"
              placeholder="Ingresa tu clave"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
          <button type="submit" className="btn-dental-primary w-full">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
