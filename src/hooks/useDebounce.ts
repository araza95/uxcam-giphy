import { useCallback, useRef } from "react";

/**
 * @description A custom React hook that debounces function execution to prevent rapid fires,
 * delaying invocation until a specified time has elapsed since the last call.
 *
 * Key Features:
 * - Type-safe parameter handling with TypeScript generics
 * - Automatic cancellation of pending executions on subsequent calls
 * - Preserves original function signature and parameters
 * - Uses stable references with React hooks for consistent behavior
 *
 * @template T - Type extending function signature for callback type safety
 * @param {T} callback - Function to debounce
 * @param {number} delay - Debounce delay in milliseconds
 *
 * @returns {(...args: Parameters<T>) => void} Debounced function with identical parameters
 *
 * @example
 * // Debounce search input handler with 300ms delay
 * const debouncedSearch = useDebounce((query) => {
 *   api.search(query);
 * }, 300);
 *
 * <input onChange={(e) => debouncedSearch(e.target.value)} />
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
