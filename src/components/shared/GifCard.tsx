// components/GifCard.tsx
import { GiphyGif } from "../../types/giphy.type";

interface GifCardProps {
  gif: GiphyGif;
}

// Add loading="lazy" and srcset for better image loading
export function GifCard({ gif }: GifCardProps) {
  return (
    <div 
      role="article"
      aria-label={gif.title || "Untitled GIF"}
      tabIndex={0}
      className="w-full aspect-square rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-accent/50 group relative focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="w-full h-full">
        <img
          src={gif.images.fixed_height.url}
          srcSet={`
            ${gif.images.fixed_width.url} ${gif.images.fixed_width.width}w,
            ${gif.images.fixed_height.url} ${gif.images.fixed_height.width}w,
            ${gif.images.original.url} ${gif.images.original.width}w
          `}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          alt={gif.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
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
