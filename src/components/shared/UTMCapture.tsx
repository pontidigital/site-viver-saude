"use client";

import { useUTM } from "@/hooks/useUTM";

export function UTMCapture() {
  useUTM();
  return null;
}
