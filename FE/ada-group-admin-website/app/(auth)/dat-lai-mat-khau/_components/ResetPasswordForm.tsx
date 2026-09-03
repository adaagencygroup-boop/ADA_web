"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PasswordField from "@/app/(auth)/dang-nhap/_components/PasswordField";

export default function ResetPasswordForm() {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold text-[#1E3A8A]">
          Đặt lại mật khẩu mới
        </h2>
        <p className="text-base text-[#64748B]">
          Vui lòng nhập mật khẩu mới để tiếp tục truy cập vào tài khoản của
          bạn.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/dang-nhap");
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="new-password"
            name="newPassword"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            autoComplete="new-password"
          />
          <p className="text-sm text-[#64748B]">
            Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và
            số.
          </p>
        </div>

        <PasswordField
          id="confirm-password"
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu mới"
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="rounded-lg bg-[#1A56DB] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1A56DB]/90"
        >
          Lưu mật khẩu và đăng nhập
        </button>
      </form>

      <Link
        href="/dang-nhap"
        className="flex items-center justify-center gap-2 text-sm font-medium text-[#1A56DB] hover:underline"
      >
        <ArrowLeft className="size-4" />
        Quay lại đăng nhập
      </Link>
    </div>
  );
}
