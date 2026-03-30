export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
}

interface StoredUTM extends UTMParams {
  captured_at: string;
  landing_url: string;
}

const FIRST_TOUCH_KEY = "utm_first_touch";
const LAST_TOUCH_KEY = "utm_last_touch";

export function getUtmFromUrl(): UTMParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  const source = params.get("utm_source")?.trim();
  const medium = params.get("utm_medium")?.trim();
  const campaign = params.get("utm_campaign")?.trim();
  const term = params.get("utm_term")?.trim();

  if (source) utm.utm_source = source;
  if (medium) utm.utm_medium = medium;
  if (campaign) utm.utm_campaign = campaign;
  if (term) utm.utm_term = term;

  return utm;
}

export function persistUtm(utm: UTMParams): void {
  if (typeof window === "undefined") return;
  if (Object.keys(utm).length === 0) return;

  const stored: StoredUTM = {
    ...utm,
    captured_at: new Date().toISOString(),
    landing_url: window.location.href,
  };

  // First touch: save only if it doesn't exist yet
  if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(stored));
  }

  // Last touch: always overwrite
  localStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(stored));
}

export function resolveUtm(): UTMParams {
  if (typeof window === "undefined") return {};

  // 1. Current URL UTMs
  const current = getUtmFromUrl();
  if (Object.keys(current).length > 0) return current;

  // 2. Last touch
  try {
    const lastRaw = localStorage.getItem(LAST_TOUCH_KEY);
    if (lastRaw) {
      const last: StoredUTM = JSON.parse(lastRaw);
      const utm: UTMParams = {};
      if (last.utm_source) utm.utm_source = last.utm_source;
      if (last.utm_medium) utm.utm_medium = last.utm_medium;
      if (last.utm_campaign) utm.utm_campaign = last.utm_campaign;
      if (last.utm_term) utm.utm_term = last.utm_term;
      if (Object.keys(utm).length > 0) return utm;
    }
  } catch {}

  // 3. First touch
  try {
    const firstRaw = localStorage.getItem(FIRST_TOUCH_KEY);
    if (firstRaw) {
      const first: StoredUTM = JSON.parse(firstRaw);
      const utm: UTMParams = {};
      if (first.utm_source) utm.utm_source = first.utm_source;
      if (first.utm_medium) utm.utm_medium = first.utm_medium;
      if (first.utm_campaign) utm.utm_campaign = first.utm_campaign;
      if (first.utm_term) utm.utm_term = first.utm_term;
      if (Object.keys(utm).length > 0) return utm;
    }
  } catch {}

  return {};
}

export function captureAndPersistUtm(): void {
  const utm = getUtmFromUrl();
  if (Object.keys(utm).length > 0) {
    persistUtm(utm);
  }
}
