'use client';
import React, { useEffect, useState } from 'react';
import RecipeCard from '@/components/common/RecipeCard';
import Skeleton from '@/components/common/Skeleton';
import Filter from '@/components/common/Filter';
import useGetRecipes from '@/hooks/useGetRecipes';
import PaginationContainer from '@/components/common/PaginationContainer';
import { Page_Size } from '@/const/data';

function HomePage() {
  const [filteredRecipes,setFilteredRecipes]=useState([]);
  const [currPage, setCurrPage] = useState(0);
  
  const {recipes,loading}=useGetRecipes('/api/recipes');

  const start=currPage*Page_Size;
  const end=start+Page_Size;


  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8" >
        Explore Recipes
      </h1>
      
      {
        loading && <Skeleton/>
      }

      {/* Filters Section */}
      <Filter recipes={recipes} setFilteredRecipes={setFilteredRecipes}/>

      {/* Recipes Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredRecipes.length === 0 &&!loading ? (
          <p className="text-gray-700 text-center col-span-full">
            No recipes match the selected filters.
          </p>
        ) : (
          filteredRecipes.slice(start,end).map((recipe) => (
            <RecipeCard 
              key={recipe._id} 
              recipe={recipe} 
            />
          ))
        )}
      </div>
      
      {/* Pagination */}
      {
       filteredRecipes.length && <PaginationContainer currPage={currPage} setCurrPage={setCurrPage} totalPage={Math.ceil(filteredRecipes.length/Page_Size)}/>
      }
      
    </div>
  );
}

export default HomePage;
