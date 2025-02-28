
export const generateRecipesPrompt=(ingredients,dietaryPreferences,servingSize)=>{
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

    return prompt;
}


export const validateIngredientsPrompt=(ingredients,dietaryPreferences)=>{
    const prompt=`Here is list of ingredients ${JSON.stringify(ingredients)}  ${dietaryPreferences[0]!="None"? `and dietary preferences: ${dietaryPreferences.join(',')}` : ''} . An ingredient is valid if it is commonly used in cooking and aligns with the specified dietary preferences. Your task is to validate all the ingredients. If you find any ingredient that is invalid or does not meet the dietary preferences, replace it with a suitable substitution. Return a JSON object in the following format:

      { "allValid": "true/false", "validatedIngredients": ["ingredient1", "ingredient2", "substitutionForInvalidIngredient"], "invalidIngredients": ["invalidIngredient1", "invalidIngredient2"]}

      The "allValid" field should be true if all the ingredients are valid, commonly used, and meet the dietary preferences; otherwise, it should be false and its type is boolean.
      The "validatedIngredients" field should include both the original valid ingredients and substituted ingredients for the invalid or non-compliant ones and all should be unique.
      The "invalidIngredients" field should list only the original ingredients that were either invalid or did not meet the dietary preferences all should be unique.
      
      Ensure the output is valid JSON. Also note that vegan and vegeterian are different so validate accordingly `;

    return prompt;
}

export const getIngredientFromImagePrompt=()=>{
    const prompt = `You are an expert chef. Analyze this image and provide:
            1. Get All the ingredients in the image
            2. Validate whether the ingredients are correct return false only when more than 40% of the ingredients are incorrect
            3. if not valid then provide the appropriate message for the user to correct it
            
            Respond in JSON format like this:
            {
                "imageIngredients": ["ingredient1", "ingredient2", ...],
                "isValid": true/false,
                "message":"message"
    }`

    return prompt;
}