import dbConnect from "@/lib/dbConnect";
import Recipe from "@/models/recipe.model";
import User from "@/models/user.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req){
   try {
    const { userId } = await auth();
        
    if(!userId){
        return NextResponse.json({
            success:false,
            message:"Unauthorized User"
        },{status:401});
    }
    

    const {selectedRecipes}=await req.json();

    if(!selectedRecipes ){
        return NextResponse.json({
            success:false,
            message:"Missing Data"
        },{status:400});
    }
     
    const currUser = await currentUser();
    await dbConnect();

    const user=await User.findOne({email:currUser.emailAddresses[0].emailAddress});
    if(!user){
        return NextResponse.json({
            success:false,
            message:"User not found "
        },{status:404});
    }
 
     for(let i=0;i<selectedRecipes.length;i++){
         await Recipe.create({
             createdBy:user._id,
             ...selectedRecipes[i]
         });
     }

     return NextResponse.json({
         success:true,
         message:"Recipe Saved Successfully"
     },{status:200});

   } catch (error) {
     return NextResponse.json({
         success:false,
         message:error.message
     },{status:500});    
   }

}