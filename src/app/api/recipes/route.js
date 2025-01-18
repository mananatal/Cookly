import dbConnect from "@/lib/dbConnect";
import Recipe from "@/models/recipe.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Rating from "@/models/rating.model";
import User from "@/models/user.model";
export async function GET(req){
    try {
        const { userId } = await auth();
    
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"Unauthorized User"
            },{status:401});
        }

        await dbConnect();

        const recipes=await Recipe.find().populate('createdBy').populate('ratings').sort({createdAt:-1}).exec();

        return NextResponse.json({
            success:true,
            recipes
        },{status:200});    

    } catch (error) {
        console.log("Error while fetching user recipes: ",error.message);
        
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
    }
}