"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
}

export default function PagesListPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPages() {
      const supabase = createClient();
      const { data } = await supabase
        .from("pages")
        .select("id, title, slug, status, updated_at")
        .order("title");
      setPages(data ?? []);
      setLoading(false);
    }
    fetchPages();
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
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Paginas</h1>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Titulo</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Atualizado</th>
                <th className="px-6 py-3">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                    Nenhuma pagina encontrada.
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{page.title}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">/{page.slug}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        page.status === "published" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {page.status === "published" ? "Publicada" : "Rascunho"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-500">
                      {new Date(page.updated_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-3">
                      <Link href={`/ponti-admin/pages/${page.id}`} className="text-sm text-primary hover:underline">
                        Editar
                      </Link>
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
