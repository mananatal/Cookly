import dbConnect from "@/lib/dbConnect";
import Recipe from "@/models/recipe.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { auth, currentUser } from '@clerk/nextjs/server'
import Rating from "@/models/rating.model";

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

        const user=await User.findOne({email:currUser.emailAddresses[0].emailAddress});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found in DB"
            },{status:404});
        }

        const userRecipes=await Recipe.find({createdBy:user._id}).populate('createdBy').populate('ratings').sort({createdAt:-1}).exec();

        return NextResponse.json({
            success:true,
            userRecipes
        },{status:200});    

    } catch (error) {
        console.log("Error while fetching user recipes: ",error.message);

        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500});
    }
}