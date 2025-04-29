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

/**
 * @description A custom React hook for searching GIFs using the GIPHY API with pagination, loading, and error state management.
 * This hook automatically fetches GIFs whenever the search query, page, or limit changes, and handles edge cases such as empty queries
 * and API errors. It is designed for seamless integration with search bars and paginated GIF galleries.
 *
 * Key Features:
 * - Fetches GIFs from the GIPHY API based on the provided search query, page, and limit.
 * - Manages loading and error states for improved user experience.
 * - Calculates and limits the total number of pages (max 50, in line with GIPHY API constraints).
 * - Handles empty queries and aborted requests gracefully.
 * - Displays user-friendly error notifications via toast messages.
 *
 * @param {string} query - The search term for querying GIFs. An empty string will reset the results.
 * @param {number} page - The current page number for pagination (1-based).
 * @param {number} [limit=10] - The number of GIFs to fetch per page (default is 10).
 *
 * @returns {UseGiphySearchResult} An object containing:
 *   - gifs: Array of GIF objects returned by the API.
 *   - loading: Boolean indicating if a fetch request is in progress.
 *   - error: Error object if the fetch fails, otherwise null.
 *   - totalPages: Total number of pages available for the current query.
 *
 * @example
 * const { gifs, loading, error, totalPages } = useGiphySearch('cats', 1, 12);
 *
 * if (loading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * return <GifGallery gifs={gifs} />;
 */
export function useGiphySearch(
  query: string,
  page: number,
  limit: number = 10
): UseGiphySearchResult {
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
          totalPages: totalPages > 50 ? 50 : totalPages,
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
