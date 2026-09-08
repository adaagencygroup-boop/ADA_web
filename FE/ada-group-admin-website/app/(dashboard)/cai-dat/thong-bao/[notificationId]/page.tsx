"use client";

import { use } from "react";
import { useNotificationDetail } from "@/src/hooks/useNotifications";
import NotificationDetailView from "@/app/(dashboard)/cai-dat/thong-bao/[notificationId]/_components/NotificationDetailView";

export default function NotificationDetailPage({
  params,
}: {
  params: Promise<{ notificationId: string }>;
}) {
  const { notificationId } = use(params);
  const { data: notification, isLoading, isError } =
    useNotificationDetail(notificationId);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-[#64748B]">
        Đang tải chi tiết thông báo...
      </div>
    );
  }

  if (isError || !notification) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-600">
        Không thể tải chi tiết thông báo. Vui lòng thử lại.
      </div>
    );
  }

  return <NotificationDetailView notification={notification} />;
}
