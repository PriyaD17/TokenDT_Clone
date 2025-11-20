export const TokenSkeleton = () => (
  <div className="relative p-2 mb-2 bg-[#13141b] rounded-md overflow-hidden border border-transparent">
    <style>
      {`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.03) 50%,
            transparent 100%
          );
          animation: shimmer 2s infinite;
          pointer-events: none;
        }
      `}
    </style>
    
    <div className="flex gap-3 mb-2 relative z-10">
      {/* Icon Skeleton */}
      <div className="w-12 h-12 bg-gray-800/50 rounded-md"></div>
      
      {/* Text Skeleton */}
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-800/50 rounded w-1/2"></div>
        <div className="h-2 bg-gray-800/50 rounded w-1/3"></div>
        <div className="flex gap-1 mt-1">
           <div className="h-2 bg-gray-800/50 rounded w-4"></div>
           <div className="h-2 bg-gray-800/50 rounded w-4"></div>
        </div>
      </div>
      
      {/* Price Skeleton */}
      <div className="w-16 space-y-1 flex flex-col items-end">
         <div className="h-2 bg-gray-800/50 rounded w-10"></div>
         <div className="h-2 bg-gray-800/50 rounded w-12"></div>
      </div>
    </div>
    
    {/* Bar Skeleton */}
    <div className="w-full h-1 bg-gray-800/50 rounded mt-2 relative z-10"></div>
    
    {/* Footer Skeleton */}
    <div className="flex justify-between mt-2 relative z-10">
        <div className="h-3 bg-gray-800/50 rounded w-16"></div>
        <div className="h-4 bg-gray-700/30 rounded-full w-12"></div>
    </div>

    {/* Shimmer Overlay */}
    <div className="shimmer-overlay"></div>
  </div>
);
