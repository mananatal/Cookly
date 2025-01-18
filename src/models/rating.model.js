import mongoose,{Schema} from "mongoose"



const ratingSchema=new Schema({
    recipeId:{
        type:Schema.Types.ObjectId,
        ref:"Recipe",
        require:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    rating:{
        type:Number,
        require:true
    }
},{timestamps:true})

const Rating=mongoose.models.Rating || mongoose.model('Rating',ratingSchema);
export default Rating;