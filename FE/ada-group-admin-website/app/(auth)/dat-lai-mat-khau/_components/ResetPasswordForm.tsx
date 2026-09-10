"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import PasswordField from "@/src/components/shared/PasswordField";
import { resetPassword } from "@/src/lib/api/auth";

type ResetPasswordFormProps = {
  email: string;
  otp: string;
};

export default function ResetPasswordForm({
  email,
  otp,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!email || !otp) {
      setError("Phiên xác thực không hợp lệ. Vui lòng yêu cầu mã OTP mới.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setError("Mật khẩu phải gồm chữ hoa, chữ thường và số.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setIsPending(true);
    try {
      await resetPassword({ email, otp, newPassword, confirmPassword });
      setSuccess(true);
      toast.success("Đặt lại mật khẩu thành công");
      window.setTimeout(() => router.push("/dang-nhap"), 1800);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể đặt lại mật khẩu");
    } finally {
      setIsPending(false);
    }
  }

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
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="new-password"
            name="newPassword"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
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
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-green-600">
            Đặt lại mật khẩu thành công. Đang chuyển đến trang đăng nhập...
          </p>
        )}

        <button
          type="submit"
          disabled={isPending || success}
          className="rounded-lg bg-[#1A56DB] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1A56DB]/90"
        >
          {isPending ? "Đang lưu..." : "Lưu mật khẩu và đăng nhập"}
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
