"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface SpecialtyForm {
  name: string;
  slug: string;
  active: boolean;
}

const empty: SpecialtyForm = {
  name: "",
  slug: "",
  active: true,
};

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EditSpecialtyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState<SpecialtyForm>(empty);
  const [autoSlug, setAutoSlug] = useState(true);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (isNew) return;
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("specialties")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        router.push("/ponti-admin/rede-credenciada");
        return;
      }
      setForm({
        name: data.name ?? "",
        slug: data.slug ?? "",
        active: data.active ?? true,
      });
      setAutoSlug(false);
      setLoading(false);
    }
    load();
  }, [id, isNew, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setMessage({ type: "error", text: "Nome é obrigatório." });
      return;
    }
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const slug = form.slug.trim() || toSlug(form.name);
    const payload = {
      name: form.name.trim(),
      slug,
      active: form.active,
    };

    if (isNew) {
      const { error } = await supabase.from("specialties").insert(payload);
      setSaving(false);
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        router.push("/ponti-admin/rede-credenciada");
      }
    } else {
      const { error } = await supabase.from("specialties").update(payload).eq("id", id);
      setSaving(false);
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Especialidade salva." });
      }
    }
  };

  if (loading) {
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
          {isNew ? "Nova Especialidade" : `Editar: ${form.name}`}
        </h1>
        <button
          onClick={() => router.push("/ponti-admin/rede-credenciada")}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Voltar
        </button>
      </div>

      {message && (
        <div className={`mb-4 rounded-lg px-4 py-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-xl bg-white p-6 shadow-sm space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nome *</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  name,
                  slug: autoSlug ? toSlug(name) : prev.slug,
                }));
              }}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => {
                setAutoSlug(false);
                setForm((prev) => ({ ...prev, slug: e.target.value }));
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={form.active}
            onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="active" className="text-sm text-gray-700">Ativo</label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/ponti-admin/rede-credenciada")}
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
