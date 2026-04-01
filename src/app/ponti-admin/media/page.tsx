"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  created_at: string;
  size: number;
  mime_type: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const fetchMedia = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    setMedia(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const uploadFiles = async (files: FileList | File[]) => {
    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        alert("Erro ao fazer upload: " + uploadError.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(filePath);

      await supabase.from("media").insert({
        name: file.name,
        url: publicUrl,
        size: file.size,
        mime_type: file.type,
      });
    }

    setUploading(false);
    fetchMedia();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Excluir "${item.name}"?`)) return;
    const supabase = createClient();

    // Try to extract storage path from URL
    const urlParts = item.url.split("/media/");
    if (urlParts[1]) {
      await supabase.storage.from("media").remove([urlParts[1]]);
    }

    await supabase.from("media").delete().eq("id", item.id);
    setMedia((prev) => prev.filter((m) => m.id !== item.id));
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Biblioteca de Mídia
      </h1>

      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 bg-white"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 text-gray-400"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
        <p className="mb-1 text-sm font-medium text-gray-700">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        <p className="mb-4 text-xs text-gray-400">
          PNG, JPG, GIF, SVG, WEBP - até 10MB
        </p>
        <label className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          {uploading ? "Enviando..." : "Selecionar Arquivos"}
        </label>
      </div>

      {/* Media grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : media.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-400">
          Nenhuma mídia encontrada.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    {copied === item.id ? "Copiado!" : "Copiar URL"}
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-gray-700">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">
                  {(item.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
