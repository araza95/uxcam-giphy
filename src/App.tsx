import { Toaster } from "react-hot-toast";
import { Header } from "./components/layout/Header";
import { MainContent } from "./components/layout/MainContent";
import { PaginationBar } from "./components/layout/PaginationBar";
import { useGiphySearch } from "./hooks/useGiphySearch";
import { useSearchParamsState } from "./hooks/useSearchParamsState";

function App() {
  const { getParam } = useSearchParamsState();
  const query = getParam("q") || "";
  const page = parseInt(getParam("page") || "1");
  const limit = parseInt(getParam("limit") || "20");

  const { gifs, loading, error, totalPages } = useGiphySearch(
    query,
    page,
    limit
  );

  return (
    <div className="min-w-screen flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Toaster position="top-right" />
      <Header query={query} />

      <main className="flex-1 overflow-hidden flex flex-col">
        <MainContent
          error={error}
          loading={loading}
          gifs={gifs}
          query={query}
        />

        {totalPages > 0 && (
          <PaginationBar currentPage={page} totalPages={totalPages} />
        )}
      </main>
    </div>
  );
}

export default App;
