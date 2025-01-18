import React from 'react';

function RecipeSkeleton() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center bg-gray-100 p-4 gap-6">
      {/* Recipe Card Skeleton */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
        <div className="p-6">
          {/* Recipe Title Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

          {/* Owner Information and Save Button Skeleton */}
          <div className='flex flex-col-reverse gap-4 md:flex-row justify-between'>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>

          {/* General Details Skeleton */}
          <div className="mb-6 flex justify-between flex-wrap gap-4">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          </div>

          {/* Dietary Preferences Skeleton */}
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>

          {/* Ingredients Skeleton */}
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          {/* Instructions Skeleton */}
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>

          {/* Additional Information Skeleton */}
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Skeleton */}
      <div className="w-full h-fit md:w-1/4 bg-white shadow-lg rounded-lg p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}

export default RecipeSkeleton;
