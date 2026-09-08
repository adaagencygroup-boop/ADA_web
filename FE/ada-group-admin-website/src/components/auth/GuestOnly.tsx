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
