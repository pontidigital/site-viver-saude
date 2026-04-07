const HSTATION_API = "https://planoviversaude.hstation.com.br/api/";

interface HStationLead {
  name: string;
  email: string;
  phone: string;
}

export async function sendToHStation(lead: HStationLead): Promise<void> {
  try {
    await fetch(HSTATION_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lead_nome: lead.name,
        lead_email: lead.email,
        lead_telefone: lead.phone,
        lead_posto_de_conversao: "Site Viver Saúde",
        lead_equipe: "equipe-rj",
      }),
    });
  } catch {
    // Silently fail — Supabase is the source of truth
  }
}
