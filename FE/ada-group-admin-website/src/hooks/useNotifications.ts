import { useEffect } from "react";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  exportNotificationsExcel,
  getNotificationDetail,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type ExportNotificationsParams,
  type GetNotificationsParams,
  type Notification,
} from "@/src/lib/api/notification";
import { downloadBlob } from "@/src/lib/download";
import { getAccessToken } from "@/src/lib/storage";

const NOTIFICATIONS_QUERY_KEY = ["notifications"];

const SSE_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

export function useNotificationRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const eventSource = new EventSource(
      `${SSE_BASE_URL}/notifications/stream?token=${encodeURIComponent(token)}`
    );

    eventSource.addEventListener("notification", (event) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
      try {
        const notification = JSON.parse(
          (event as MessageEvent<string>).data
        ) as Notification;
        toast.message(notification.title, {
          description: notification.content,
        });
      } catch {
        // Ignore malformed realtime payloads; the invalidated query still refetches.
      }
    });

    return () => eventSource.close();
  }, [queryClient]);
}

export function useNotifications(params: GetNotificationsParams) {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: ({ signal }) => getNotifications(params, signal),
    placeholderData: keepPreviousData,
  });
}

export function useNotificationsInfinite(
  params: Omit<GetNotificationsParams, "page">
) {
  return useInfiniteQuery({
    queryKey: ["notifications", "infinite", params],
    queryFn: ({ pageParam, signal }) =>
      getNotifications({ ...params, page: pageParam }, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.isLast ? undefined : lastPage.pagination.page + 1,
  });
}

export function useNotificationDetail(id?: string) {
  return useQuery({
    queryKey: ["notifications", "detail", id],
    queryFn: ({ signal }) => getNotificationDetail(id as string, signal),
    enabled: !!id,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
      toast.success("Đã đánh dấu tất cả thông báo là đã đọc");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useExportNotificationsExcel() {
  return useMutation({
    mutationFn: (params: ExportNotificationsParams) =>
      exportNotificationsExcel(params),
    onSuccess: (blob) => {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `thong-bao-${timestamp}.xlsx`);
      toast.success("Đã xuất file Excel thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
