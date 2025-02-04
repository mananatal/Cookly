import React, { useState } from 'react'
import { Label } from '@/components/ui/label';

const dietaryOptions = [
    "None",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Lactose-Free",
    "Keto",
    "Paleo",
];
function Filter({recipes,setFilteredRecipes}) {
    const [filters, setFilters] = useState({
        cookingTime: '',
        difficulty: '',
        dietaryPreference: '',
        rating: '',
    });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredRecipes = recipes
        .sort((a, b) => {
            if (filters.cookingTime === 'low-to-high') {
                return a.timeToCook - b.timeToCook;
            }
            if (filters.cookingTime === 'high-to-low') {
                return b.timeToCook - a.timeToCook;
            }
            return 0;
        })
        .filter((recipe) => {
            const { difficulty, dietaryPreference } = filters;
            return (
                (!difficulty || recipe.difficultyLevel === difficulty) &&
                (!dietaryPreference || recipe.dietaryPreference.includes(dietaryPreference))
        );
    });

    // setFilteredRecipes((prev)=>[...prev,filteredRecipes]);
    setFilteredRecipes(filteredRecipes);

    return (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
            {/* Cooking Time Filter */}
            <div className="flex flex-col w-40">
                <Label htmlFor="cookingTime">Cooking Time</Label>
                <select
                    id="cookingTime"
                    name="cookingTime"
                    value={filters.cookingTime}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-col w-40">
                <Label htmlFor="difficulty">Difficulty</Label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={filters.difficulty}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>

            {/* Dietary Preference Filter */}
            <div className="flex flex-col w-40">
                <Label htmlFor="dietaryPreference">Dietary Preference</Label>
                <select
                    id="dietaryPreference"
                    name="dietaryPreference"
                    value={filters.dietaryPreference}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {dietaryOptions.map((option, index) => (
                        <option key={index} value={option === "None" ? "" : option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>


        </div>
    )
}

export default Filter