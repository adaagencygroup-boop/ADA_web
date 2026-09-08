import apiClient, { unwrap } from "@/src/lib/api/client";
import type { Pagination } from "@/src/lib/api/types";

export type NotificationType = "system" | "contacts" | "recruitments" | "news";

export type Notification = {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
};

export type NotificationListResult = {
  items: Notification[];
  unreadCount: number;
  pagination: Pagination;
};

export type GetNotificationsParams = {
  page?: number;
  size?: number;
  type?: NotificationType;
  isRead?: boolean;
  search?: string;
  fromDate?: string;
  toDate?: string;
};

export type ExportNotificationsParams = {
  type?: NotificationType;
  isRead?: boolean;
  search?: string;
  fromDate?: string;
  toDate?: string;
};

export type NotificationReadResult = {
  id: string;
  isRead: boolean;
  readAt: string;
};

export function getNotifications(
  params: GetNotificationsParams,
  signal?: AbortSignal
) {
  return unwrap<NotificationListResult>(
    apiClient.get("/notifications", { params, signal })
  );
}

export function getNotificationDetail(id: string, signal?: AbortSignal) {
  return unwrap<Notification>(
    apiClient.get(`/notifications/${id}`, { signal })
  );
}

export function markNotificationAsRead(id: string) {
  return unwrap<NotificationReadResult>(
    apiClient.patch(`/notifications/${id}/read`)
  );
}

export function markAllNotificationsAsRead() {
  return unwrap<void>(apiClient.patch("/notifications/markAllRead"));
}

export async function exportNotificationsExcel(
  params: ExportNotificationsParams,
  signal?: AbortSignal
) {
  const response = await apiClient.get("/notifications/exportExcel", {
    params,
    signal,
    responseType: "blob",
  });
  return response.data as Blob;
}
