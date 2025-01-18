import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Minus, Plus } from "lucide-react";

function ServingSize({ servingSize, setServingSize }) {
  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
      <Label
        htmlFor="serving-size"
        className="block text-2xl font-bold text-gray-800 mb-4"
      >
        Adjust Serving Size
      </Label>
      <div className="flex items-center space-x-4">
        <Button
          type="button"
          onClick={() => setServingSize((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:ring-2 focus:ring-indigo-400"
          aria-label="Decrease serving size"
        >
          <Minus className="w-5 h-5" />
        </Button>
        <Input
          id="serving-size"
          type="number"
          value={servingSize}
          onChange={(e) =>
            setServingSize(Math.max(parseInt(e.target.value, 10) || 1, 1))
          }
          placeholder="Enter a number"
          className="w-24 px-4 py-2 text-center border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <Button
          type="button"
          onClick={() => setServingSize((prev) => prev + 1)}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:ring-2 focus:ring-indigo-400"
          aria-label="Increase serving size"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Use the buttons to increase or decrease the serving size, or type a
        number directly in the field.
      </p>
    </div>
  );
}

export default ServingSize;
