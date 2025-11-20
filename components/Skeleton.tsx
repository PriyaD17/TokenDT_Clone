import React from 'react';

export const TokenSkeleton = () => (
  <div className="p-2 mb-2 bg-[#13141b] rounded-md animate-pulse border border-transparent">
    <div className="flex gap-3 mb-2">
      <div className="w-12 h-12 bg-gray-800 rounded-md"></div>
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
        <div className="h-2 bg-gray-800 rounded w-1/3"></div>
        <div className="flex gap-1 mt-1">
           <div className="h-2 bg-gray-800 rounded w-4"></div>
           <div className="h-2 bg-gray-800 rounded w-4"></div>
        </div>
      </div>
      <div className="w-16 space-y-1 flex flex-col items-end">
         <div className="h-2 bg-gray-800 rounded w-10"></div>
         <div className="h-2 bg-gray-800 rounded w-12"></div>
      </div>
    </div>
    <div className="w-full h-1 bg-gray-800 rounded mt-2"></div>
    <div className="flex justify-between mt-2">
        <div className="h-3 bg-gray-800 rounded w-16"></div>
        <div className="h-4 bg-gray-700 rounded-full w-12"></div>
    </div>
  </div>
);
