import {
  FileText,
  Megaphone,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { NotificationType } from "@/src/lib/api/notification";

export const NOTIFICATION_TYPE_META: Record<
  NotificationType,
  { label: string; icon: LucideIcon; bg: string; color: string }
> = {
  contacts: {
    label: "Liên hệ",
    icon: Megaphone,
    bg: "#DBEAFE",
    color: "#2563EB",
  },
  recruitments: {
    label: "Tuyển dụng",
    icon: Users,
    bg: "#EDE9FE",
    color: "#7C3AED",
  },
  news: {
    label: "Tin tức",
    icon: FileText,
    bg: "#DCFCE7",
    color: "#16A34A",
  },
  system: {
    label: "Hệ thống",
    icon: TriangleAlert,
    bg: "#FEF3C7",
    color: "#D97706",
  },
};

export const NOTIFICATION_TYPE_TARGET: Partial<
  Record<NotificationType, { href: string; label: string; caption: string }>
> = {
  contacts: {
    href: "/lien-he",
    label: "Đi đến quản lý liên hệ",
    caption: "Xem và phản hồi liên hệ này",
  },
  recruitments: {
    href: "/tuyen-dung/ung-vien",
    label: "Đi đến quản lý ứng viên",
    caption: "Xem danh sách ứng viên tuyển dụng",
  },
  news: {
    href: "/tin-tuc",
    label: "Đi đến quản lý tin tức",
    caption: "Xem và chỉnh sửa bài viết",
  },
};
