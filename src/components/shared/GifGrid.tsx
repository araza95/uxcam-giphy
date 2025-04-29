// components/GifGrid.tsx
import { GiphyGif } from "../../types/giphy.type";
import { GifCard } from "./GifCard";
import { GifCardSkeleton } from "./GifCardSkeleton";

interface GifGridProps {
  gifs: GiphyGif[];
  loading: boolean;
}

export function GifGrid({ gifs, loading }: GifGridProps) {
  const skeletonArray = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
      {loading
        ? skeletonArray.map((index) => <GifCardSkeleton key={index} />)
        : gifs.map((gif) => <GifCard key={gif.id} gif={gif} />)}
    </div>
  );
}
