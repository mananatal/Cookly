'use client'
import Filter from '@/components/common/Filter';
import RecipeCard from '@/components/common/RecipeCard';
import Skeleton from '@/components/common/Skeleton';
import useGetRecipes from '@/hooks/useGetRecipes';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function SavedRecipes() {
  const [filteredRecipes,setFilteredRecipes]=useState([]);

  const {recipes:savedRecipes,loading}=useGetRecipes('/api/get-user-saved-recipes');

  const {user}=useUser();

  if(!user){
    return;
  }

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
        Saved Recipes
      </h1>

      {
        loading && <Skeleton/>
      }

      <Filter recipes={savedRecipes} setFilteredRecipes={setFilteredRecipes}/>

      {filteredRecipes.length === 0 && !loading ? (
        <p className="text-gray-700 text-center text-lg">
          You haven't saved any recipes yet. Start exploring other users' creations and save the ones that inspire your next meal!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredRecipes.slice(0).reverse().map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipes