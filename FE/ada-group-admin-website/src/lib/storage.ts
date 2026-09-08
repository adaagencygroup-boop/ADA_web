// The access token is kept in memory only (never localStorage/sessionStorage):
// it never survives a full page reload, which limits how long a token stolen
// via XSS stays usable. The refresh token isn't stored on the client at all —
// the backend issues it as an httpOnly, Secure, SameSite=Strict cookie scoped
// to /api/v1/auth, so it's inaccessible to JavaScript entirely. A reload
// re-authenticates by calling refreshSession() (see api/client.ts), which
// relies on the browser sending that cookie automatically.
let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string): void {
  accessToken = token;
}

export function clearAuthTokens(): void {
  accessToken = null;
}
