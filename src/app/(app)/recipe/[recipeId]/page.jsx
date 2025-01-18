'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { CheckCircleIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Rating from '@/components/recipePage/Rating';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import RecipeSkeleton from '@/components/recipePage/RecipeSkeleton';

function RecipePage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading,setLoading]=useState(false);
  const [isAlreadySaved,setIsAlreadySaved]=useState(true);

  const {toast}=useToast();
  const {user}=useUser();

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`/api/recipe-info?recipeId=${recipeId}`);
      if (response.data.success) {
        setRecipe(response.data.recipeInfo);
      } else {
        console.error('Failed to fetch recipe details');
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const fetchRecipeSavedStaus=async()=>{
    try {
        const response = await axios.get(`/api/is-already-saved-user-recipe?recipeId=${recipeId}`);
        if (response.data.success) {
            setIsAlreadySaved(response.data.isAlreadySaved);
        } else {
          console.error('Failed to fetch is  recipe  already saved');
        }
      } catch (error) {
        console.error('Failed to fetch is  recipe  already saved', error);
      }
  }

  useEffect(() => {
    fetchRecipe();
    fetchRecipeSavedStaus();
  }, [recipeId]);

  if (!recipe) {
    return <RecipeSkeleton/>
  }

  const handleSaveRecipe=async ()=>{
    setLoading(true);
    try {
        const result=await axios.post('/api/save-user-recipe',{recipeId});

        if(!result.data.success){
            toast({
                title:"Something went wrong while saving the recipe",
                variant: "destructive"
            })
            console.error(("OOPS! something went wrong while saving the recipes: ",result.data.message));
            return;
        }

        toast({
            title:"Recipe saved successfully",
            variant: "success"
        })
        setIsAlreadySaved(true);

    } catch (error) {
        console.log("Error while saving the recipe: ",error.message);
    }
    finally{
        setLoading(false);
    }
  }

  const {
    createdBy,
    name,
    ingredients,
    instructions,
    serving,
    timeToCook,
    difficultyLevel,
    dietaryPreference,
    additionalInformation,
  } = recipe;

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center bg-gray-100 p-4 gap-6">
      {/* Recipe Card */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Recipe Title */}
          <h2 className="text-2xl font-bold mb-2">{name}</h2>

          {/* Owner Information and saveButton */}
          <div className='flex flex-col-reverse gap-4 md:flex-row  justify-between'>
                <div className="flex items-center mb-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                            src={createdBy.image}
                            alt={createdBy.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <span className="text-gray-700 text-lg">By {createdBy?.name}</span>
                        <p className="text-sm text-gray-500">{new Date(recipe.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                {/* Save Button */}
                {
                    user && user.primaryEmailAddress.emailAddress !==createdBy?.email &&
                    <div>
                        <button
                            className={` px-6 py-2 flex items-center justify-center text-white font-semibold rounded-lg 
                                ${!isAlreadySaved && !loading ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
                                    }
                            `}
                            disabled={ loading || isAlreadySaved}
                            onClick={handleSaveRecipe}
                        >
                            {
                                loading?
                                (
                                    <>
                                        <Loader2 className='animate-spin mr-2'/> Saving...
                                    </>
                                )
                                :
                                (
                                    "Save Recipe"
                                )
                            }

                        </button>
                    </div>
                }
            </div>
          {/* General Details */}
          <div className="mb-6 flex justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-bold text-gray-700">Serving:</h3>
              <p className="text-gray-600">{serving} </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700">Time to Cook:</h3>
              <p className="text-gray-600">{timeToCook} minutes</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700">Difficulty Level:</h3>
              <p className="text-gray-600">{difficultyLevel}</p>
            </div>
            
          </div>

          {/* Dietary Preferences */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Dietary Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {dietaryPreference.map((preference) => (
                <span
                  key={preference}
                  className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {preference}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredients.map((ingredient) => (
                <li key={ingredient.name} className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">
                    {ingredient.name}
                    {ingredient.quantity && ` (${ingredient.quantity})`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-4">
              {instructions.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-bold text-gray-800 mr-3">{index + 1}.</span>
                  <p className="text-gray-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-700">Tips:</h4>
                <p className="text-gray-600">{additionalInformation.tips}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Variations:</h4>
                <p className="text-gray-600">{additionalInformation.variations}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Serving Suggestions:</h4>
                <p className="text-gray-600">{additionalInformation.servingSuggestions}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Nutritional Information:</h4>
                <p className="text-gray-600">{additionalInformation.nutritionalInformation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for Second Component */}
      <div className="w-full h-fit md:w-1/4  bg-white shadow-lg rounded-lg p-2">
        <Rating/>
        
      </div>
    </div>
  );
}

export default RecipePage;
