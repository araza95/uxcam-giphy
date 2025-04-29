import { useSearchParams } from "react-router-dom";
import { SearchInput } from "./components/shared/SearchInput";
import { useGiphySearch } from "./hooks/useGiphySearch";
import { Toaster } from "react-hot-toast";
import { Spinner } from "./components/shared/Spinner";
import { GifGrid } from "./components/shared/GifGrid";
import { Pagination } from "./components/shared/Pagination";

function App() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const { gifs, loading, error, totalPages } = useGiphySearch(query, page);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <Toaster position="top-right" />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Giphy Search App
        </h1>
        <SearchInput />
      </header>

      <main>
        {query && (
          <p className="mb-4 text-muted-foreground">
            Showing results for:{" "}
            <span className="font-medium text-foreground">{query}</span>
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-destructive text-center p-4 rounded-md">
            {error.message}
          </div>
        ) : gifs.length === 0 && query ? (
          <div className="text-center p-8">
            <p className="text-lg">No GIFs found for "{query}"</p>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        ) : (
          <GifGrid gifs={gifs} />
        )}

        {totalPages > 0 && (
          <div className="mt-8 flex justify-center">
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
