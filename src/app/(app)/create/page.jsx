'use client';
import DietryPrefrences from '@/components/createRecipiePage/DietryRestrictions';
import IngredientList from '@/components/createRecipiePage/IngredientList';
import ServingSize from '@/components/createRecipiePage/ServingSize';
import { Button } from '@/components/ui/button';
import RecipeContext from '@/context/RecipeContext';
import { useToast } from '@/hooks/use-toast';
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

      const validationPropmt=`Here is list of ingredients ${JSON.stringify(ingredients)}  ${dietaryPreferences[0]!="None"? `and dietary preferences: ${dietaryPreferences.join(',')}` : ''} . An ingredient is valid if it is commonly used in cooking and aligns with the specified dietary preferences. Your task is to validate all the ingredients. If you find any ingredient that is invalid or does not meet the dietary preferences, replace it with a suitable substitution. Return a JSON object in the following format:

      { "allValid": "true/false", "validatedIngredients": ["ingredient1", "ingredient2", "substitutionForInvalidIngredient"], "invalidIngredients": ["invalidIngredient1", "invalidIngredient2"]}

      The "allValid" field should be true if all the ingredients are valid, commonly used, and meet the dietary preferences; otherwise, it should be false and its type is boolean.
      The "validatedIngredients" field should include both the original valid ingredients and substituted ingredients for the invalid or non-compliant ones and all should be unique.
      The "invalidIngredients" field should list only the original ingredients that were either invalid or did not meet the dietary preferences all should be unique.
      
      Ensure the output is valid JSON. Also note that vegan and vegeterian are different so validate accordingly `;

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
      

      const prompt = `
                I have the following ingredients: ${JSON.stringify(ingredients)} ${dietaryPreferences[0]!="None"? `and dietary preferences: ${dietaryPreferences.join(',')}` : ''}. I want recipes for ${servingSize} plate servings. Please provide me with three different delicious and diverse recipes. The response should be in the following JSON format without any additional text, markdown, or code formatting (e.g., no backticks):
                [
                    {
                        "name": "Recipe Name",
                        "ingredients": [
                            {"name": "Ingredient 1", "quantity": "quantity and unit"},
                            {"name": "Ingredient 2", "quantity": "quantity and unit"},
                            ...
                        ],
                        "instructions": [
                            "Do this first.",
                            "Then do this.",
                            ...
                        ],
                        "serving": "${servingSize} Plate",
                        "timeToCook": "Estimated time to cook in minutes(give only numeric value without any unit)",
                        "difficultyLevel": "Difficulty (Easy, Medium, Hard)",
                        "dietaryPreference": ["Preference 1", "Preference 2", ...],
                        "additionalInformation": {
                            "tips": "Provide practical cooking tips, such as using the right cookware or ingredient substitutions.",
                            "variations": "Suggest creative variations for the recipe, like adding more vegetables or using different proteins.",
                            "servingSuggestions": "Include ideas for how to serve the dish (e.g., with toast, salad, or specific sauces).",
                            "nutritionalInformation": "Provide approximate nutritional details (e.g., calories, protein, fat, etc.)."
                        }
                    },
                    ...
                ]
                Please ensure the recipes are diverse in type or cuisine (e.g., different meal categories or international flavors) and use all the ingredients listed unless dietary preferences or practicality dictate otherwise. Quantities must include appropriate units (e.g., grams, cups, teaspoons) for precision. Provide clear, detailed instructions suitable for someone with basic cooking skills. The instructions should be ordered but not include step numbers. Additionally, ensure the recipes respect the dietary preferences provided by suggesting suitable alternatives where necessary. The JSON must be valid and parsable without any additional text or formatting outside the JSON structure.
            `;

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
