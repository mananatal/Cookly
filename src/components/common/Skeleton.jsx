import React from 'react';

function Skeleton() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] bg-white shadow-lg rounded-lg overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative h-48 bg-gray-200"></div>

          {/* Content Skeleton */}
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded w-6"></div>
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
