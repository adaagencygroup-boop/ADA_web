"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { useProfile, useUpdateProfile } from "@/src/hooks/useAccount";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/src/lib/validations/profile";

export default function PersonalInfoCard() {
  const { data: profile } = useProfile();
  const updateMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullname: "", phone: "" },
    values: profile
      ? { fullname: profile.fullname, phone: profile.phone ?? "" }
      : undefined,
  });

  const onSubmit = handleSubmit((values) => {
    updateMutation.mutate({
      fullname: values.fullname,
      phone: values.phone || undefined,
    });
  });

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="border-b border-[#E2E8F0] px-6 py-5">
        <h2 className="text-xl font-semibold text-[#0F172A]">Thông tin cá nhân</h2>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-[#334155]"
            >
              Họ và tên
            </label>
            <Input
              id="fullName"
              className="h-11 border-[#E2E8F0]"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p className="text-sm text-red-600">{errors.fullname.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#334155]"
            >
              Email
            </label>
            <Input
              id="email"
              value={profile?.email ?? ""}
              disabled
              readOnly
              className="h-11 border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-[#334155]"
            >
              Số điện thoại
            </label>
            <Input
              id="phone"
              className="h-11 border-[#E2E8F0]"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-[#334155]"
            >
              Tên đăng nhập
            </label>
            <Input
              id="username"
              value={profile?.username ?? ""}
              disabled
              readOnly
              className="h-11 border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="flex items-center gap-2 rounded-lg bg-[#0B1B3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B1B3A]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-4" />
            {updateMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
