'use client'
import Filter from '@/components/common/Filter';
import PaginationContainer from '@/components/common/PaginationContainer';
import RecipeCard from '@/components/common/RecipeCard';
import Skeleton from '@/components/common/Skeleton';
import { Page_Size } from '@/const/data';
import useGetRecipes from '@/hooks/useGetRecipes';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function SavedRecipes() {
  const [filteredRecipes,setFilteredRecipes]=useState([]);
  const [currPage, setCurrPage] = useState(0);

  const {recipes:savedRecipes,loading}=useGetRecipes('/api/get-user-saved-recipes');

  const {user}=useUser();

  if(!user){
    return;
  }

  const start=currPage*Page_Size;
  const end=start+Page_Size;

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
          {filteredRecipes.slice(0).reverse().slice(start,end).map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {
       filteredRecipes.length && <PaginationContainer currPage={currPage} setCurrPage={setCurrPage} totalPage={Math.ceil(filteredRecipes.length/Page_Size)}/>
      }

    </div>
  );
}

export default SavedRecipes