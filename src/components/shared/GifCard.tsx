import { GiphyGif } from "../../types/giphy.type";

interface GifCardProps {
  gif: GiphyGif;
}

export function GifCard({ gif }: GifCardProps) {
  return (
    <div className="rounded-lg overflow-hidden bg-card border border-border hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={gif.images.fixed_height.url}
          alt={gif.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-medium truncate" title={gif.title}>
          {gif.title || "Untitled GIF"}
        </p>
      </div>
    </div>
  );
}
