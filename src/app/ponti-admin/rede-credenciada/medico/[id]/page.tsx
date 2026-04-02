"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface DoctorForm {
  name: string;
  crm: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  active: boolean;
}

interface Specialty {
  id: string;
  name: string;
}

const empty: DoctorForm = {
  name: "",
  crm: "",
  city: "Natal",
  state: "RN",
  phone: "",
  whatsapp: "",
  active: true,
};

export default function EditDoctorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState<DoctorForm>(empty);
  const [allSpecialties, setAllSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      // Load all specialties
      const { data: specs } = await supabase
        .from("specialties")
        .select("id, name")
        .eq("active", true)
        .order("name");
      setAllSpecialties(specs ?? []);

      if (!isNew) {
        const { data, error } = await supabase
          .from("doctors")
          .select("*")
          .eq("id", id)
          .single();
        if (error || !data) {
          router.push("/ponti-admin/rede-credenciada");
          return;
        }
        setForm({
          name: data.name ?? "",
          crm: data.crm ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          phone: data.phone ?? "",
          whatsapp: data.whatsapp ?? "",
          active: data.active ?? true,
        });

        // Load doctor specialties
        const { data: links } = await supabase
          .from("doctor_specialties")
          .select("specialty_id")
          .eq("doctor_id", id);
        setSelectedSpecialties((links ?? []).map((l: { specialty_id: string }) => l.specialty_id));
      }

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
      crm: form.crm.trim() || null,
      city: form.city.trim(),
      state: form.state.trim(),
      phone: form.phone.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      active: form.active,
    };

    let doctorId = id;

    if (isNew) {
      const { data, error } = await supabase.from("doctors").insert(payload).select("id").single();
      if (error || !data) {
        setSaving(false);
        setMessage({ type: "error", text: error?.message ?? "Erro ao criar médico." });
        return;
      }
      doctorId = data.id;
    } else {
      const { error } = await supabase.from("doctors").update(payload).eq("id", id);
      if (error) {
        setSaving(false);
        setMessage({ type: "error", text: error.message });
        return;
      }
    }

    // Sync specialties: delete all, re-insert selected
    await supabase.from("doctor_specialties").delete().eq("doctor_id", doctorId);
    if (selectedSpecialties.length > 0) {
      await supabase.from("doctor_specialties").insert(
        selectedSpecialties.map((sid) => ({ doctor_id: doctorId, specialty_id: sid }))
      );
    }

    setSaving(false);
    if (isNew) {
      router.push("/ponti-admin/rede-credenciada");
    } else {
      setMessage({ type: "success", text: "Médico salvo." });
    }
  };

  const update = (field: keyof DoctorForm, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSpecialty = (specId: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specId) ? prev.filter((s) => s !== specId) : [...prev, specId]
    );
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
          {isNew ? "Novo Médico" : `Editar: ${form.name}`}
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
            <label className="mb-1 block text-sm font-medium text-gray-700">CRM</label>
            <input className={inputClass} value={form.crm} onChange={(e) => update("crm", e.target.value)} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
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
            <label className="mb-1 block text-sm font-medium text-gray-700">Telefone</label>
            <input className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">WhatsApp</label>
            <input className={inputClass} value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="84999999999" />
          </div>
        </div>

        {/* Specialties multi-select */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Especialidades</label>
          <div className="flex flex-wrap gap-2">
            {allSpecialties.map((spec) => (
              <button
                key={spec.id}
                type="button"
                onClick={() => toggleSpecialty(spec.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  selectedSpecialties.includes(spec.id)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {spec.name}
              </button>
            ))}
            {allSpecialties.length === 0 && (
              <p className="text-sm text-gray-400">Nenhuma especialidade cadastrada.</p>
            )}
          </div>
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
