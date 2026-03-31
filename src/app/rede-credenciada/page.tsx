"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { WHATSAPP_URL } from "@/lib/constants/site";

interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  neighborhood: string | null;
  address: string | null;
  phone: string | null;
  has_emergency: boolean | null;
  lat: number | null;
  lng: number | null;
  distance?: number;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function RedeCredenciadaPage() {
  const [busca, setBusca] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ tipo: "hospitais" });
      if (busca.trim()) params.set("busca", busca.trim());

      const res = await fetch(`/api/rede-credenciada?${params}`);
      const json = await res.json();
      setHospitals(json.data ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [busca]);

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const handleNearestClick = () => {
    if (sortByDistance) {
      setSortByDistance(false);
      return;
    }

    if (userPos) {
      setSortByDistance(true);
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setSortByDistance(true);
        setGeoLoading(false);
      },
      () => {
        alert("Não foi possível acessar sua localização. Verifique as permissões do navegador.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const displayHospitals = sortByDistance && userPos
    ? hospitals
        .map((h) => ({
          ...h,
          distance: h.lat && h.lng ? haversineKm(userPos.lat, userPos.lng, h.lat, h.lng) : 9999,
        }))
        .sort((a, b) => a.distance - b.distance)
    : hospitals;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Rede Credenciada
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Encontre hospitais, clínicas e laboratórios perto de você.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Search + Nearest */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar hospital ou clínica..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
              </div>
              <button
                onClick={handleNearestClick}
                disabled={geoLoading}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer shrink-0 ${
                  sortByDistance
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white border border-border text-foreground hover:border-primary hover:text-primary"
                } disabled:opacity-50`}
              >
                {geoLoading ? (
                  <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                {sortByDistance ? "Mais próxima (ativo)" : "Mais próxima de mim"}
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}

          {/* Hospitals List */}
          {!loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {displayHospitals.map((h) => (
                <div
                  key={h.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      {h.distance !== undefined && h.distance < 9999 && (
                        <span className="bg-accent/10 text-accent-dark text-xs font-semibold px-2.5 py-1 rounded-full">
                          {h.distance.toFixed(1)} km
                        </span>
                      )}
                      {h.has_emergency && (
                        <span className="bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                          Urgência
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1.5">
                    {h.name}
                  </h3>
                  {(h.address || h.neighborhood) && (
                    <p className="text-sm text-muted flex items-start gap-1.5 mb-1">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        {h.address}
                        {h.neighborhood && ` — ${h.neighborhood}`}
                        {`, ${h.city}/${h.state}`}
                      </span>
                    </p>
                  )}
                  {h.phone && (
                    <p className="text-sm text-muted flex items-center gap-1.5">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {h.phone}
                    </p>
                  )}
                  {/* Como Chegar button */}
                  {h.lat && h.lng && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-4 inline-flex items-center justify-center gap-2 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Como Chegar
                    </a>
                  )}
                </div>
              ))}
              {hospitals.length === 0 && (
                <p className="col-span-full text-center text-muted py-8">
                  Nenhum hospital ou clínica encontrado.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Entre em contato e nossa equipe ajudará você a encontrar o profissional ideal.
          </p>
          <Button href={WHATSAPP_URL} variant="primary" size="lg">
            Falar no WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}
