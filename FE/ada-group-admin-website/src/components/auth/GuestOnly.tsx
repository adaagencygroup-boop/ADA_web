"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/src/lib/storage";

export default function GuestOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // Always starts false so the first client render (hydration) matches the
  // server's — localStorage isn't readable during SSR, so this can only be
  // checked after mount, inside the effect below.
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (getAccessToken()) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above: this is the earliest point localStorage can be read, not an avoidable synchronous update.
    setIsGuest(true);
  }, [router]);

  if (!isGuest) return null;

  return <>{children}</>;
}
