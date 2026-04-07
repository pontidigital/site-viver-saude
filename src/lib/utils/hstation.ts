const HSTATION_API = "https://planoviversaude.hstation.com.br/api/";

interface HStationLead {
  name: string;
  email: string;
  phone: string;
}

/**
 * Sends lead data to HStation via hidden form POST into an iframe.
 * This bypasses Cloudflare challenge and CORS restrictions that block
 * fetch/XHR requests from both server-side and client-side.
 */
export function sendToHStation(lead: HStationLead): void {
  try {
    const iframeName = "hstation_iframe_" + Date.now();

    // Create hidden iframe
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Create hidden form targeting the iframe
    const form = document.createElement("form");
    form.method = "POST";
    form.action = HSTATION_API;
    form.target = iframeName;
    form.style.display = "none";

    const fields: Record<string, string> = {
      lead_nome: lead.name,
      lead_email: lead.email,
      lead_telefone: lead.phone,
      lead_posto_de_conversao: "Site Viver Saúde",
      lead_equipe: "equipe-rj",
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();

    // Cleanup after 10s
    setTimeout(() => {
      form.remove();
      iframe.remove();
    }, 10000);
  } catch {
    // Silently fail — Supabase is the source of truth
  }
}
