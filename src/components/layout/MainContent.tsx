import { GiphyGif } from "../../types/giphy.type";
import { GifGrid } from "../shared/GifGrid";

interface MainContentProps {
  error: Error | null;
  loading: boolean;
  gifs: GiphyGif[];
  query: string;
}

export function MainContent({ error, loading, gifs, query }: MainContentProps) {
  if (error) {
    return (
      <div className="text-destructive text-center p-4 rounded-md bg-card/50 max-w-xl mx-auto">
        <p className="font-medium">Something went wrong</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (gifs.length === 0 && !loading) {
    return (
      <div className="text-center p-8 bg-card/50 rounded-lg max-w-xl mx-auto">
        {query ? (
          <>
            <p className="text-lg font-medium">No GIFs found for "{query}"</p>
            <p className="text-muted-foreground">Try a different search term</p>
          </>
        ) : (
          <div className="flex-1 flex-col flex items-center justify-center py-4 cursor-pointer">
            <img
              src="/cartoon-character.png"
              alt="Welcome cartoon"
              className="w-full max-w-[650px] h-auto px-4 md:px-0 animate-[bounce_3s_ease-in-out_infinite] translate-y-12"
            />
            <p className="text-base md:text-4xl font-medium text-center px-4 pb-2 mt-4">
              Start exploring GIFs!
            </p>
            <p className="text-md md:text-base text-muted-foreground text-center px-4">
              Try searching for something fun
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="flex-1 overflow-auto p-6">
      <GifGrid gifs={gifs} loading={loading} />
    </section>
  );
}
