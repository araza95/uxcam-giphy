import { useState, useEffect } from "react";
import { searchGifs } from "../services/giphy.service";
import { GiphyGif } from "../types/giphy.type";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

interface UseGiphySearchResult {
  gifs: GiphyGif[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
}

export function useGiphySearch(query: string, page: number) {
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") || "20");

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
        const response = await searchGifs(query, page, limit);
        const totalPages = Math.ceil(response.pagination.total_count / limit);

        setResult({
          gifs: response.data,
          loading: false,
          error: null,
          totalPages: totalPages > 50 ? 50 : totalPages,
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
  }, [query, page, limit]);

  return result;
}
