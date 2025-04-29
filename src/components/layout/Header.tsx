import { SearchInput } from "../shared/SearchInput";

export function Header({ query }: { query?: string }) {
  return (
    <header className="p-6 border-b border-border bg-sidebar">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-white">
          Giphy Explorer
        </h1>
        <SearchInput />
        {query && (
          <p className="mt-4 text-muted-foreground">
            Showing results for:{" "}
            <span className="font-medium text-accent-foreground">{query}</span>
          </p>
        )}
      </div>
    </header>
  );
}
