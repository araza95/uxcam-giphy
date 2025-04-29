// components/shared/SearchInput.jsx
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "../ui/input";

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounce((value) => {
    setSearchParams({ q: value as string, page: "1" });
  }, 300);

  const clearSearch = () => {
    setSearchParams({ q: "" });
  };
  return (
    <div className="relative max-w-xl">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search size={18} />
      </div>
      <Input
        placeholder="Search for GIFs..."
        defaultValue={searchParams.get("q") || ""}
        onChange={(e) => debouncedSearch(e.target.value)}
        className="pl-10 bg-card/50 border-accent/20 focus-visible:border-accent/50 h-12 text-secondary-foreground"
        icon={<X className="h-5 w-5 text-muted-foreground" size={18} />}
        iconposition="right"
        onClickIcon={clearSearch}
      />
    </div>
  );
}
