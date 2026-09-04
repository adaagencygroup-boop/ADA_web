import { Briefcase, Calendar, Users, XCircle } from "lucide-react";
import { DASHBOARD_STATS } from "@/app/(dashboard)/tuyen-dung/_components/data";

const STATS = [
  {
    label: "Tin đang tuyển",
    value: DASHBOARD_STATS.activeCount,
    icon: Briefcase,
    iconBg: "bg-[#D8E2FF]",
    iconColor: "text-[#001E4B]",
  },
  {
    label: "Tổng ứng viên",
    value: DASHBOARD_STATS.totalCandidates,
    icon: Users,
    iconBg: "bg-[#D1FAE5]",
    iconColor: "text-[#047857]",
  },
  {
    label: "Tin sắp hết hạn",
    value: DASHBOARD_STATS.closingSoonCount,
    icon: Calendar,
    iconBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
  },
  {
    label: "Tin đã đóng",
    value: DASHBOARD_STATS.closedCount,
    icon: XCircle,
    iconBg: "bg-[#FFDAD6]",
    iconColor: "text-[#BA1A1A]",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 rounded-xl border border-[#C4C6D2] bg-white px-6 py-6 shadow-xs"
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
            <span className="text-4xl font-bold tracking-tight text-[#1C1B1B]">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
