"use client";

import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 브라우저에서만 돌아간다는거 보장
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/mocks/browser");
      }
    }
  }, []);
  return null;
};
