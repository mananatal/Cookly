'use client';
import Offline from '@/components/common/Offline';
import DietryPrefrences from '@/components/createRecipiePage/DietryRestrictions';
import IngredientList from '@/components/createRecipiePage/IngredientList';
import ServingSize from '@/components/createRecipiePage/ServingSize';
import { Button } from '@/components/ui/button';
import RecipeContext from '@/context/RecipeContext';
import { generateRecipesPrompt, validateIngredientsPrompt } from '@/helper/prompts';
import { useToast } from '@/hooks/use-toast';
import useOnline from '@/hooks/useOnline';
import { chatSession } from '@/lib/gemini';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

function CreateRecipe() {
  const [ingredients, setIngredients] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState(['None']);
  const [servingSize, setServingSize] = useState(3);
  const [loading, setLoading] = useState(false);
  const [validationErrorMessage,setValidationErrorMessage]=useState("");

  const { setRecipe } = useContext(RecipeContext);
  const router = useRouter();
  const {toast}=useToast();

  const {isOnline}=useOnline();



  const handleGenerateRecipe = async () => {
    setValidationErrorMessage("");

    if (ingredients.length < 3) {
      toast({
        variant:"destructive",
        title:"Minimum 3 Ingredients are Required"
      })
      return;
    }

    try {
      setLoading(true);

      const validationPropmt=validateIngredientsPrompt(ingredients,dietaryPreferences);

      const result1 = await chatSession.sendMessage(validationPropmt);
      const response1 = await result1.response.text();
      const text1 = response1.replace('```json', '').replace('```', '');

      try {
        const parsedResult = JSON.parse(text1);
        if(!parsedResult.allValid){
          setIngredients(parsedResult.validatedIngredients);
          setValidationErrorMessage("*Some ingredients in your list are invalid or do not comply with the specified dietary preferences. They have been replaced with suitable substitutions. Please review the updated ingredient list.");
          return;
        }
        
      } catch (error) {
        console.error('Failed to parse JSON response:', text);
      }
      

      const prompt =generateRecipesPrompt(ingredients,dietaryPreferences,servingSize);

      const result = await chatSession.sendMessage(prompt);
      const response = await result.response.text();
      const text = response.replace('```json', '').replace('```', '');

      try {
        const parsedResult = JSON.parse(text);
        setRecipe((prev) => [...prev, ...parsedResult]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('generatedRecipes', text);
        }
        router.push('/create/select');
      } catch (error) {
        console.error('Failed to parse JSON response:', text);
      }
    } catch (error) {
      console.error('Failed to Generate Recipe', error);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(()=>{
    localStorage.clear();
  },[])

  if(!isOnline){
    return <Offline/>
  }

  return (
    <div className="max-w-4xl bg-white shadow-lg mx-auto min-h-screen p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-8">
        Create Your Custom Recipe
      </h1>

      {/* Ingredients Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ingredients</h2>
        <IngredientList ingredients={ingredients} setIngredients={setIngredients} />
      </div>

      {/* Dietary Preferences Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Dietary Preferences</h2>
        <DietryPrefrences
          dietaryPreferences={dietaryPreferences}
          setDietaryPreferences={setDietaryPreferences}
        />
      </div>

      {/* Serving Size Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Serving Size</h2>
        <ServingSize servingSize={servingSize} setServingSize={setServingSize} />
      </div>

      {/* Generate Recipe Button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleGenerateRecipe}
          disabled={loading}
          className={`${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white px-6 py-2 rounded-lg`}
        >
          {
                loading?
                (
                    <>
                        <Loader2 className='animate-spin '/> Generating...
                    </>
                )
                :
                (
                    "Generate Recipe"
                )
            }
        </Button>
        
      </div>
      {
          validationErrorMessage && <p className='text-red-600 text-center'>{validationErrorMessage}</p>
      }
    </div>
  );
}

export default CreateRecipe;
