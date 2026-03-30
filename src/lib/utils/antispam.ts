import { createHash } from "crypto";

export function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export function isHoneypotFilled(value: string | undefined | null): boolean {
  return !!value && value.trim().length > 0;
}

export function isSubmissionTooFast(
  renderedAt: number,
  minSeconds: number = 3
): boolean {
  const elapsed = (Date.now() - renderedAt) / 1000;
  return elapsed < minSeconds;
}

export async function isRateLimited(
  supabase: ReturnType<typeof import("@supabase/supabase-js").createClient>,
  ipHash: string,
  maxPerHour: number = 5
): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count } = await supabase
    .from("form_submissions")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", oneHourAgo);

  return (count ?? 0) >= maxPerHour;
}
