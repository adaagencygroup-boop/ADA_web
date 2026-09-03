"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";

const OTP_LENGTH = 6;
const EXPIRES_IN_SECONDS = 5 * 60;
const RESEND_COOLDOWN_SECONDS = 60;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

type OtpFormProps = {
  email: string;
  nextHref: string;
  backHref: string;
};

export default function OtpForm({ email, nextHref, backHref }: OtpFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [expiresIn, setExpiresIn] = useState(EXPIRES_IN_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(
    RESEND_COOLDOWN_SECONDS
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setExpiresIn((seconds) => (seconds > 0 ? seconds - 1 : 0));
      setResendCooldown((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleResend() {
    if (resendCooldown > 0) return;
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setExpiresIn(EXPIRES_IN_SECONDS);
    setOtp("");
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center rounded-lg border border-[#E2E8F0] bg-white p-10 shadow-sm">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-[#EFF6FF]">
        <Mail className="size-8 text-[#1A56DB]" />
      </div>

      <h1 className="mb-3 text-2xl font-semibold text-[#1E293B]">
        Xác thực email
      </h1>

      <p className="mb-8 text-center text-sm leading-6 text-[#64748B]">
        Chúng tôi đã gửi mã xác thực 6 số đến email
        <br />
        <span className="font-semibold text-[#1E293B]">{email}</span>
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push(nextHref);
        }}
        className="flex w-full flex-col items-center"
      >
        <div className="mb-6">
          <InputOTP maxLength={OTP_LENGTH} value={otp} onChange={setOtp}>
            <InputOTPGroup className="gap-2">
              {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-14 w-12 rounded-lg border border-[#E2E8F0] text-xl font-semibold text-[#6B7280] data-[active=true]:border-[#1A56DB] data-[active=true]:ring-0"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="mb-10 text-sm text-[#64748B]">
          Mã sẽ hết hạn sau{" "}
          <span className="font-medium text-red-500">
            {formatTime(expiresIn)}
          </span>
        </p>

        <p className="mb-4 text-sm text-[#64748B]">
          Chưa nhận được mã?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="font-medium text-[#64748B] enabled:text-[#1A56DB] enabled:hover:underline disabled:cursor-not-allowed"
          >
            Gửi lại{resendCooldown > 0 ? ` (${resendCooldown}s)` : ""}
          </button>
        </p>

        <button
          type="submit"
          className="mb-4 w-full rounded-lg bg-[#1A56DB] py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#1A56DB]/90"
        >
          Xác thực
        </button>
      </form>

      <Link
        href={backHref}
        className="text-sm font-medium text-[#1A56DB] hover:underline"
      >
        Quay lại
      </Link>
    </div>
  );
}
