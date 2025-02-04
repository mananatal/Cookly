'use client';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import RecipeCard from '@/components/common/RecipeCard';

import Skeleton from '@/components/common/Skeleton';
import Filter from '@/components/common/Filter';


function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes,setFilteredRecipes]=useState([]);

  const [loading,setLoading]=useState(false);

  const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/recipes');
        if (response.data.success) {
          setRecipes(response.data.recipes);
        } else {
          console.error('Failed to fetch recipes');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
      finally{
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

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
          filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe._id} 
              recipe={recipe} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
