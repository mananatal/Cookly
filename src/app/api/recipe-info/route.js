import dbConnect from "@/lib/dbConnect";
import Rating from "@/models/rating.model";
import Recipe from "@/models/recipe.model";
import User from "@/models/user.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req){
    try {
        const { userId } = await auth();
        
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"Unauthorized Access"
            },{status:401});
        }

        const searchParams = req.nextUrl.searchParams;
        const recipeId = searchParams.get('recipeId');

        const currUser = await currentUser();

        await dbConnect();

        const recipeInfo=await Recipe.findById(recipeId)
                                .populate({
                                    path:"createdBy",
                                    select:"-email"
                                })
                                .exec();

        if(!recipeInfo){
            return NextResponse.json({
                success:false,
                message:"Recipe not found"
            },{status:404});
        }

        const user = await User.findOne({
            email: currUser.emailAddresses[0].emailAddress,
        });
      
        if (!user) {
            return NextResponse.json(
                {
                success: false,
                message: "User not found ",
                },
                { status: 404 }
            );
        }

        const isAlreadySaved=user.savedRecipes.includes(recipeId);

        return NextResponse.json({
            success:true,
            message:"Recipe Found Successfully",
            recipeInfo,
            isAlreadySaved
        },{status:200});

    } catch (error) {
        console.log("Error while fetching recipe detail: ",error.message);
        
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
        
    }
}