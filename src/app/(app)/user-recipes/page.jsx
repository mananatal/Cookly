'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import RecipeCard from '@/components/common/RecipeCard';
import Skeleton from '@/components/common/Skeleton';
import Filter from '@/components/common/Filter';


function UserRecipes() {
  const [userRecipes, setUserRecipes] = useState([]);
  const [filteredRecipes,setFilteredRecipes]=useState([]);
  const [loading,setLoading]=useState(false);


  const {user}=useUser();

  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user-recipes');

      if (response.data.success) {

        setUserRecipes(response.data.userRecipes);
      } else {
        console.error('Failed to fetch user recipes');
      }
    } catch (error) {
      console.error('Error fetching user recipes:', error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!user){
      return;
    }
    

    fetchUserRecipes();
  }, [user]);

  

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
          {filteredRecipes.map((recipe) => (
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

export default UserRecipes;
