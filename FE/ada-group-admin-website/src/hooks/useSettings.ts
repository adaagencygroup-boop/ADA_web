import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  downloadBackupFile,
  exportBackupsExcel,
  getBackups,
  getBackupSchedule,
  triggerBackup,
  updateBackupSchedule,
  type ExportBackupsParams,
  type GetBackupsParams,
  type UpdateBackupSchedulePayload,
} from "@/src/lib/api/settings";
import { downloadBlob } from "@/src/lib/download";

const SCHEDULE_QUERY_KEY = ["backup-schedule"];
const BACKUPS_QUERY_KEY = ["backups"];

export function useBackupSchedule() {
  return useQuery({
    queryKey: SCHEDULE_QUERY_KEY,
    queryFn: ({ signal }) => getBackupSchedule(signal),
  });
}

export function useUpdateBackupSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateBackupSchedulePayload) =>
      updateBackupSchedule(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEY });
      toast.success("Đã lưu cài đặt sao lưu tự động");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useTriggerBackup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => triggerBackup(),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: BACKUPS_QUERY_KEY });
      toast.success(result.message || "Đã bắt đầu sao lưu");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useBackups(params: GetBackupsParams) {
  return useQuery({
    queryKey: ["backups", params],
    queryFn: ({ signal }) => getBackups(params, signal),
    placeholderData: keepPreviousData,
  });
}

export function useExportBackupsExcel() {
  return useMutation({
    mutationFn: (params: ExportBackupsParams) => exportBackupsExcel(params),
    onSuccess: (blob) => {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `lich-su-sao-luu-${timestamp}.xlsx`);
      toast.success("Đã xuất file Excel thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDownloadBackupFile() {
  return useMutation({
    mutationFn: (id: string) => downloadBackupFile(id),
    onSuccess: ({ blob, filename }) => downloadBlob(blob, filename),
    onError: (error: Error) => toast.error(error.message),
  });
}
