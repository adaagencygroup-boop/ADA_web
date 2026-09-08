// Server-side fetches (Server Components) run inside the container and must
// reach the backend via the Docker network service name; browser fetches need
// a host-reachable URL instead. `API_BASE_URL` is a plain (non-NEXT_PUBLIC_)
// runtime env var read only on the server — e.g. http://app:8080/api/v1 in
// compose — while `NEXT_PUBLIC_API_BASE_URL` is baked into the client bundle
// at build time for the browser (e.g. http://localhost:8080/api/v1 in dev).
const API_BASE_URL =
  (typeof window === "undefined" ? process.env.API_BASE_URL : undefined) ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080/api/v1";

export type APIResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export type Pagination = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
};

export type PageResponse<T> = {
  items: T[];
  pagination: Pagination;
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function buildQuery(params?: Record<string, string | number | undefined>) {
  if (!params) return "";
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") usp.set(key, String(value));
  }
  const query = usp.toString();
  return query ? `?${query}` : "";
}

async function request<T>(
  path: string,
  init: RequestInit & { revalidate?: number | false } = {}
): Promise<T> {
  const { revalidate, ...rest } = init;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  let json: APIResponse<T> | null = null;
  try {
    json = await res.json();
  } catch {
    // No JSON body (e.g. a network-level failure page) — fall through to the status-based error below.
  }

  if (!res.ok || !json || !json.success) {
    throw new ApiError(
      json?.message || `Yêu cầu thất bại (${res.status})`,
      res.status
    );
  }

  return json.data;
}

// `revalidate` (seconds) enables Next.js ISR caching for this request when called
// from a Server Component; it's a no-op (harmlessly ignored) when called from the
// browser, e.g. from client-side search/filter handlers.
export function apiGet<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
  revalidate?: number
) {
  return request<T>(`${path}${buildQuery(params)}`, { method: "GET", revalidate });
}

export function apiPost<T>(path: string, body?: unknown) {
  return request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function apiPostForm<T>(path: string, formData: FormData) {
  return request<T>(path, { method: "POST", body: formData });
}
