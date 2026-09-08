"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Briefcase, FileText, Mail } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useProfile } from "@/src/hooks/useAccount";
import { useDashboard } from "@/src/hooks/useDashboard";
import type { DashboardRange } from "@/src/lib/api/dashboard";

const RANGE_OPTIONS: { value: DashboardRange; label: string }[] = [
  { value: "7d", label: "7 ngày" },
  { value: "30d", label: "30 ngày" },
  { value: "90d", label: "3 tháng" },
];

const DONUT_COLORS = ["#316EE9", "#22C55E", "#A855F7", "#F59E0B", "#94A3B8"];

function formatAxisDate(dateStr: string) {
  const [, month, day] = dateStr.split("-");
  return `${day}/${month}`;
}

export default function DashboardOverview() {
  const [range, setRange] = useState<DashboardRange>("7d");
  const { data: profile } = useProfile();
  const { data, isLoading, isError, error } = useDashboard(range);

  const today = new Date().toLocaleDateString("vi-VN");
  const contactStats = data?.contactStats ?? [];
  const topRecruitments = data?.topRecruitments ?? [];
  const topNews = data?.topNews ?? [];

  const totalRecruitmentViews = topRecruitments.reduce(
    (sum, item) => sum + item.viewCount,
    0
  );

  const donutData =
    totalRecruitmentViews > 0
      ? topRecruitments.map((item) => ({
          name: item.jobTitle,
          value: item.percentage,
        }))
      : topRecruitments.length > 0
        ? [{ name: "Chưa có lượt xem", value: 1 }]
        : [];

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">Dashboard</h1>
          <p className="text-[#6B7280]">
            Xin chào, {profile?.fullname || "Admin"}! Chúc bạn một ngày làm
            việc hiệu quả.
          </p>
        </div>
        <div className="flex h-11 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm text-[#374151] shadow-xs">
          Hôm nay: {today}
        </div>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error?.message ?? "Đã có lỗi xảy ra khi tải dữ liệu dashboard."}
        </div>
      )}

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FileText className="size-5 text-[#316EE9]" />}
          iconBg="bg-[#DBEAFE]"
          label="Tin tức"
          value={data?.totalNews}
          isLoading={isLoading}
          caption="Tổng bài viết"
          href="/tin-tuc"
        />
        <StatCard
          icon={<Briefcase className="size-5 text-[#7C3AED]" />}
          iconBg="bg-[#EDE9FE]"
          label="Tuyển dụng"
          value={data?.totalRecruitments}
          isLoading={isLoading}
          caption="Tin tuyển dụng"
          href="/tuyen-dung"
        />
        <StatCard
          icon={<Mail className="size-5 text-[#D97706]" />}
          iconBg="bg-[#FEF3C7]"
          label="Liên hệ"
          value={data?.totalContacts}
          isLoading={isLoading}
          caption="Liên hệ mới"
          href="/lien-he"
        />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1C1B1B]">
              <BarChart3 className="size-5" />
              Thống kê liên hệ
            </h2>
            <div className="flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-1">
              {RANGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRange(option.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                    range === option.value
                      ? "bg-white text-[#1C1B1B] shadow-xs"
                      : "text-[#6B7280] hover:text-[#1C1B1B]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-80 w-full min-w-0">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-[#6B7280]">
                Đang tải...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={contactStats}>
                  <defs>
                    <linearGradient id="contactFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#316EE9" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#316EE9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatAxisDate}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    labelFormatter={(label) => formatAxisDate(String(label))}
                    formatter={(value) => [value, "Liên hệ"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#316EE9"
                    strokeWidth={2}
                    fill="url(#contactFill)"
                    dot={{ r: 3, fill: "#316EE9" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
        <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
          <h2 className="text-lg font-semibold text-[#1C1B1B]">
            Tin tuyển dụng được xem nhiều nhất
          </h2>

          {isLoading ? (
            <div className="flex h-40 items-center justify-center text-sm text-[#6B7280]">
              Đang tải...
            </div>
          ) : donutData.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-sm text-[#6B7280]">
              Chưa có dữ liệu.
            </div>
          ) : (
            <div className="flex min-w-0 items-center gap-6">
              <div className="h-40 w-40 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      dataKey="value"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={totalRecruitmentViews > 0 ? 2 : 0}
                      stroke="none"
                      isAnimationActive={false}
                    >
                      {donutData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={
                            totalRecruitmentViews > 0
                              ? DONUT_COLORS[index % DONUT_COLORS.length]
                              : "#E5E7EB"
                          }
                        />
                      ))}
                    </Pie>
                    {totalRecruitmentViews > 0 && (
                      <Tooltip formatter={(value) => `${value}%`} />
                    )}
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="flex min-w-0 flex-1 flex-col gap-2.5">
                {topRecruitments.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-[#374151]">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            DONUT_COLORS[index % DONUT_COLORS.length],
                        }}
                      />
                      <span className="truncate">{item.jobTitle}</span>
                    </span>
                    <span className="shrink-0 font-semibold text-[#1C1B1B]">
                      {item.percentage}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
          <h2 className="text-lg font-semibold text-[#1C1B1B]">
            Top tin tức được xem nhiều
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {isLoading ? (
              <li className="text-sm text-[#6B7280]">Đang tải...</li>
            ) : topNews.length === 0 ? (
              <li className="text-sm text-[#6B7280]">Chưa có dữ liệu.</li>
            ) : (
              topNews.map((item, index) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex min-w-0 items-center gap-2 text-[#374151]">
                    <span className="shrink-0 font-medium text-[#6B7280]">
                      {index + 1}.
                    </span>
                    <span className="truncate">{item.title}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-[#1C1B1B]">
                    {item.viewCount.toLocaleString("vi-VN")}
                  </span>
                </li>
              ))
            )}
          </ul>
          <Link
            href="/tin-tuc"
            className="mt-4 inline-block text-sm font-medium text-[#316EE9] hover:underline"
          >
            Xem báo cáo chi tiết →
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  iconBg,
  label,
  value,
  isLoading,
  caption,
  href,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: number | undefined;
  isLoading: boolean;
  caption: string;
  href: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
      <div
        className={`flex size-11 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-[#6B7280]">{label}</span>
        <span className="text-2xl font-semibold text-[#1C1B1B]">
          {isLoading ? "—" : (value ?? 0)}
        </span>
        <span className="text-sm text-[#9CA3AF]">{caption}</span>
      </div>
      <Link
        href={href}
        className="text-sm font-medium text-[#316EE9] hover:underline"
      >
        Xem chi tiết →
      </Link>
    </div>
  );
}
