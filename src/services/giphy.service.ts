// services/giphy.service.ts
import { GiphyResponse } from "../types/giphy.type";

const cache = new Map<
  string,
  {
    data: GiphyResponse;
    timestamp: number;
  }
>();

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * @description Fetches GIF search results from the GIPHY API with caching and pagination support.
 * This function queries the GIPHY Search endpoint using the provided search term, page number, and limit,
 * returning a structured response of GIFs and pagination data. Results are cached in-memory for one hour
 * to reduce redundant API calls and improve performance.
 *
 * Key Features:
 * - Calls the GIPHY Search API endpoint with `q`, `limit`, and `offset` parameters[1][4][5][6].
 * - Supports pagination via the `page` and `limit` arguments (offset is calculated as `(page-1) * limit`)[5][6].
 * - Uses an in-memory cache to store results for one hour per unique query-page-limit combination.
 * - Throws an error if the API response is not OK or if the network request fails.
 * - Handles API key securely via environment variable.
 *
 * @param {string} query - The search keyword or phrase to query GIFs for (sent as the `q` parameter)[1][4][5][6].
 * @param {number} [page=1] - The page number for pagination (1-based).
 * @param {number} [limit=20] - The number of GIFs to return per page (max 50 for GIPHY public API)[1][4][5].
 *
 * @returns {Promise<GiphyResponse>} The API response object containing GIF data and pagination info.
 *
 * @throws {Error} Throws if the network request fails or the API returns a non-OK response.
 *
 * @example
 * const gifs = await searchGifs("funny cats", 2, 12);
 */
export async function searchGifs(
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<GiphyResponse> {
  const requestId = `${query}-${page}-${limit}`;

  // Check cache
  const cached = cache.get(requestId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const offset = (page - 1) * limit;

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&rating=g&lang=en`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GIFs");
    }

    const data = await response.json();

    // Cache the response
    cache.set(requestId, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    throw error;
  }
}
