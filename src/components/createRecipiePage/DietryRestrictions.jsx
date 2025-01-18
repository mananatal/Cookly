import React from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function DietaryRestrictions({ dietaryPreferences, setDietaryPreferences }) {
  
  const dietaryOptions = [
    "None",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Lactose-Free",
    "Keto",
    "Paleo",
  ];

  const handleCheckedChange = (option, checked) => {
    if (option === "None") {
      setDietaryPreferences(["None"]);
    } else {
      setDietaryPreferences((prev) => {
        if (checked) {
          return prev.filter((item) => item !== "None").concat(option);
        } else {
          const newPreferences = prev.filter((item) => item !== option);
          return newPreferences.length === 0 ? ["None"] : newPreferences;
        }
      });
    }
  };

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Select Your Dietary Preferences
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Choose the dietary restrictions or preferences that apply to you. This will help us tailor the recipes accordingly.
      </p>
      <div className="flex flex-wrap gap-4">
        {dietaryOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow"
          >
            <Checkbox
              checked={dietaryPreferences.includes(option)}
              onCheckedChange={(checked) =>handleCheckedChange(option, checked)}
              id={option}
              name={option}
              value={option}
            />
            <Label htmlFor={option} className="text-gray-700">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DietaryRestrictions;
