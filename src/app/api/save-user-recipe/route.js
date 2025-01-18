import dbConnect from "@/lib/dbConnect";
import Recipe from "@/models/recipe.model";
import User from "@/models/user.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized User",
        },
        { status: 401 }
      );
    }

    const { recipeId } = await req.json();

    if (!recipeId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Data",
        },
        { status: 400 }
      );
    }

    const currUser = await currentUser();
    await dbConnect();

    const user = await User.findOne({
      email: currUser.emailAddresses[0].emailAddress,
    });
    

    if (!user ) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found or Recipe is already saved",
        },
        { status: 404 }
      );
    }

    const isAlreadySaved=user.savedRecipes.includes(recipeId);

    if(isAlreadySaved ) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe was Already saved",
        },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(
        {_id:user._id},
        {
            $push:{
                savedRecipes:recipeId
            }            
        },
        {
            new:true
        }
    );


    return NextResponse.json(
      {
        success: true,
        message: "Recipe Saved Successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error While saving user Recipe: ",error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
