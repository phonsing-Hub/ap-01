import { useAuth } from "@/lib/auth/AuthContext";

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_IMG_URL = process.env.NEXT_PUBLIC_API_IMG;

export function useFetchApi() {
  const { token } = useAuth();

  const ApiCall = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${BASE_API_URL}${endpoint}`;
    
    // Use the Headers constructor for robust handling of different formats.
    const headers = new Headers(options.headers);

    // Add the Authorization token using .set()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // Conditionally handle the Content-Type header
    if (options.body instanceof FormData) {
      // For file uploads, delete the Content-Type to let the browser set it.
      headers.delete('Content-Type');
    } else if (!headers.has('Content-Type')) {
      // For other requests, default to JSON if no Content-Type is already set.
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
      ...options,
      headers, // Use the new Headers object
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        return response.json();
    }
    
    return null;
  };

  return ApiCall;
}