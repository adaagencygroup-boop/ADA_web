"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Input } from "@/src/components/ui/input";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-[#1C1B1B]">Quên mật khẩu?</h2>
        <p className="text-base text-[#434750]">
          Vui lòng nhập email đã đăng ký để nhận mã khôi phục mật khẩu.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const params = new URLSearchParams({
            email,
            next: "/dat-lai-mat-khau",
            back: "/quen-mat-khau",
          });
          router.push(`/xac-thuc-email?${params.toString()}`);
        }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-base text-[#1C1B1B]">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-[#434750]" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12.5 border-[#C4C6D2] bg-[#FCF9F8] pr-3 pl-10 text-base text-[#1C1B1B] placeholder:text-[#6B7280] focus-visible:border-[#003274]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#003274] py-3 text-base text-white shadow-sm hover:bg-[#003274]/90"
        >
          Gửi mã xác nhận
          <ArrowRight className="size-4" />
        </button>
      </form>

      <Link
        href="/dang-nhap"
        className="flex items-center justify-center gap-2 text-base text-[#001E4B] hover:underline"
      >
        <ArrowLeft className="size-3" />
        Quay lại đăng nhập
      </Link>
    </div>
  );
}
