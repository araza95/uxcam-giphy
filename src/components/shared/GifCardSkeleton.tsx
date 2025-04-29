// components/GifCardSkeleton.tsx
export function GifCardSkeleton() {
  return (
    <div className="w-full aspect-square rounded-lg overflow-hidden bg-card border border-border animate-pulse relative">
      <div className="w-full h-full bg-muted"></div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/50">
        <div className="h-4 bg-muted/50 rounded w-3/4"></div>
      </div>
    </div>
  );
}
