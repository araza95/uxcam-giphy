import { useSearchParams } from "react-router-dom";
import { SearchInput } from "./components/shared/SearchInput";
import { useGiphySearch } from "./hooks/useGiphySearch";
import { Toaster } from "react-hot-toast";
import { Pagination } from "./components/shared/Pagination";
import { GifGrid } from "./components/shared/GifGrid";

function App() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const { gifs, loading, error, totalPages } = useGiphySearch(query, page);

  return (
    <div className="min-w-screen flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Toaster position="top-right" />

      <header className="p-6 border-b border-border bg-sidebar">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-white">
            Giphy Explorer
          </h1>
          <SearchInput />

          {query && (
            <p className="mt-4 text-muted-foreground">
              Showing results for:{" "}
              <span className="font-medium text-accent-foreground">
                {query}
              </span>
            </p>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <section className="flex-1 overflow-auto p-6">
          {error ? (
            <div className="text-destructive text-center p-4 rounded-md bg-card/50 max-w-xl mx-auto">
              <p className="font-medium">Something went wrong</p>
              <p className="text-sm">{error.message}</p>
            </div>
          ) : gifs.length === 0 && !loading ? (
            <div className="text-center p-8 bg-card/50 rounded-lg max-w-xl mx-auto">
              {query ? (
                <>
                  <p className="text-lg font-medium">
                    No GIFs found for "{query}"
                  </p>
                  <p className="text-muted-foreground">
                    Try a different search term
                  </p>
                </>
              ) : (
                <div className="flex-1 flex-col flex items-center justify-center py-4 cursor-pointer">
                  <img
                    src="/cartoon-character.png"
                    alt="Welcome cartoon"
                    className="w-full max-w-[650px] h-auto px-4 md:px-0"
                  />
                  <p className="text-base md:text-lg font-medium text-center px-4 mt-4">
                    Start exploring GIFs!
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground text-center px-4">
                    Try searching for something fun
                  </p>
                </div>
              )}
            </div>
          ) : (
            <GifGrid gifs={gifs} loading={loading} />
          )}
        </section>

        {totalPages > 0 && (
          <section className="sticky bottom-0 border-t border-border bg-sidebar p-4 flex justify-center">
            <Pagination currentPage={page} totalPages={totalPages} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
