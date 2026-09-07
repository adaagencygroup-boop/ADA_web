import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { APIResponse } from "@/src/lib/api/types";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/src/lib/storage";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type TokenPair = { accessToken: string; refreshToken: string };

let refreshPromise: Promise<TokenPair> | null = null;

function refreshAccessToken(): Promise<TokenPair> {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<APIResponse<TokenPair & { tokenType: string }>>(
        "/auth/refreshToken",
        { refreshToken: getRefreshToken() }
      )
      .then((res) => {
        const { accessToken, refreshToken } = res.data.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        return { accessToken, refreshToken };
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
      if (!getRefreshToken()) {
        redirectToLogin();
        return Promise.reject(new Error("Phiên đăng nhập đã hết hạn"));
      }

      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshAccessToken();
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
