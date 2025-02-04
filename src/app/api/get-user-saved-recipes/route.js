import dbConnect from "@/lib/dbConnect";
import Recipe from "@/models/recipe.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { auth, currentUser } from '@clerk/nextjs/server'
import Rating from "@/models/rating.model";
import SavedRecipes from "@/app/(app)/saved-recipes/page";

export async function GET(req){
    try {
        const { userId } = await auth();


        if(!userId){
            return NextResponse.json({
                success:false,
                message:"Unauthorized User"
            },{status:401});
        }

        const currUser = await currentUser();

        await dbConnect();

        const userSavedRecipes=await User.findOne({email:currUser.emailAddresses[0].emailAddress})
                                                            .populate({
                                                                path:"savedRecipes",
                                                                populate:{
                                                                    path:"ratings"
                                                                }
                                                            }).exec();

        if(!userSavedRecipes){
            return NextResponse.json({
                success:false,
                message:"User not found "
            },{status:404});
        }


        return NextResponse.json({
            success:true,
            message:"User Saved Recipes Fetched Successfully",
            recipes:userSavedRecipes.savedRecipes
        },{status:200});    

    } catch (error) {
        console.log("Error while fetching user saved recipes: ",error.message);

        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
    }
}