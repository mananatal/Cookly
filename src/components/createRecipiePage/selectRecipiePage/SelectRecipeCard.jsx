import React from 'react';
import { Switch } from '@/components/ui/switch';

function SelectRecipeCard({ recipe, selectedRecipes, setSelectedRecipes }) {
  const isSelected = selectedRecipes.some((rec) => rec.name === recipe.name);

  const handleSelectionChange = (checked) => {
    if (checked) {
      setSelectedRecipes((prev) => [...prev, recipe]);
    } else {
      setSelectedRecipes((prev) => prev.filter((rec) => rec.name !== recipe.name));
    }
  };


  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transform hover:scale-[1.03] transition-transform duration-200">
      <div className="px-6 py-4">
        {/* Recipe Title and Switch */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl text-indigo-600">{recipe.name}</h2>
          <Switch
            checked={isSelected}
            onCheckedChange={handleSelectionChange}
            className={`${
              isSelected ? 'bg-green-500!' : 'bg-gray-300!'
            } relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          />
        </div>

        {/* Recipe Details */}
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            <strong>Serving:</strong> {recipe.serving}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Time to Cook:</strong> {recipe.timeToCook} minutes
          </p>
          <div className="mt-2">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${difficultyColors[recipe.difficultyLevel]}`}
            >
              {recipe.difficultyLevel}
            </span>
          </div>
        </div>

        {/* Ingredients */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredients:</h3>
        <ul className="mb-4 flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.name} className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {`${ingredient.name}${ingredient.quantity ? ` (${ingredient.quantity})` : ''}`}
            </li>
          ))}
        </ul>

        {/* Dietary Preferences */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Dietary Preferences:</h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {recipe.dietaryPreference.map((preference) => (
            <span
              key={preference}
              className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded"
            >
              {preference}
            </span>
          ))}
        </div>

        {/* Instructions */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Instructions:</h3>
        <ol className="mb-4 space-y-2 bg-gray-50 border border-gray-200 p-4 rounded-lg">
          {recipe.instructions.map((instruction, idx) => (
            <li key={instruction} className="text-gray-800 text-sm">
              {`${idx + 1}. ${instruction}`}
            </li>
          ))}
        </ol>

        {/* Additional Information */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Additional Information:</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-800">
            <strong>Tips:</strong> {recipe.additionalInformation.tips}
          </p>
          <p className="text-sm text-gray-800">
            <strong>Variations:</strong> {recipe.additionalInformation.variations}
          </p>
          <p className="text-sm text-gray-800">
            <strong>Serving Suggestions:</strong> {recipe.additionalInformation.servingSuggestions}
          </p>
          <p className="text-sm text-gray-800">
            <strong>Nutritional Information:</strong> {recipe.additionalInformation.nutritionalInformation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectRecipeCard;
