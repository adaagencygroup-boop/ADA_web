"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { refreshSession } from "@/src/lib/api/client";
import { getAccessToken } from "@/src/lib/storage";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (getAccessToken()) {
        if (!cancelled) setAuthorized(true);
        return;
      }
      try {
        await refreshSession();
        if (!cancelled) setAuthorized(true);
      } catch {
        if (!cancelled) router.replace("/dang-nhap");
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!authorized) return null;

  return <>{children}</>;
}
