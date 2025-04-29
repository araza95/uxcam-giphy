// hooks/useGiphySearch.ts
import { useState, useEffect } from "react";
import { searchGifs } from "../services/giphy.service";
import { GiphyGif } from "../types/giphy.type";
import { toast } from "react-hot-toast";

interface UseGiphySearchResult {
  gifs: GiphyGif[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
}

export function useGiphySearch(
  query: string,
  page: number,
  limit: number = 10
) {
  const [result, setResult] = useState<UseGiphySearchResult>({
    gifs: [],
    loading: false,
    error: null,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchGifs = async () => {
      if (!query.trim()) {
        setResult((prev) => ({
          ...prev,
          gifs: [],
          totalPages: 0,
          loading: false,
        }));
        return;
      }

      setResult((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await searchGifs(query, page, limit);

        // Check if we got an empty response due to aborted request
        if (
          response.pagination.total_count === 0 &&
          response.data.length === 0 &&
          !query.trim()
        ) {
          return; // Don't update state for aborted requests
        }

        const totalPages = Math.ceil(response.pagination.total_count / limit);

        setResult({
          gifs: response.data,
          loading: false,
          error: null,
          totalPages: totalPages > 50 ? 50 : totalPages, // Giphy limits to 4999 results
        });
      } catch (error) {
        // Only show error toast for non-aborted requests
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch GIFs";
          toast.error(errorMessage);
          setResult((prev) => ({
            ...prev,
            loading: false,
            error: error as Error,
          }));
        }
      }
    };

    fetchGifs();
  }, [query, page, limit]);

  return result;
}
