import dbConnect from "@/lib/dbConnect";
import Rating from "@/models/rating.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Recipe from "@/models/recipe.model";



export async function GET(req){
    try {
        const { userId } = await auth();
        
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"Unauthorized User"
            },{status:401});
        }
    
        const searchParams = req.nextUrl.searchParams;
        const recipeId = searchParams.get('recipeId'); 
        
        const currUser = await currentUser();
        await dbConnect();

        const user=await User.findOne({email:currUser.emailAddresses[0].emailAddress});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found in DB"
            },{status:404});
        }

        const userRating=await Rating.findOne({recipeId,userId:user._id});

        
        if(!userRating){
            return NextResponse.json({
                success:true,
                message:"Rating Found Successfully",
                rating:0
            },{status:200});
        }
        return NextResponse.json({
            success:true,
            message:"Ratings Found Successfully",
            rating:userRating.rating
        },{status:200});

    
    } catch (error) {
        console.error("Error while fetching User Rating: ",error.message);
        
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
    }

}