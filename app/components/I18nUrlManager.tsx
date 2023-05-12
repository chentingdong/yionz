"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

export const I18nUrlManager: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const language = searchParams.get("language");

    if (language !== null && navigator.cookieEnabled) {
      const url = new URL(window.location.href);
      url.searchParams.delete("language");
      const target = `${url.pathname}${url.search}${url.hash}`;
      document.cookie = `language=${language}; max-age=${365 * 24 * 60 * 60}`;
      router.replace(target);
    }
  }, [router, searchParams]);

  return <></>;
};