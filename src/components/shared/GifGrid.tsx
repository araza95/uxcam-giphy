import { GiphyGif } from "../../types/giphy.type";
import { GifCard } from "./GifCard";

interface GifGridProps {
  gifs: GiphyGif[];
}

export function GifGrid({ gifs }: GifGridProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </div>
  );
}
