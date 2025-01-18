import dbConnect from "@/lib/dbConnect";
import Rating from "@/models/rating.model";
import Recipe from "@/models/recipe.model";
import User from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
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

        await dbConnect();

        const recipeInfo=await Recipe.findById(recipeId).populate('createdBy').exec();

        if(!recipeInfo){
            return NextResponse.json({
                success:false,
                message:"Recipe not found"
            },{status:404});
        }

        return NextResponse.json({
            success:true,
            message:"Recipe Found Successfully",
            recipeInfo
        },{status:200});

    } catch (error) {
        console.log("Error while fetching recipe detail: ",error.message);
        
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
        
    }
}