import { useSearchParams } from "react-router-dom";

/**
 * @description A custom React hook for managing URL search parameters with type-safe updates and batch operations.
 * This hook provides a simplified interface for reading, updating, and deleting multiple search parameters
 * while maintaining synchronization with the browser's URL.
 *
 * Key Features:
 * - Automatic synchronization with URL search parameters
 * - Batch update/delete operations for multiple parameters
 * - Type-safe parameter handling with null support for deletions
 * - React Router integration through `useSearchParams`
 *
 * @returns {Object} An object containing:
 *   - params: URLSearchParams - Current search parameters object
 *   - updateParams: (updates: Record<string, string | null>) => void - Batch update/delete parameters
 *   - getParam: (key: string) => string | null - Get individual parameter value
 *
 * @example
 * // In component:
 * const { params, updateParams, getParam } = useSearchParamsState();
 *
 * // Update multiple parameters
 * updateParams({ page: '2', filter: 'active' });
 *
 * // Delete a parameter
 * updateParams({ expiredFilter: null });
 *
 * // Get specific parameter
 * const currentPage = getParam('page');
 */
export function useSearchParamsState(): {
  params: URLSearchParams;
  updateParams: (updates: Record<string, string | null>) => void;
  getParam: (key: string) => string | null;
} {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  return {
    params: searchParams,
    updateParams,
    getParam: (key: string) => searchParams.get(key),
  };
}
