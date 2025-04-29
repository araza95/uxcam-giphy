import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/layout/Header";
import { Spinner } from "./components/shared/Spinner";
import { useSearchParamsState } from "./hooks/useSearchParamsState";
import { useGiphySearch } from "./hooks/useGiphySearch";

const MainContent = lazy(() => import("./components/layout/MainContent"));
const PaginationBar = lazy(() => import("./components/layout/PaginationBar"));

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
      
      <Suspense fallback={<div className="flex-1 grid place-items-center"><Spinner size="lg" /></div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
