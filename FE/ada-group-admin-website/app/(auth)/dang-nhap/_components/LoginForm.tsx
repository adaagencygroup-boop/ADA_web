"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Unlock, User } from "lucide-react";
import PasswordField from "@/app/(auth)/dang-nhap/_components/PasswordField";
import { Input } from "@/src/components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold text-[#1E293B]">Đăng nhập</h2>
        <p className="text-base text-[#64748B]">
          Vui lòng nhập thông tin tài khoản để đăng nhập
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const params = new URLSearchParams({
            email,
            next: "/xac-nhan-thiet-bi",
            back: "/dang-nhap",
          });
          router.push(`/xac-thuc-email?${params.toString()}`);
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="identifier"
            className="text-sm font-medium text-[#1E293B]"
          >
            Email
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-[#9CA3AF]" />
            <Input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Nhập email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11.5 border-[#E2E8F0] pr-3 pl-11 text-sm text-[#1E293B] placeholder:text-[#9CA3AF] focus-visible:border-[#1A56DB]"
            />
          </div>
        </div>

        <PasswordField />

        <div className="flex items-center justify-between pb-2">
          <label className="flex items-center gap-2 text-sm text-[#1E293B]">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded border-[#D1D5DB] text-[#1A56DB] focus:ring-[#1A56DB]"
            />
            Ghi nhớ đăng nhập
          </label>
          <Link
            href="/quen-mat-khau"
            className="text-sm font-medium text-[#1A56DB] hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1A56DB] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1A56DB]/90"
        >
          <Unlock className="size-5" />
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
