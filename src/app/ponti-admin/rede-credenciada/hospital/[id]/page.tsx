"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  neighborhood: string;
  address: string;
  phone: string;
  has_emergency: boolean;
  lat: number | null;
  lng: number | null;
  active: boolean;
}

const empty: Omit<Hospital, "id"> = {
  name: "",
  city: "Natal",
  state: "RN",
  neighborhood: "",
  address: "",
  phone: "",
  has_emergency: false,
  lat: null,
  lng: null,
  active: true,
};

export default function EditHospitalPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState<Omit<Hospital, "id">>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (isNew) return;
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("hospitals")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        router.push("/ponti-admin/rede-credenciada");
        return;
      }
      setForm({
        name: data.name ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        neighborhood: data.neighborhood ?? "",
        address: data.address ?? "",
        phone: data.phone ?? "",
        has_emergency: data.has_emergency ?? false,
        lat: data.lat ?? null,
        lng: data.lng ?? null,
        active: data.active ?? true,
      });
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
    const payload = {
      name: form.name.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      neighborhood: form.neighborhood.trim() || null,
      address: form.address.trim() || null,
      phone: form.phone.trim() || null,
      has_emergency: form.has_emergency,
      lat: form.lat,
      lng: form.lng,
      active: form.active,
    };

    if (isNew) {
      const { error } = await supabase.from("hospitals").insert(payload);
      setSaving(false);
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        router.push("/ponti-admin/rede-credenciada");
      }
    } else {
      const { error } = await supabase.from("hospitals").update(payload).eq("id", id);
      setSaving(false);
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Hospital salvo." });
      }
    }
  };

  const update = (field: keyof Omit<Hospital, "id">, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
          {isNew ? "Novo Hospital" : `Editar: ${form.name}`}
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
            <input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Telefone</label>
            <input className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Endereço</label>
          <input className={inputClass} value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Bairro</label>
            <input className={inputClass} value={form.neighborhood} onChange={(e) => update("neighborhood", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Cidade</label>
            <input className={inputClass} value={form.city} onChange={(e) => update("city", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Estado</label>
            <input className={inputClass} value={form.state} onChange={(e) => update("state", e.target.value)} maxLength={2} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Latitude</label>
            <input type="number" step="any" className={inputClass} value={form.lat ?? ""} onChange={(e) => update("lat", e.target.value ? parseFloat(e.target.value) : null)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Longitude</label>
            <input type="number" step="any" className={inputClass} value={form.lng ?? ""} onChange={(e) => update("lng", e.target.value ? parseFloat(e.target.value) : null)} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="has_emergency"
              checked={form.has_emergency}
              onChange={(e) => update("has_emergency", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="has_emergency" className="text-sm text-gray-700">Possui urgência/emergência</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => update("active", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="active" className="text-sm text-gray-700">Ativo</label>
          </div>
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
