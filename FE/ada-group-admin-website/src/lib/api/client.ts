import axios, { type AxiosResponse } from "axios";
import type { APIResponse } from "@/src/lib/api/types";

export const ACCESS_TOKEN_KEY = "accessToken";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
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
