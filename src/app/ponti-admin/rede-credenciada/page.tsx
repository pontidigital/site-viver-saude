"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type TabType = "hospitais" | "medicos" | "especialidades";

interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  neighborhood: string | null;
  phone: string | null;
  has_emergency: boolean;
  active: boolean;
}

interface Doctor {
  id: string;
  name: string;
  crm: string | null;
  city: string;
  state: string;
  phone: string | null;
  active: boolean;
}

interface Specialty {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export default function RedeCredenciadaAdminPage() {
  const [tab, setTab] = useState<TabType>("hospitais");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const supabase = createClient();
    setLoading(true);
    if (tab === "hospitais") {
      let query = supabase
        .from("hospitals")
        .select("id, name, city, state, neighborhood, phone, has_emergency, active")
        .order("name");
      if (busca) query = query.ilike("name", `%${busca}%`);
      const { data, error } = await query;
      if (error) console.error("hospitals error:", error);
      setHospitals(data ?? []);
    } else if (tab === "medicos") {
      let query = supabase
        .from("doctors")
        .select("id, name, crm, city, state, phone, active")
        .order("name");
      if (busca) query = query.ilike("name", `%${busca}%`);
      const { data, error } = await query;
      if (error) console.error("doctors error:", error);
      setDoctors(data ?? []);
    } else {
      let query = supabase
        .from("specialties")
        .select("id, name, slug, active")
        .order("name");
      if (busca) query = query.ilike("name", `%${busca}%`);
      const { data, error } = await query;
      if (error) console.error("specialties error:", error);
      setSpecialties(data ?? []);
    }
    setLoading(false);
  }, [tab, busca]);

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const toggleActive = async (table: string, id: string, current: boolean) => {
    setToggling(id);
    const supabase = createClient();
    await supabase.from(table).update({ active: !current }).eq("id", id);
    await fetchData();
    setToggling(null);
  };

  const handleDelete = async (table: string, id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${name}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      alert("Erro ao excluir: " + error.message);
      return;
    }
    fetchData();
  };

  const switchTab = (next: TabType) => {
    if (next === tab) return;
    setTab(next);
    setBusca("");
  };

  const newHref =
    tab === "hospitais"
      ? "/ponti-admin/rede-credenciada/hospital/new"
      : tab === "medicos"
        ? "/ponti-admin/rede-credenciada/medico/new"
        : "/ponti-admin/rede-credenciada/especialidade/new";

  const tabLabel =
    tab === "hospitais" ? "hospital" : tab === "medicos" ? "médico" : "especialidade";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Guia Médico</h1>
        <Link
          href={newHref}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Novo {tabLabel}
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        {(["hospitais", "medicos", "especialidades"] as TabType[]).map((t) => (
          <button
            key={t}
            onClick={() => switchTab(t)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              tab === t
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "hospitais" ? "Hospitais" : t === "medicos" ? "Médicos" : "Especialidades"}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Buscar ${tabLabel} por nome...`}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="rounded-xl bg-white shadow-sm overflow-hidden">
          {/* Hospitals table */}
          {tab === "hospitais" && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Cidade</th>
                  <th className="px-6 py-3">Bairro</th>
                  <th className="px-6 py-3">Telefone</th>
                  <th className="px-6 py-3">Urgência</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {hospitals.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{h.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{h.city}/{h.state}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{h.neighborhood ?? "-"}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{h.phone ?? "-"}</td>
                    <td className="px-6 py-3">
                      {h.has_emergency ? (
                        <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Sim</span>
                      ) : (
                        <span className="text-xs text-gray-400">Não</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => toggleActive("hospitals", h.id, h.active)}
                        disabled={toggling === h.id}
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${
                          h.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {h.active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td className="px-6 py-3 flex gap-3">
                      <Link href={`/ponti-admin/rede-credenciada/hospital/${h.id}`} className="text-sm font-medium text-primary hover:text-primary-dark">
                        Editar
                      </Link>
                      <button onClick={() => handleDelete("hospitals", h.id, h.name)} className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {hospitals.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-400">Nenhum hospital encontrado.</td></tr>
                )}
              </tbody>
            </table>
          )}

          {/* Doctors table */}
          {tab === "medicos" && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">CRM</th>
                  <th className="px-6 py-3">Cidade</th>
                  <th className="px-6 py-3">Telefone</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {doctors.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{d.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{d.crm ?? "-"}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{d.city}/{d.state}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{d.phone ?? "-"}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => toggleActive("doctors", d.id, d.active)}
                        disabled={toggling === d.id}
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${
                          d.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {d.active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td className="px-6 py-3 flex gap-3">
                      <Link href={`/ponti-admin/rede-credenciada/medico/${d.id}`} className="text-sm font-medium text-primary hover:text-primary-dark">
                        Editar
                      </Link>
                      <button onClick={() => handleDelete("doctors", d.id, d.name)} className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {doctors.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">Nenhum médico encontrado.</td></tr>
                )}
              </tbody>
            </table>
          )}

          {/* Specialties table */}
          {tab === "especialidades" && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Slug</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {specialties.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{s.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{s.slug}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => toggleActive("specialties", s.id, s.active)}
                        disabled={toggling === s.id}
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${
                          s.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {s.active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td className="px-6 py-3 flex gap-3">
                      <Link href={`/ponti-admin/rede-credenciada/especialidade/${s.id}`} className="text-sm font-medium text-primary hover:text-primary-dark">
                        Editar
                      </Link>
                      <button onClick={() => handleDelete("specialties", s.id, s.name)} className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {specialties.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">Nenhuma especialidade encontrada.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
