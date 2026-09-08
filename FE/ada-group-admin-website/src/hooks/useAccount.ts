import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  changePassword,
  exportLoginHistoriesExcel,
  getLoginHistories,
  getProfile,
  getSessions,
  revokeOtherSessions,
  revokeSession,
  updateProfile,
  type ChangePasswordPayload,
  type ExportLoginHistoriesParams,
  type GetLoginHistoriesParams,
  type UpdateProfilePayload,
} from "@/src/lib/api/account";
import { downloadBlob } from "@/src/lib/download";

const PROFILE_QUERY_KEY = ["account", "profile"];
const SESSIONS_QUERY_KEY = ["account", "sessions"];

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: ({ signal }) => getProfile(signal),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      toast.success("Đã cập nhật thông tin cá nhân");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: () => toast.success("Đã đổi mật khẩu thành công"),
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useSessions() {
  return useQuery({
    queryKey: SESSIONS_QUERY_KEY,
    queryFn: ({ signal }) => getSessions(signal),
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      toast.success("Đã đăng xuất thiết bị");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useRevokeOtherSessions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => revokeOtherSessions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      toast.success("Đã đăng xuất tất cả thiết bị khác");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useLoginHistories(params: GetLoginHistoriesParams) {
  return useQuery({
    queryKey: ["account", "loginHistories", params],
    queryFn: ({ signal }) => getLoginHistories(params, signal),
    placeholderData: keepPreviousData,
  });
}

export function useExportLoginHistoriesExcel() {
  return useMutation({
    mutationFn: (params: ExportLoginHistoriesParams) =>
      exportLoginHistoriesExcel(params),
    onSuccess: (blob) => {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `lich-su-dang-nhap-${timestamp}.xlsx`);
      toast.success("Đã xuất file Excel thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
