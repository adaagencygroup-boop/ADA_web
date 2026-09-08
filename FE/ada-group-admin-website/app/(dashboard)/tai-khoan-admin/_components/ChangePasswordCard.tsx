"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Lock, RotateCcw, X } from "lucide-react";
import PasswordField from "@/src/components/shared/PasswordField";
import { useChangePassword } from "@/src/hooks/useAccount";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/src/lib/validations/change-password";

const PASSWORD_RULES: { label: string; test: (value: string) => boolean }[] = [
  { label: "Ít nhất 8 ký tự", test: (v) => v.length >= 8 },
  { label: "Ít nhất 1 chữ hoa", test: (v) => /[A-Z]/.test(v) },
  { label: "Ít nhất 1 chữ thường", test: (v) => /[a-z]/.test(v) },
  { label: "Ít nhất 1 chữ số", test: (v) => /[0-9]/.test(v) },
  { label: "Không chứa khoảng trắng", test: (v) => v.length > 0 && !/\s/.test(v) },
];

export default function ChangePasswordCard() {
  const changePasswordMutation = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword");

  const onSubmit = handleSubmit((values) => {
    changePasswordMutation.mutate(values, {
      onSuccess: () => reset(),
    });
  });

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-6 py-5">
        <Lock className="size-5 text-[#0F172A]" />
        <h2 className="text-lg font-semibold text-[#0F172A]">Đổi mật khẩu</h2>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="current-password"
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại"
            showIcon={false}
            labelClassName="text-sm font-medium text-[#334155]"
            inputClassName="h-11"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-sm text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="new-password"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            autoComplete="new-password"
            showIcon={false}
            labelClassName="text-sm font-medium text-[#334155]"
            inputClassName="h-11"
            {...register("newPassword")}
          />
          <ul className="flex flex-col gap-1 pt-1">
            {PASSWORD_RULES.map((rule) => {
              const met = rule.test(newPasswordValue ?? "");
              return (
                <li
                  key={rule.label}
                  className={`flex items-center gap-1.5 text-xs ${
                    met ? "text-green-600" : "text-[#94A3B8]"
                  }`}
                >
                  {met ? (
                    <Check className="size-3.5 shrink-0" />
                  ) : (
                    <X className="size-3.5 shrink-0" />
                  )}
                  {rule.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="confirm-password"
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            autoComplete="new-password"
            showIcon={false}
            labelClassName="text-sm font-medium text-[#334155]"
            inputClassName="h-11"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={changePasswordMutation.isPending}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1A56DB] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1A56DB]/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw className="size-4" />
          {changePasswordMutation.isPending ? "Đang đổi..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}
