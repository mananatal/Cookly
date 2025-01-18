'use client'
import avgRating from '@/helper/avgRating';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';


function RecipeCard({recipe}) {
    const [avgReviewCount,setAvgReviewCount]=useState(0);

    useEffect(()=> {
        const count = avgRating(recipe.ratings);
        setAvgReviewCount(count);
    },[recipe])

    const router=useRouter();
  return (
      <div
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
          onClick={() => router.push(`/recipe/${recipe._id}`)}
      >
            
          {/* Placeholder Image */}
          <div className="relative h-48 bg-gray-200 flex items-center justify-center">
            <Image
                src={'/dummyImage.jpg'}
                fill={true}
                alt='food Image'
            />
          </div>

          {/* Recipe Details */}
          <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 truncate">
                  {recipe.name}
              </h2>
              
              <div className='flex justify-between'>
                <p className="text-sm text-gray-500 mt-1">
                  Servings: {recipe.serving}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Time to Cook: {recipe.timeToCook} mins
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-1 truncate">
                  Ingredients: {recipe.ingredients.map((ing) => ing.name).join(', ')}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                  Dietary Preferences: {recipe.dietaryPreference.join(', ')}
              </p>
              <div className="mt-2">
                  <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${recipe.difficultyLevel === 'Easy'
                              ? 'bg-green-100 text-green-800'
                              : recipe.difficultyLevel === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                          }`}
                  >
                      Difficulty: {recipe.difficultyLevel}
                  </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                  <span className='font-semibold'>Nutritional Info: </span>{recipe.additionalInformation.nutritionalInformation}
              </p>
              <div className="mt-2 flex items-center">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-5">{avgReviewCount || 0}</span>
                    <ReactStars 
                        edit={false}
                        half={true}
                        value={avgReviewCount}
                        size={28}
                    />
                    <span className="text-richblack-400">
                      {recipe.ratings.length} Ratings
                    </span>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default RecipeCard