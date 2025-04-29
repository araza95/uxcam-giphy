import { useSearchParams } from 'react-router-dom';

export function useSearchParamsState() {
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