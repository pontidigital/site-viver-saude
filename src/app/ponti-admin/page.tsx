"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Stats {
  totalPosts: number;
  totalPlans: number;
  submissionsToday: number;
  totalMedia: number;
}

interface Submission {
  id: string;
  form_type: string;
  page_url: string;
  created_at: string;
  data: Record<string, unknown>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    totalPlans: 0,
    submissionsToday: 0,
    totalMedia: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const [postsRes, plansRes, subsRes, mediaRes, recentRes] =
        await Promise.all([
          supabase.from("posts").select("id", { count: "exact", head: true }),
          supabase.from("plans").select("id", { count: "exact", head: true }),
          supabase
            .from("form_submissions")
            .select("id", { count: "exact", head: true })
            .gte("created_at", todayISO),
          supabase.from("media").select("id", { count: "exact", head: true }),
          supabase
            .from("form_submissions")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

      setStats({
        totalPosts: postsRes.count ?? 0,
        totalPlans: plansRes.count ?? 0,
        submissionsToday: subsRes.count ?? 0,
        totalMedia: mediaRes.count ?? 0,
      });

      setRecentSubmissions(recentRes.data ?? []);
      setLoading(false);
    }

    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Posts",
      value: stats.totalPosts,
      color: "bg-primary",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /></svg>
      ),
    },
    {
      label: "Total Planos",
      value: stats.totalPlans,
      color: "bg-accent",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg>
      ),
    },
    {
      label: "Submissions Hoje",
      value: stats.submissionsToday,
      color: "bg-amber-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
      ),
    },
    {
      label: "Midia",
      value: stats.totalMedia,
      color: "bg-violet-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.color} text-white`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/ponti-admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
          Novo Post
        </Link>
        <Link
          href="/ponti-admin/media"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
          Upload Midia
        </Link>
        <Link
          href="/ponti-admin/submissions"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
          Ver Submissions
        </Link>
      </div>

      {/* Recent submissions */}
      <div className="rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Submissions Recentes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Pagina</th>
                <th className="px-6 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentSubmissions.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-sm text-gray-400"
                  >
                    Nenhuma submission encontrada.
                  </td>
                </tr>
              ) : (
                recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-700">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium">
                        {sub.form_type ?? "contato"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {(sub.data as Record<string, string>)?.name ?? "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {sub.page_url ?? "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-500">
                      {new Date(sub.created_at).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
