"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Plan {
  id: string;
  name: string;
  slug: string;
  display_name: string;
  tagline: string | null;
  coverage_type: string | null;
  sort_order: number | null;
  is_active: boolean | null;
}

export default function PlansListPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("plans")
        .select("id, name, slug, display_name, tagline, coverage_type, sort_order, is_active")
        .order("sort_order", { ascending: true });
      setPlans(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Planos</h1>
        <span className="text-sm text-gray-500">{plans.length} planos</span>
      </div>

      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Tagline</th>
              <th className="px-6 py-3">Cobertura</th>
              <th className="px-6 py-3">Ordem</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  {plan.display_name || plan.name}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">{plan.slug}</td>
                <td className="px-6 py-3 text-sm text-gray-500 max-w-[200px] truncate">
                  {plan.tagline ?? "-"}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">
                  {plan.coverage_type ?? "-"}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">{plan.sort_order ?? 0}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      plan.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {plan.is_active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <Link
                    href={`/ponti-admin/plans/${plan.id}`}
                    className="text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
