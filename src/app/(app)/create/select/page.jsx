'use client'
import SelectRecipeCard from '@/components/createRecipiePage/selectRecipiePage/SelectRecipeCard';
import RecipeContext from '@/context/RecipeContext';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
function SelectRecipe() {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { recipe,setRecipe } = useContext(RecipeContext);
  const { toast } = useToast();
  const router=useRouter();

  useEffect(()=>{
    if(recipe.length===0){
        const generatedRecipes=JSON.parse(localStorage.getItem('generatedRecipes'));
        if(generatedRecipes){
            setRecipe([...generatedRecipes]);
        }
    }
  },[recipe]);

  const handleSaveRecipes=async ()=>{
    setLoading(true);
    try {
        const result=await axios.post('/api/save-recipe',{selectedRecipes});

        if(!result.data.success){
            toast({
                title:"Something went wrong while saving the recipes",
                variant: "destructive"
            })
            console.log(("OOPS! something went wrong while saving the recipes: ",result.data.message));
            return;
        }

        toast({
            title:"Recipes saved successfully",
            variant: "success"
        })
        
        if(typeof window !== 'undefined'){
            localStorage.removeItem('generatedRecipes');
        }

        router.replace('/user-recipes');
    } catch (error) {
        console.log("Error while saving the recipes: ",error.message);
    }
    finally{
        setLoading(false);
    }
  }


  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-4">
        Select Recipes You Like
      </h1>

      {/* Save Button */}
      <div className='flex justify-end max-w-6xl mx-auto mb-6'>
        <button
            className={` px-6 py-2 flex items-center justify-center  text-white font-semibold rounded-lg ${
            selectedRecipes.length > 0 && !loading? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={selectedRecipes.length === 0 || loading}
            onClick={handleSaveRecipes}
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
                    "Save Recipes"
                )
            }

        </button>
      </div>

      <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
        {recipe.map((rec, index) => (
          <SelectRecipeCard
            recipe={rec}
            key={index}
            selectedRecipes={selectedRecipes}
            setSelectedRecipes={setSelectedRecipes}
          />
        ))}
      </div>

      {selectedRecipes.length > 0 && (
        <div className="mt-8 p-4 bg-white border border-gray-200 shadow rounded-lg max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Selected Recipes
          </h2>
          <ul className="list-disc pl-6">
            {selectedRecipes.map((rec, index) => (
              <li key={index} className="text-gray-700">
                {rec.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectRecipe;
