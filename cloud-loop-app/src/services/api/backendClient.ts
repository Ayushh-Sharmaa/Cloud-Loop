/**
 * @file backendClient.ts
 * @description Secure server-to-server HTTP client for the FastAPI Python Backend.
 * Handles automatic fallback if the local Python process is starting up or in serverless deployment.
 */

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || "http://127.0.0.1:8000";

export async function fetchFromBackend<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
  const url = `${FASTAPI_URL}${path.startsWith("/") ? path : `/${path}`}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errText = await res.text();
      return { data: null, error: errText || `Backend responded with ${res.status}`, status: res.status };
    }

    const json = (await res.json()) as T;
    return { data: json, error: null, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to connect to Python backend";
    return { data: null, error: message, status: 503 };
  }
}

