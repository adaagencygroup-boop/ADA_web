"use client";

import { Lock, RotateCcw } from "lucide-react";
import PasswordField from "@/src/components/shared/PasswordField";

export default function ChangePasswordCard() {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-6 py-5">
        <Lock className="size-5 text-[#0F172A]" />
        <h2 className="text-lg font-semibold text-[#0F172A]">Đổi mật khẩu</h2>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-5 p-6"
      >
        <PasswordField
          id="current-password"
          name="currentPassword"
          label="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu hiện tại"
          showIcon={false}
          labelClassName="text-sm font-medium text-[#334155]"
          inputClassName="h-11"
        />
        <PasswordField
          id="new-password"
          name="newPassword"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          autoComplete="new-password"
          showIcon={false}
          labelClassName="text-sm font-medium text-[#334155]"
          inputClassName="h-11"
        />
        <PasswordField
          id="confirm-password"
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          autoComplete="new-password"
          showIcon={false}
          labelClassName="text-sm font-medium text-[#334155]"
          inputClassName="h-11"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1A56DB] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1A56DB]/90"
        >
          <RotateCcw className="size-4" />
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}
