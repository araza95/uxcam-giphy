import { GiphyResponse } from "../types/giphy.type";

const API_KEY = process.env.GIPHY_API_KEY;
const BASE_URL = "https://api.giphy.com/v1/gifs/search";

export async function searchGifs(
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<GiphyResponse> {
  const offset = (page - 1) * limit;

  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch GIFs"
    );
  }
}
