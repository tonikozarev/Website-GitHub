export type CertificateLanguage = "en" | "de" | "bg";

export interface CertificateDefinition {
  id: string;
  file: string;
  language: CertificateLanguage;
  title: string;
}

export interface UnlockResponse {
  accessToken: string;
  expiresAt: number;
  codeId: string;
  codeLabel: string;
}

const DEFAULT_API_BASE = "http://127.0.0.1:8787";
const STORAGE_ACCESS_TOKEN = "contentAccessToken";
const STORAGE_ACCESS_EXPIRES = "contentAccessExpires";

export function getApiBaseUrl() {
  return (import.meta.env.VITE_CONTENT_API_BASE_URL || DEFAULT_API_BASE).replace(/\/$/, "");
}

function headers(token?: string) {
  const result: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    result.Authorization = `Bearer ${token}`;
  }

  return result;
}

async function requestJson<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const requestHeaders = new Headers(init.headers || {});

  for (const [key, value] of Object.entries(headers(token))) {
    requestHeaders.set(key, value);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: requestHeaders,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function unlockCertificates(code: string): Promise<UnlockResponse> {
  const payload = await requestJson<UnlockResponse>("/unlock", {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  sessionStorage.setItem(STORAGE_ACCESS_TOKEN, payload.accessToken);
  sessionStorage.setItem(STORAGE_ACCESS_EXPIRES, String(payload.expiresAt));

  return payload;
}

export async function fetchCertificateCatalog(): Promise<CertificateDefinition[]> {
  const payload = await requestJson<{ certificates: CertificateDefinition[] }>("/certificates");
  return payload.certificates;
}

export function getStoredAccessToken(): string | null {
  const token = sessionStorage.getItem(STORAGE_ACCESS_TOKEN);
  const expires = Number(sessionStorage.getItem(STORAGE_ACCESS_EXPIRES) || "0");

  if (!token || !expires || Date.now() >= expires) {
    clearStoredAccessToken();
    return null;
  }

  return token;
}

export function getStoredAccessTokenExpiresAt(): number | null {
  const token = sessionStorage.getItem(STORAGE_ACCESS_TOKEN);
  const expires = Number(sessionStorage.getItem(STORAGE_ACCESS_EXPIRES) || "0");

  if (!token || !expires || Date.now() >= expires) {
    clearStoredAccessToken();
    return null;
  }

  return expires;
}

export function clearStoredAccessToken() {
  sessionStorage.removeItem(STORAGE_ACCESS_TOKEN);
  sessionStorage.removeItem(STORAGE_ACCESS_EXPIRES);
}

export function buildCertificateUrl(certificate: CertificateDefinition, accessToken: string) {
  const base = getApiBaseUrl();
  return `${base}/certificates/${encodeURIComponent(certificate.id)}?token=${encodeURIComponent(accessToken)}`;
}
