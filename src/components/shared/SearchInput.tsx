import { Search, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "../ui/input";

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search handler
  const debouncedSearch = useDebounce((val) => {
    const params = new URLSearchParams(searchParams);
    if (val.trim()) {
      params.set("q", val as string);
      params.set("page", "1");
    } else {
      params.delete("q");
      params.set("page", "1");
    }
    setSearchParams(params);
  }, 300);

  // Keep input in sync with URL (for browser navigation)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== value) setValue(q);
    // eslint-disable-next-line
  }, [searchParams]);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Clear search handler
  const clearSearch = () => {
    setValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    params.set("page", "1");
    setSearchParams(params);
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-xl">
      {/* Left search icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <Search size={18} />
      </div>
      {/* Input field */}
      <Input
        ref={inputRef}
        placeholder="Search for GIFs..."
        value={value}
        onChange={handleChange}
        className="pl-10 pr-10 bg-card/50 border-accent/20 focus-visible:border-accent/50 h-12 text-secondary-foreground"
      />
      {/* Right clear (X) icon */}
      {value && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition"
          tabIndex={-1}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
