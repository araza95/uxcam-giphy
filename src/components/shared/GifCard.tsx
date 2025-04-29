// components/GifCard.tsx
import { GiphyGif } from "../../types/giphy.type";

interface GifCardProps {
  gif: GiphyGif;
}

export function GifCard({ gif }: GifCardProps) {
  return (
    <div className="w-full aspect-square rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-accent/50 group relative">
      <div className="w-full h-full">
        <img
          src={gif.images.fixed_height.url}
          alt={gif.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/50 backdrop-blur-sm">
        <p
          className="text-sm font-medium truncate text-white"
          title={gif.title}
        >
          {gif.title || "Untitled GIF"}
        </p>
      </div>
    </div>
  );
}
