'use client';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import RecipeCard from '@/components/common/RecipeCard';

import Skeleton from '@/components/common/Skeleton';

const dietaryOptions = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Lactose-Free",
  "Keto",
  "Paleo",
];

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    cookingTime: '',
    difficulty: '',
    dietaryPreference: '',
    rating: '',
  });
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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredRecipes = recipes
    .sort((a, b) => {
      if (filters.cookingTime === 'low-to-high'){
        return a.timeToCook - b.timeToCook;
      }  
      if (filters.cookingTime === 'high-to-low'){
        return b.timeToCook - a.timeToCook;
      } 
      return 0;
    })
    .filter((recipe) => {
      const { difficulty, dietaryPreference } = filters;
      return (
        (!difficulty || recipe.difficultyLevel === difficulty) &&
        (!dietaryPreference || recipe.dietaryPreference.includes(dietaryPreference))
      );
    });  


  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8" >
        Explore Recipes
      </h1>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {/* Cooking Time Filter */}
        <div className="flex flex-col w-40">
          <Label htmlFor="cookingTime">Cooking Time</Label>
          <select
            id="cookingTime"
            name="cookingTime"
            value={filters.cookingTime}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-col w-40">
          <Label htmlFor="difficulty">Difficulty</Label>
          <select
            id="difficulty"
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Dietary Preference Filter */}
        <div className="flex flex-col w-40">
          <Label htmlFor="dietaryPreference">Dietary Preference</Label>
          <select
            id="dietaryPreference"
            name="dietaryPreference"
            value={filters.dietaryPreference}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            {dietaryOptions.map((option, index) => (
              <option key={index} value={option==="None"?"":option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        
      </div>
        
        {
          loading && <Skeleton/>
        }

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
