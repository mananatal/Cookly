import dbConnect from "@/lib/dbConnect";
import Rating from "@/models/rating.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Recipe from "@/models/recipe.model";
import mongoose from "mongoose";



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
        await dbConnect();


        const recentRatings=await Rating.find({recipeId}).populate("userId").limit(5).sort({updatedAt:-1}).exec();

       const totalRatings=await Rating.countDocuments({recipeId});


        const avgRating=await Rating.aggregate([
            {
                $match:{
                    recipeId: new mongoose.Types.ObjectId(recipeId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ])


        if(avgRating.length > 0) {
            const avg=Math.round((avgRating[0].averageRating)*10)/10;
            return NextResponse.json({
                success:true,
                message:"Ratings Found Successfully",
                recentRatings,
                avgRating:avg,
                totalRatings
            },{status:200});
        }

        return NextResponse.json({
            success:true,
            message:"Ratings Found Successfully",
            recentRatings,
            avgRating:0,
            totalRatings
        },{status:200});

    
    } catch (error) {
        console.log("Error while fetching recent Ratings: ",error.message);
        
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
    }

}