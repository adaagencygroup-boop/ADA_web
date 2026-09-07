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
  const [isGuest] = useState(() =>
    typeof window === "undefined" ? false : !getAccessToken()
  );

  useEffect(() => {
    if (!isGuest) router.replace("/");
  }, [isGuest, router]);

  if (!isGuest) return null;

  return <>{children}</>;
}
