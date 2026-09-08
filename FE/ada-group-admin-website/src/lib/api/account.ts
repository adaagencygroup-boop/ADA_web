import apiClient, { unwrap } from "@/src/lib/api/client";
import type { PageResponse } from "@/src/lib/api/types";
import type { UserProfile } from "@/src/lib/api/auth";

export type UpdateProfilePayload = {
  fullname?: string;
  phone?: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type DeviceType = "mobile" | "desktop" | "tablet";

export type Session = {
  sessionId: string;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  OS: string;
  browser: string;
  IPAddress: string;
  isCurrentSession: boolean;
  lastSeenAt: string;
  issuedAt: string;
};

export function getProfile(signal?: AbortSignal) {
  return unwrap<UserProfile>(
    apiClient.get("/admin/account/profile", { signal })
  );
}

export function updateProfile(payload: UpdateProfilePayload) {
  return unwrap<UserProfile>(apiClient.put("/admin/account/profile", payload));
}

export function changePassword(payload: ChangePasswordPayload) {
  return unwrap<void>(apiClient.patch("/admin/account/password", payload));
}

export function getSessions(signal?: AbortSignal) {
  return unwrap<Session[]>(
    apiClient.get("/admin/account/sessions", { signal })
  );
}

export function revokeSession(sessionId: string) {
  return unwrap<void>(
    apiClient.delete(`/admin/account/sessions/${sessionId}`)
  );
}

export function revokeOtherSessions() {
  return unwrap<void>(apiClient.delete("/admin/account/sessions/other"));
}

export type LoginStatus = "success" | "failed";

export type LoginHistory = {
  id: string;
  userId: string;
  sessionId: string | null;
  deviceId: string | null;
  deviceName: string | null;
  IPAddress: string | null;
  geoCountry: string | null;
  geoCity: string | null;
  isNewIP: boolean | null;
  userAgent: string | null;
  status: LoginStatus;
  failureReason: string | null;
  createdAt: string;
};

export type GetLoginHistoriesParams = {
  page?: number;
  size?: number;
  status?: LoginStatus;
  fromDate?: string;
  toDate?: string;
};

export type ExportLoginHistoriesParams = {
  status?: LoginStatus;
  fromDate?: string;
  toDate?: string;
};

export function getLoginHistories(
  params: GetLoginHistoriesParams,
  signal?: AbortSignal
) {
  return unwrap<PageResponse<LoginHistory>>(
    apiClient.get("/admin/account/loginHistories", { params, signal })
  );
}

export async function exportLoginHistoriesExcel(
  params: ExportLoginHistoriesParams,
  signal?: AbortSignal
) {
  const response = await apiClient.get(
    "/admin/account/loginHistories/exportExcel",
    { params, signal, responseType: "blob" }
  );
  return response.data as Blob;
}
