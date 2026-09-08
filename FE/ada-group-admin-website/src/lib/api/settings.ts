import apiClient, { unwrap } from "@/src/lib/api/client";
import type { PageResponse } from "@/src/lib/api/types";

export type BackupFrequency = "daily" | "weekly" | "monthly";

export type BackupStatus = "pending" | "running" | "success" | "failed";

export type BackupSchedule = {
  id: string;
  isEnabled: boolean | null;
  frequency: BackupFrequency;
  timeOfDay: string;
  dayOfWeek: number | null;
  dayOfMonth: number | null;
};

export type UpdateBackupSchedulePayload = {
  isEnabled?: boolean;
  frequency: BackupFrequency;
  timeOfDay: string;
  dayOfWeek?: number | null;
  dayOfMonth?: number | null;
};

export type BackupTriggerResult = {
  backupId: string;
  status: string;
  message: string;
};

export type BackupHistoryItem = {
  id: string;
  fileURL: string | null;
  fileSizeBytes: number | null;
  status: BackupStatus;
  errorMessage: string | null;
  startedAt: string;
  finishedAt: string | null;
};

export type GetBackupsParams = {
  page?: number;
  size?: number;
  status?: BackupStatus;
  search?: string;
  fromDate?: string;
  toDate?: string;
};

export type ExportBackupsParams = {
  status?: BackupStatus;
  search?: string;
  fromDate?: string;
  toDate?: string;
};

export function getBackupSchedule(signal?: AbortSignal) {
  return unwrap<BackupSchedule>(
    apiClient.get("/admin/settings/backupSchedule", { signal })
  );
}

export function updateBackupSchedule(payload: UpdateBackupSchedulePayload) {
  return unwrap<BackupSchedule>(
    apiClient.put("/admin/settings/backupSchedule", payload)
  );
}

export function triggerBackup() {
  return unwrap<BackupTriggerResult>(
    apiClient.post("/admin/settings/backups/trigger")
  );
}

export function getBackups(params: GetBackupsParams, signal?: AbortSignal) {
  return unwrap<PageResponse<BackupHistoryItem>>(
    apiClient.get("/admin/settings/backups", { params, signal })
  );
}

export async function exportBackupsExcel(
  params: ExportBackupsParams,
  signal?: AbortSignal
) {
  const response = await apiClient.get("/admin/settings/backups/exportExcel", {
    params,
    signal,
    responseType: "blob",
  });
  return response.data as Blob;
}

export async function downloadBackupFile(id: string) {
  const response = await apiClient.get(
    `/admin/settings/backups/${id}/download`,
    { responseType: "blob" }
  );
  const disposition = response.headers["content-disposition"] as
    | string
    | undefined;
  const match = disposition?.match(/filename="?([^"]+)"?/);
  return { blob: response.data as Blob, filename: match?.[1] ?? `backup-${id}` };
}
