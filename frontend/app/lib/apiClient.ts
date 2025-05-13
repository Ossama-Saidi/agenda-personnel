// abstraction axios/fetch
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const contentType = res.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    // Return nothing if no JSON (e.g., 201 Created with no content)
    return {} as T;
  }
}
