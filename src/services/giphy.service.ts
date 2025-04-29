// services/giphy.service.ts
import { GiphyResponse } from "../types/giphy.type";

const BASE_URL = "https://api.giphy.com/v1/gifs/search";

// Create a map to store active request controllers
const activeRequests = new Map<string, AbortController>();

export async function searchGifs(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<GiphyResponse> {
  const offset = (page - 1) * limit;

  // Create a unique request identifier
  const requestId = `${query}-${page}-${limit}`;

  // If there's an existing request with the same ID, abort it
  if (activeRequests.has(requestId)) {
    activeRequests.get(requestId)?.abort();
    activeRequests.delete(requestId);
  }

  // Create a new AbortController for this request
  const controller = new AbortController();
  activeRequests.set(requestId, controller);

  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&rating=g&lang=en`,
      {
        signal: controller.signal,
      }
    );

    // Remove this request from active requests once completed
    activeRequests.delete(requestId);

    if (!response.ok) {
      throw new Error(`Failed to fetch GIFs: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Don't throw errors for aborted requests
    if (error instanceof DOMException && error.name === "AbortError") {
      console.log("Request was aborted", requestId);
      return {
        data: [],
        pagination: { total_count: 0, count: 0, offset: 0 },
        meta: { status: 200, msg: "OK", response_id: "" },
      };
    }

    // For other errors, throw as usual
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch GIFs"
    );
  }
}

// Optional: Function to abort all active requests (useful for cleanup)
export function abortAllRequests() {
  activeRequests.forEach((controller) => {
    controller.abort();
  });
  activeRequests.clear();
}
