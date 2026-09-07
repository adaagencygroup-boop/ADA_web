const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function getItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

function setItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}

function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

export function getAccessToken(): string | null {
  return getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  setItem(ACCESS_TOKEN_KEY, token);
}

export function getRefreshToken(): string | null {
  return getItem(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string): void {
  setItem(REFRESH_TOKEN_KEY, token);
}

export function clearAuthTokens(): void {
  removeItem(ACCESS_TOKEN_KEY);
  removeItem(REFRESH_TOKEN_KEY);
}
