export const API_ORIGIN = (
  import.meta.env.VITE_API_ORIGIN ?? "http://localhost:8080"
).replace(/\/$/, "");

const BASE_URL = `${API_ORIGIN}/api/v1`;

type ApiFetchOptions = RequestInit & {
  token?: string;
};

export const apiFetch = async <T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> => {
  const { token, headers, ...fetchOptions } = options;
  const isFormData = fetchOptions.body instanceof FormData;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? `Request failed: ${response.status}`);
  }

  return data as T
};
