"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Plan {
  id: string;
  name: string;
  slug: string;
  display_name: string;
  tagline: string | null;
  description: string | null;
  target_audience: string | null;
  highlights: string[] | null;
  coverage_type: string | null;
  region: string | null;
  contract_types: string[] | null;
  image_url: string | null;
  pdf_url: string | null;
  sort_order: number | null;
  is_active: boolean | null;
}

export default function EditPlanPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        router.push("/ponti-admin/plans");
        return;
      }
      setPlan(data);
      setLoading(false);
    }
    load();
  }, [id, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("plans")
      .update({
        name: plan.name,
        slug: plan.slug,
        display_name: plan.display_name,
        tagline: plan.tagline || null,
        description: plan.description || null,
        target_audience: plan.target_audience || null,
        coverage_type: plan.coverage_type || null,
        region: plan.region || null,
        image_url: plan.image_url || null,
        pdf_url: plan.pdf_url || null,
        sort_order: plan.sort_order ?? 0,
        is_active: plan.is_active ?? true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setSaving(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Plano salvo." });
    }
  };

  const update = (field: keyof Plan, value: unknown) => {
    setPlan((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  if (loading || !plan) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Editar Plano: {plan.display_name}
        </h1>
        <button
          onClick={() => router.push("/ponti-admin/plans")}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Voltar
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-xl bg-white p-6 shadow-sm space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
            <input className={inputClass} value={plan.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
            <input className={inputClass} value={plan.slug} onChange={(e) => update("slug", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Display Name</label>
            <input className={inputClass} value={plan.display_name} onChange={(e) => update("display_name", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tagline</label>
            <input className={inputClass} value={plan.tagline ?? ""} onChange={(e) => update("tagline", e.target.value)} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
          <textarea className={inputClass + " min-h-[80px]"} value={plan.description ?? ""} onChange={(e) => update("description", e.target.value)} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Público-alvo</label>
            <input className={inputClass} value={plan.target_audience ?? ""} onChange={(e) => update("target_audience", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de Cobertura</label>
            <input className={inputClass} value={plan.coverage_type ?? ""} onChange={(e) => update("coverage_type", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Região</label>
            <input className={inputClass} value={plan.region ?? ""} onChange={(e) => update("region", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Ordem</label>
            <input type="number" className={inputClass} value={plan.sort_order ?? 0} onChange={(e) => update("sort_order", parseInt(e.target.value) || 0)} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">URL da Imagem</label>
            <input className={inputClass} value={plan.image_url ?? ""} onChange={(e) => update("image_url", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">URL do PDF</label>
            <input className={inputClass} value={plan.pdf_url ?? ""} onChange={(e) => update("pdf_url", e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_active"
            checked={plan.is_active ?? true}
            onChange={(e) => update("is_active", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="is_active" className="text-sm text-gray-700">Ativo</label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/ponti-admin/plans")}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
