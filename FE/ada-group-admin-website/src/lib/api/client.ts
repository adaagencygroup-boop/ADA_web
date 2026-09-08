import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { APIResponse } from "@/src/lib/api/types";
import { clearAuthTokens, getAccessToken, setAccessToken } from "@/src/lib/storage";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

// `withCredentials` is required on both instances: the refresh token is issued
// as an httpOnly cookie (scoped to /api/v1/auth) rather than in the response
// body, so the browser only stores/sends it on cross-origin requests that opt
// in via withCredentials.
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string> | null = null;

// Exchanges the httpOnly refresh-token cookie for a fresh access token. Shared
// (via the in-flight `refreshPromise`) between the 401-retry interceptor below
// and the RequireAuth/GuestOnly bootstrap check, since the access token now
// lives only in memory and is lost on every full page reload — there is no
// client-readable refresh token to check first, so callers just attempt this
// and treat a rejection as "not logged in".
export function refreshSession(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<APIResponse<{ accessToken: string; tokenType: string }>>(
        "/auth/refreshToken"
      )
      .then((res) => {
        const { accessToken } = res.data.data;
        setAccessToken(accessToken);
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

function redirectToLogin() {
  clearAuthTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/dang-nhap";
  }
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const isAuthEndpoint = originalRequest?.url?.includes("/auth/");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshSession();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch {
        redirectToLogin();
        return Promise.reject(new Error("Phiên đăng nhập đã hết hạn"));
      }
    }

    const message =
      error.response?.data?.message ?? error.message ?? "Đã có lỗi xảy ra";
    return Promise.reject(new Error(message));
  }
);

export function unwrap<T>(
  response: Promise<AxiosResponse<APIResponse<T>>>
): Promise<T> {
  return response.then((res) => res.data.data);
}

export default apiClient;
