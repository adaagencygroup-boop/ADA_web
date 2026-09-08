"use client";

import Link from "next/link";
import { Briefcase, Calendar, Eye, Users, XCircle } from "lucide-react";
import { useRecruitmentDashboardMetrics } from "@/src/hooks/useRecruitments";

export default function StatsGrid() {
  const { data, isLoading } = useRecruitmentDashboardMetrics();

  const STATS = [
    {
      label: "Tin đang tuyển",
      value: data?.activeCount ?? 0,
      icon: Briefcase,
      iconBg: "bg-[#D8E2FF]",
      iconColor: "text-[#001E4B]",
    },
    {
      label: "Tổng ứng viên",
      value: data?.totalCandidatesCount ?? 0,
      icon: Users,
      iconBg: "bg-[#D1FAE5]",
      iconColor: "text-[#047857]",
      href: "/tuyen-dung/ung-vien",
    },
    {
      label: "Tin sắp hết hạn",
      value: data?.expiringSoonCount ?? 0,
      icon: Calendar,
      iconBg: "bg-[#FFEDD5]",
      iconColor: "text-[#EA580C]",
    },
    {
      label: "Tin đã đóng",
      value: data?.closedCount ?? 0,
      icon: XCircle,
      iconBg: "bg-[#FFDAD6]",
      iconColor: "text-[#BA1A1A]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="relative flex items-center gap-4 rounded-xl border border-[#C4C6D2] bg-white px-6 py-6 shadow-xs"
        >
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
          >
            <stat.icon className={`size-5.5 ${stat.iconColor}`} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#434750]">
              {stat.label}
            </span>
            <span className="text-4xl font-semibold tracking-tight text-[#1C1B1B]">
              {isLoading ? "—" : stat.value}
            </span>
          </div>
          {stat.href && (
            <Link
              href={stat.href}
              aria-label={`Xem ${stat.label.toLowerCase()}`}
              className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1C1B1B]"
            >
              <Eye className="size-4" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
