// services/giphy.service.ts
import { GiphyResponse } from "../types/giphy.type";

const cache = new Map<string, {
  data: GiphyResponse;
  timestamp: number;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    throw error;
  }
}
