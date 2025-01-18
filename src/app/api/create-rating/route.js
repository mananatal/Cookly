import dbConnect from "@/lib/dbConnect";
import Rating from "@/models/rating.model";
import Recipe from "@/models/recipe.model";
import User from "@/models/user.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import mongoose, { Schema } from "mongoose";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const { userId } = await auth();    
        
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"Unauthorized Access"
            },{status:401});
        }

        const currUser = await currentUser();

        await dbConnect();

        const user=await User.findOne({email:currUser.emailAddresses[0].emailAddress});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found"
            },{status:404});
        }

        const {rating,recipeId}=await req.json();

        if(!rating || !recipeId){
            return NextResponse.json({
                success:false,
                message:"Rating or RecipeId is missing"
            },{status:400});
        }


        const alreadyReviewed=await Rating.findOne({userId:user._id,recipeId});

        let newRating;

        if(alreadyReviewed){
            newRating=await Rating.findByIdAndUpdate(
                {_id:alreadyReviewed?._id},
                {
                    $set:{
                        rating
                    }
                },
                {new:true}
            )
        }
        else{
            newRating=await Rating.create({
                rating,
                recipeId,
                userId:user._id
            });

            await Recipe.findByIdAndUpdate(
                {_id:recipeId},
                {
                    $push:{
                        ratings:new mongoose.Types.ObjectId(`${newRating?._id}`)
                    }
                },
                {
                    new:true
                }
            );
        }
      
        return NextResponse.json({
            success:true,
            message:"Rating Created Successfully",
        },{status:200});
        
    } catch (error) {
        console.error("Error while Create Rating ",error)
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
    }
}