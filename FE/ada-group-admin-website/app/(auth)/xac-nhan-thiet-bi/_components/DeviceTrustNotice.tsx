"use client";

import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

export default function DeviceTrustNotice() {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-10 text-center">
      <span className="text-sm font-semibold text-red-600">Thông báo</span>
      <TriangleAlert className="size-8 text-red-600" />
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-[#1E293B]">
          Bạn chưa tin tưởng thiết bị này
        </h1>
        <p className="text-sm text-[#64748B]">
          Ở lần đăng nhập tiếp theo, bạn sẽ cần nhập mã xác thực.
        </p>
      </div>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="w-full rounded-lg bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-600/90"
      >
        Đã hiểu
      </button>
    </div>
  );
}
