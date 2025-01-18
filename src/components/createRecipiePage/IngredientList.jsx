import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import UploadImage from "./UploadImage";

function IngredientList({ ingredients, setIngredients }) {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim() === "") return;
    setIngredients((prev) => [...prev, ingredient]);
    setIngredient("");
  };

  const onDelete = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Add Ingredients</h2>
      <p className="text-sm text-gray-600 mb-6">
        Enter ingredients manually one at a time or upload an image to extract ingredients automatically.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-6">
        <Input
          placeholder="Type an ingredient and press Enter"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="flex-1 max-w-2xl"
        />
        <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
          Add
        </Button>
      </form>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Upload an image of your ingredients to automatically detect and fill the list.
        </p>
        <UploadImage ingredients={ingredients} setIngredients={setIngredients}>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Upload Image
          </Button>
        </UploadImage>
      </div>

      {ingredients.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">Your Ingredients:</h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center bg-indigo-500 text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-md">
                <span>{ingredient}</span>
                <button
                  onClick={() => onDelete(index)}
                  className="ml-2 focus:outline-none hover:text-gray-200">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IngredientList;
