import { GiphyResponse } from "../types/giphy.type";

const BASE_URL = "https://api.giphy.com/v1/gifs/search";

export async function searchGifs(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<GiphyResponse> {
  const offset = (page - 1) * limit;

  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${query}&limit=${limit}&offset=${offset}&rating=g&lang=en`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch GIFs: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch GIFs"
    );
  }
}
