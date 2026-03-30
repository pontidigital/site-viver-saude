"use client";

import { useEffect } from "react";
import { captureAndPersistUtm } from "@/lib/utils/utm";

export function useUTM() {
  useEffect(() => {
    captureAndPersistUtm();
  }, []);
}
