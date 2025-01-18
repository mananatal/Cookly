import mongoose,{Schema} from "mongoose";



const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: { 
        type: String,  
        required: true 
    },
});


const recipeSchema=new Schema({
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        require:true,
        unique:true
    },
    ingredients:[ingredientSchema],
    instructions:[
        {
            type:String,
            require:true
        }
    ],
    serving:{
        type:String,
        require:true
    },
    timeToCook:{
        type:Number,
        require:true
    },
    difficultyLevel:{
        type:String,
        require:true
    },
    dietaryPreference: [
        { 
            type: String, 
            required: true 
        }
    ],
    additionalInformation:{
        tips: { 
            type: String,
            required: true            
         },
        variations: { 
            type: String, 
            required: true 
        },
        servingSuggestions: { 
            type: String, 
            required: true
        },
        nutritionalInformation: {
             type: String, 
             required: true 
        },
    },
    ratings: [
        {
            type:Schema.Types.ObjectId,
            ref:"Rating"
        }
    ]

},{timestamps:true});

const Recipe=mongoose.models.Recipe || mongoose.model('Recipe',recipeSchema);
export default Recipe