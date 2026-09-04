"use client";

import { useState } from "react";
import {
  CircleAlert,
  Laptop,
  LogOut,
  Monitor,
  RefreshCw,
  Smartphone,
  TriangleAlert,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import OtpForm from "@/src/components/shared/OtpForm";

type DeviceStatus = "active" | "inactive";

type Device = {
  id: string;
  icon: typeof Monitor;
  device: string;
  current: boolean;
  location: string;
  ip: string;
  loginAt: string;
  lastActive: string;
  status: DeviceStatus;
};

const INITIAL_DEVICES: Device[] = [
  {
    id: "1",
    icon: Monitor,
    device: "Windows · Chrome 121.0",
    current: true,
    location: "Hà Nội, Việt Nam",
    ip: "14.225.***.***",
    loginAt: "20/06/2025 09:41 AM",
    lastActive: "20/06/2025 09:41 AM",
    status: "active",
  },
  {
    id: "2",
    icon: Smartphone,
    device: "iPhone 13 - Safari iOS 17",
    current: false,
    location: "TP. Hồ Chí Minh, Việt Nam",
    ip: "27.68.***.***",
    loginAt: "19/06/2025 08:15 PM",
    lastActive: "19/06/2025 08:15 PM",
    status: "active",
  },
  {
    id: "3",
    icon: Laptop,
    device: "macOS · Safari 17",
    current: false,
    location: "Đà Nẵng, Việt Nam",
    ip: "42.116.***.***",
    loginAt: "18/06/2025 10:32 AM",
    lastActive: "18/06/2025 10:32 AM",
    status: "active",
  },
  {
    id: "4",
    icon: Smartphone,
    device: "Android · Chrome 120.0",
    current: false,
    location: "Cần Thơ, Việt Nam",
    ip: "113.161.***.***",
    loginAt: "15/06/2025 07:45 PM",
    lastActive: "16/06/2025 11:20 AM",
    status: "inactive",
  },
];

const STATUS_STYLES: Record<
  DeviceStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Đang hoạt động",
    className: "bg-[#E6F4EA] text-[#137333]",
  },
  inactive: {
    label: "Không hoạt động",
    className: "bg-[#F3F4F6] text-[#4B5563]",
  },
};

type Step = "otp" | "confirm";

export default function DeviceSessionsTable() {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("otp");
  const [targetId, setTargetId] = useState<string | null>(null);

  const targetDevice = devices.find((item) => item.id === targetId) ?? null;

  function handleLogoutClick(id: string) {
    setTargetId(id);
    setStep("otp");
    setOpen(true);
  }

  function handleVerified() {
    setStep("confirm");
  }

  function handleConfirmLogout() {
    setDevices((prev) => prev.filter((item) => item.id !== targetId));
    setOpen(false);
  }

  return (
    <>
      <div className="rounded-xl border border-[#C4C6D2] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#C4C6D2] px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1C1B1B]">
            Danh sách thiết bị đăng nhập ({devices.length})
          </h2>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-semibold text-[#0054CD] hover:underline"
          >
            <RefreshCw className="size-3.5" />
            Cập nhật
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 border-collapse">
            <thead>
              <tr className="border-b border-[#C4C6D2] bg-[#F9FAFB] text-left">
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Thiết bị / Trình duyệt
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Địa điểm
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Đăng nhập lúc
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Lần hoạt động cuối
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {devices.map((item) => (
                <tr key={item.id} className="border-t border-[#C4C6D2]">
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <item.icon className="mt-0.5 size-6 shrink-0 text-[#747782]" />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold tracking-wide text-[#1C1B1B]">
                          {item.device}
                        </span>
                        {item.current && (
                          <span className="w-fit rounded bg-white px-2 py-0.5 text-xs font-medium text-[#1D4ED8] ring-1 ring-[#BFDBFE]">
                            Thiết bị hiện tại
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-[#1C1B1B]">
                        {item.location}
                      </span>
                      <span className="text-xs text-[#434750]">
                        IP: {item.ip}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-[#434750]">
                        {item.loginAt.split(" ")[0]}
                      </span>
                      <span className="text-sm text-[#434750]">
                        {item.loginAt.split(" ").slice(1).join(" ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-[#434750]">
                        {item.lastActive.split(" ")[0]}
                      </span>
                      <span className="text-sm text-[#434750]">
                        {item.lastActive.split(" ").slice(1).join(" ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span
                      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[item.status].className}`}
                    >
                      {STATUS_STYLES[item.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    {item.current ? (
                      <span className="text-[#94A3B8]">—</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleLogoutClick(item.id)}
                        className="flex items-center gap-1.5 rounded border border-[#FEE2E2] bg-white px-3 py-2 text-sm font-medium text-[#DC2626] hover:bg-red-50"
                      >
                        <LogOut className="size-3.5" />
                        Đăng xuất
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          targetDevice && (
            <DialogContent className="sm:max-w-105 rounded-xl p-6">
              <DialogTitle className="sr-only">
                Đăng xuất thiết bị này?
              </DialogTitle>

              <div className="flex flex-col items-center gap-1 pb-2 text-center">
                <CircleAlert className="mb-2 size-9.5 text-[#D97706]" />
                <p className="text-[22px] leading-7.75 font-semibold text-[#1C1B1B]">
                  Đăng xuất thiết bị này?
                </p>
                <p className="text-base leading-relaxed text-[#434750]">
                  Bạn có chắc chắn muốn đăng xuất thiết bị sau?
                </p>
              </div>

              <div className="flex items-start gap-4 rounded-lg bg-[#F6F3F2] p-4">
                <targetDevice.icon className="mt-0.5 size-6 shrink-0 text-[#747782]" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold tracking-wide text-[#1C1B1B]">
                    {targetDevice.device}
                  </span>
                  <span className="text-sm text-[#434750]">
                    {targetDevice.location}
                  </span>
                  <span className="text-sm text-[#434750]">
                    IP: {targetDevice.ip}
                  </span>
                  <span className="text-sm font-medium text-[#434750]">
                    Đã đăng nhập lúc: {targetDevice.loginAt}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm font-medium text-[#92400E]">
                <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  Sau khi đăng xuất, thiết bị này sẽ cần đăng nhập lại để truy
                  cập tài khoản.
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-[#C4C6D2] py-2.5 text-sm font-semibold tracking-wide text-[#1C1B1B] hover:bg-[#F8FAFC]"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#BA1A1A] py-2.5 text-sm font-semibold tracking-wide text-white hover:bg-[#BA1A1A]/90"
                >
                  <LogOut className="size-3.5" />
                  Đăng xuất
                </button>
              </div>
            </DialogContent>
          )
        )}
      </Dialog>
    </>
  );
}
