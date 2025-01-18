import Navbar from "@/components/common/Navbar"
import RecipeContextProvider from "@/context/RecipeContextProvider"

function layout({children}) {

  return (
      <main className="w-full ">
        <Navbar authNav={true} />
        <RecipeContextProvider>
          {children}
        </RecipeContextProvider>        
      </main>
  )
}

export default layout