"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  History,
  LogOut,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { Switch } from "@/src/components/ui/switch";
import OtpForm from "@/src/components/shared/OtpForm";

type Step = "otp" | "success";

const SUCCESS_COPY = {
  on: {
    title: "Đã bật tính năng xác thực email khi đăng nhập",
    description: "Tài khoản của bạn sẽ yêu cầu xác thực email khi đăng nhập.",
  },
  off: {
    title: "Đã tắt tính năng xác thực email khi đăng nhập",
    description:
      "Tài khoản của bạn sẽ không yêu cầu xác thực email khi đăng nhập nữa.",
  },
};

export default function AccountSecurityCard() {
  const [emailVerificationEnabled, setEmailVerificationEnabled] =
    useState(true);
  const [pendingValue, setPendingValue] = useState(emailVerificationEnabled);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("otp");

  useEffect(() => {
    if (step !== "success" || !open) return;
    const timer = setTimeout(() => setOpen(false), 2500);
    return () => clearTimeout(timer);
  }, [step, open]);

  function handleToggle(next: boolean) {
    setPendingValue(next);
    setStep("otp");
    setOpen(true);
  }

  function handleVerified() {
    setEmailVerificationEnabled(pendingValue);
    setStep("success");
  }

  const successCopy = SUCCESS_COPY[pendingValue ? "on" : "off"];

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-6 py-5">
        <Shield className="size-5 text-[#0F172A]" />
        <h2 className="text-lg font-semibold text-[#0F172A]">
          Bảo mật tài khoản
        </h2>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#0F172A]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#0F172A]">
                Xác thực email khi đăng nhập
              </span>
              <span className="text-sm text-[#64748B]">
                Tăng cường bảo mật cho tài khoản của bạn
              </span>
            </div>
          </div>
          <Switch
            checked={emailVerificationEnabled}
            onCheckedChange={handleToggle}
          />
        </div>

        <div className="border-t border-[#E2E8F0]" />

        <Link
          href="/tai-khoan-admin/lich-su-dang-nhap"
          className="flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F8FAFC]"
        >
          <div className="flex items-start gap-3">
            <History className="mt-0.5 size-5 shrink-0 text-[#0F172A]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#0F172A]">
                Lịch sử đăng nhập
              </span>
              <span className="text-sm text-[#64748B]">
                Xem lịch sử các lần đăng nhập tài khoản
              </span>
            </div>
          </div>
          <ChevronRight className="size-5 shrink-0 text-[#94A3B8]" />
        </Link>

        <div className="border-t border-[#E2E8F0] p-6">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="size-4" />
            Đăng xuất
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {step === "otp" ? (
          <DialogContent
            showCloseButton={false}
            className="w-fit max-w-[calc(100%-2rem)] border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-md"
          >
            <DialogTitle className="sr-only">Xác thực email</DialogTitle>
            <OtpForm
              email="admin@adagroup.vn"
              onVerified={handleVerified}
              onBack={() => setOpen(false)}
            />
          </DialogContent>
        ) : (
          <DialogContent
            showCloseButton={false}
            className="w-full max-w-md rounded-2xl border-none bg-[#F0FDF4] p-10 text-center shadow-none ring-0"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-white shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-full bg-green-600">
                  <Check className="size-7 text-white" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-semibold text-[#0F172A]">
                {successCopy.title}
              </DialogTitle>
              <p className="text-[#64748B]">{successCopy.description}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
