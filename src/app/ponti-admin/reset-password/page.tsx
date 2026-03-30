"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/ponti-admin/login`,
      });

      if (resetError) {
        setError("Erro ao enviar email. Verifique o endereco.");
        return;
      }

      setSent(true);
    } catch {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Recuperar senha</h1>
          <p className="text-sm text-gray-500 mt-1">Viver Saúde Admin</p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-4 mb-4">
              Link de recuperacao enviado para <strong>{email}</strong>.
            </div>
            <a href="/ponti-admin/login" className="text-sm text-primary hover:underline">
              Voltar ao login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Enviando..." : "Enviar link de recuperacao"}
            </button>
            <div className="text-center">
              <a href="/ponti-admin/login" className="text-sm text-primary hover:underline">
                Voltar ao login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
