"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/src/components/ui/input";

export default function PasswordField() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="password" className="text-sm font-medium text-[#1E293B]">
        Mật khẩu
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-[#9CA3AF]" />
        <Input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          placeholder="Nhập mật khẩu"
          autoComplete="current-password"
          className="h-11.5 border-[#E2E8F0] pr-11 pl-11 text-sm text-[#1E293B] placeholder:text-[#9CA3AF] focus-visible:border-[#1A56DB]"
        />
        <button
          type="button"
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          onClick={() => setVisible((prev) => !prev)}
          className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#9CA3AF] hover:text-[#64748B]"
        >
          {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
    </div>
  );
}
