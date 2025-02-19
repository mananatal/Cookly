'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import RecipeCard from '@/components/common/RecipeCard';
import Skeleton from '@/components/common/Skeleton';
import Filter from '@/components/common/Filter';
import useGetRecipes from '@/hooks/useGetRecipes';
import PaginationContainer from '@/components/common/PaginationContainer';
import { Page_Size } from '@/const/data';


function UserRecipes() {
  const [filteredRecipes,setFilteredRecipes]=useState([]);
  const [currPage, setCurrPage] = useState(0);
  
  const {recipes:userRecipes,loading}=useGetRecipes('/api/user-recipes');

  const {user}=useUser();

  if(!user){
    return;
  }

  const start=currPage*Page_Size;
  const end=start+Page_Size;

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
        Your Recipes
      </h1>

      {
        loading && <Skeleton/>
      }

      {/* Filter Component */}
      <Filter recipes={userRecipes} setFilteredRecipes={setFilteredRecipes}/>
      

      {filteredRecipes.length === 0 && !loading ? (
        <p className="text-gray-700 text-center text-lg">
          You haven't created any recipes yet. Start creating and saving your delicious ideas!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredRecipes.slice(start,end).map((recipe) => (
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

export default UserRecipes;
