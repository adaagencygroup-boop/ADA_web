"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { refreshSession } from "@/src/lib/api/client";
import { getAccessToken } from "@/src/lib/storage";

export default function GuestOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // Always starts false so the first client render (hydration) matches the
  // server's. The access token lives in memory only, so it never survives a
  // page reload — every mount has to re-check (and possibly silently
  // refresh, via the httpOnly refresh-token cookie) before it knows whether
  // the user is actually a guest.
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (getAccessToken()) {
        router.replace("/");
        return;
      }
      try {
        await refreshSession();
        router.replace("/");
      } catch {
        if (!cancelled) setIsGuest(true);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!isGuest) return null;

  return <>{children}</>;
}
