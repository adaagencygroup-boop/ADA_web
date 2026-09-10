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

export type EmailRequest = {
  email: string;
};

export type VerifyOTPRequest = EmailRequest & {
  otp: string;
};

export type ResetPasswordRequest = VerifyOTPRequest & {
  newPassword: string;
  confirmPassword: string;
};

export function login(payload: LoginRequest) {
  return unwrap<LoginResponse>(apiClient.post("/auth/login", payload));
}

export function forgotPassword(payload: EmailRequest) {
  return unwrap<void>(apiClient.post("/auth/forgotPassword", payload));
}

export function verifyOTP(payload: VerifyOTPRequest) {
  return unwrap<void>(apiClient.post("/auth/verifyOTP", payload));
}

export function resetPassword(payload: ResetPasswordRequest) {
  return unwrap<void>(apiClient.post("/auth/resetPassword", payload));
}

export function logout() {
  return unwrap<void>(apiClient.post("/auth/logout"));
}
