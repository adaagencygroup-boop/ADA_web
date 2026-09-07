"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/src/lib/storage";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized] = useState(() =>
    typeof window === "undefined" ? false : !!getAccessToken()
  );

  useEffect(() => {
    if (!authorized) router.replace("/dang-nhap");
  }, [authorized, router]);

  if (!authorized) return null;

  return <>{children}</>;
}
