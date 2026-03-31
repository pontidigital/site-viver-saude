"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface DailyStat {
  date: string;
  count: number;
}

interface SourceStat {
  source: string;
  count: number;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [publishedPosts, setPublishedPosts] = useState(0);
  const [draftPosts, setDraftPosts] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [dailySubmissions, setDailySubmissions] = useState<DailyStat[]>([]);
  const [topSources, setTopSources] = useState<SourceStat[]>([]);
  const [topFormTypes, setTopFormTypes] = useState<SourceStat[]>([]);

  useEffect(() => {
    async function fetchAnalytics() {
      const supabase = createClient();

      // Posts stats
      const [allPosts, pubPosts, draftP] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
      ]);

      setTotalPosts(allPosts.count ?? 0);
      setPublishedPosts(pubPosts.count ?? 0);
      setDraftPosts(draftP.count ?? 0);

      // Submissions
      const { count: subCount } = await supabase
        .from("form_submissions")
        .select("id", { count: "exact", head: true });
      setTotalSubmissions(subCount ?? 0);

      // Last 30 days submissions
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: recentSubs } = await supabase
        .from("form_submissions")
        .select("created_at")
        .gte("created_at", thirtyDaysAgo.toISOString())
        .order("created_at");

      // Group by day
      const dayMap = new Map<string, number>();
      for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        dayMap.set(d.toISOString().split("T")[0], 0);
      }

      for (const sub of recentSubs ?? []) {
        const day = sub.created_at.split("T")[0];
        dayMap.set(day, (dayMap.get(day) ?? 0) + 1);
      }

      setDailySubmissions(
        Array.from(dayMap.entries()).map(([date, count]) => ({ date, count }))
      );

      // Top UTM sources
      const { data: allSubs } = await supabase
        .from("form_submissions")
        .select("utm_source, form_type")
        .not("utm_source", "is", null);

      const sourceMap = new Map<string, number>();
      const formTypeMap = new Map<string, number>();

      for (const sub of allSubs ?? []) {
        if (sub.utm_source) {
          sourceMap.set(sub.utm_source, (sourceMap.get(sub.utm_source) ?? 0) + 1);
        }
      }

      // Form types from all submissions
      const { data: allSubsTypes } = await supabase
        .from("form_submissions")
        .select("form_type");

      for (const sub of allSubsTypes ?? []) {
        const ft = sub.form_type || "contato";
        formTypeMap.set(ft, (formTypeMap.get(ft) ?? 0) + 1);
      }

      setTopSources(
        Array.from(sourceMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([source, count]) => ({ source, count }))
      );

      setTopFormTypes(
        Array.from(formTypeMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([source, count]) => ({ source, count }))
      );

      setLoading(false);
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const maxDaily = Math.max(...dailySubmissions.map((d) => d.count), 1);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Analytics</h1>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Submissions", value: totalSubmissions, color: "bg-primary" },
          { label: "Total Posts", value: totalPosts, color: "bg-accent" },
          { label: "Publicados", value: publishedPosts, color: "bg-green-500" },
          { label: "Rascunhos", value: draftPosts, color: "bg-yellow-500" },
        ].map((card) => (
          <div key={card.label} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.color} text-white text-lg font-bold`}>
              {card.value}
            </div>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Daily Submissions Chart */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Submissions - Ultimos 30 dias
        </h2>
        <div className="flex items-end gap-1 h-40">
          {dailySubmissions.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center group relative">
              <div
                className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors min-h-[2px]"
                style={{ height: `${(d.count / maxDaily) * 100}%` }}
              />
              <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {new Date(d.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}: {d.count}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>{dailySubmissions[0]?.date ? new Date(dailySubmissions[0].date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) : ""}</span>
          <span>{dailySubmissions[dailySubmissions.length - 1]?.date ? new Date(dailySubmissions[dailySubmissions.length - 1].date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) : ""}</span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* UTM Sources */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Top UTM Sources</h2>
          {topSources.length === 0 ? (
            <p className="text-sm text-gray-400">Nenhuma source registrada.</p>
          ) : (
            <div className="space-y-3">
              {topSources.map((s) => (
                <div key={s.source} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{s.source}</span>
                      <span className="text-gray-400">{s.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(s.count / (topSources[0]?.count || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Types */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Por Tipo de Formulario</h2>
          {topFormTypes.length === 0 ? (
            <p className="text-sm text-gray-400">Nenhum formulario registrado.</p>
          ) : (
            <div className="space-y-3">
              {topFormTypes.map((s) => (
                <div key={s.source} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{s.source}</span>
                      <span className="text-gray-400">{s.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${(s.count / (topFormTypes[0]?.count || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
