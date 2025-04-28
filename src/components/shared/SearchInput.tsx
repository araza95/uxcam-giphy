// components/shared/SearchInput.jsx
import { useSearchParams } from "react-router-dom";

import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "../ui/input";

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounce((value) => {
    setSearchParams({ q: value as string, page: "1" });
  }, 300);

  return (
    <Input
      placeholder="Search GIFs..."
      defaultValue={searchParams.get("q") || ""}
      onChange={(e) => debouncedSearch(e.target.value)}
      className="max-w-xl"
    />
  );
}
