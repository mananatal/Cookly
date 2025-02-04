
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useGetRecipes(requestUrl) {
    const [recipes,setRecipes]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchRecipes = async () => {
            try {
              const response = await axios.get(requestUrl);
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
        fetchRecipes();

    },[requestUrl])

    return {recipes,loading};
}

export default useGetRecipes