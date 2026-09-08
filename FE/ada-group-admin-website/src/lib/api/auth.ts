import apiClient, { unwrap } from "@/src/lib/api/client";

export type UserRole = "admin" | "staff";

export type UserProfile = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  phone: string | null;
  role: UserRole;
  emailVerifiedAt: string | null;
  createdAt: string;
};

export type LoginRequest = {
  identifier: string;
  password: string;
  deviceFingerprint: string;
  deviceName?: string;
  deviceType?: "mobile" | "desktop" | "tablet";
  rememberMe?: boolean;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  user: UserProfile;
};

export function login(payload: LoginRequest) {
  return unwrap<LoginResponse>(apiClient.post("/auth/login", payload));
}

export function logout() {
  return unwrap<void>(apiClient.post("/auth/logout"));
}
