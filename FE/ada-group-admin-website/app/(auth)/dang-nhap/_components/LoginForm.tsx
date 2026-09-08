"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Unlock, User } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import PasswordField from "@/src/components/shared/PasswordField";
import { useLogin } from "@/src/hooks/useLogin";
import { getDeviceFingerprint } from "@/src/lib/device-fingerprint";
import { loginSchema, type LoginFormValues } from "@/src/lib/validations/login";

export default function LoginForm() {
  const router = useRouter();
  const { mutateAsync: login, isPending, error } = useLogin();
  const [isFingerprinting, setIsFingerprinting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "", remember: false },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsFingerprinting(true);
    const deviceFingerprint = await getDeviceFingerprint();
    setIsFingerprinting(false);

    try {
      await login({
        identifier: values.identifier,
        password: values.password,
        deviceFingerprint,
        rememberMe: values.remember,
      });
      router.push("/");
    } catch {
      // Error is already surfaced via the mutation's `error` state below.
    }
  });

  const isBusy = isFingerprinting || isPending;

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold text-[#1E293B]">Đăng nhập</h2>
        <p className="text-base text-[#64748B]">
          Vui lòng nhập thông tin tài khoản để đăng nhập
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
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
              type="text"
              placeholder="Nhập email"
              autoComplete="username"
              className="h-11.5 border-[#E2E8F0] pr-3 pl-11 text-sm text-[#1E293B] placeholder:text-[#9CA3AF] focus-visible:border-[#1A56DB]"
              {...register("identifier")}
            />
          </div>
          {errors.identifier && (
            <p className="text-sm text-red-600">{errors.identifier.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between pb-2">
          <label className="flex items-center gap-2 text-sm text-[#1E293B]">
            <input
              type="checkbox"
              className="size-4 rounded border-[#D1D5DB] text-[#1A56DB] focus:ring-[#1A56DB]"
              {...register("remember")}
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

        {error && (
          <p className="-mt-2 text-sm text-red-600">{error.message}</p>
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1A56DB] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1A56DB]/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Unlock className="size-5" />
          {isBusy ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
