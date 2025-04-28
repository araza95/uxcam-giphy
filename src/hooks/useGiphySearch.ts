import { useState, useEffect } from "react";
import { searchGifs } from "@/services/giphy";
import { GiphyGif, GiphyResponse } from "@/types/giphy";
import { toast } from "react-hot-toast";

interface UseGiphySearchResult {
  gifs: GiphyGif[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
}

export function useGiphySearch(query: string, page: number) {
  const [result, setResult] = useState<UseGiphySearchResult>({
    gifs: [],
    loading: false,
    error: null,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchGifs = async () => {
      if (!query.trim()) {
        setResult((prev) => ({ ...prev, gifs: [], totalPages: 0 }));
        return;
      }

      setResult((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await searchGifs(query, page);
        const totalPages = Math.ceil(response.pagination.total_count / 20);

        setResult({
          gifs: response.data,
          loading: false,
          error: null,
          totalPages: totalPages > 50 ? 50 : totalPages, // Giphy limits to 4999 results
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch GIFs";
        toast.error(errorMessage);
        setResult((prev) => ({
          ...prev,
          loading: false,
          error: error as Error,
        }));
      }
    };

    fetchGifs();
  }, [query, page]);

  return result;
}
