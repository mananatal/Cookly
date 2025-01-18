'use client'
import React, { useState } from 'react'
import RecipeContext from './RecipeContext'

function RecipeContextProvider({children}) {
    const [recipe, setRecipe] = useState([]);
  return (
    <RecipeContext.Provider value={{recipe,setRecipe}}>
        {children}
    </RecipeContext.Provider>
  )
}

export default RecipeContextProvider