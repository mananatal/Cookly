import mongoose, { Schema }  from 'mongoose';


const userSchema = new Schema({
  name:{
    type:String,
    require:true
  },
  email: {
    type:String,
    require:true,
    unique:true
  },
  image: {
    type:String,
    require:true
  },
  savedRecipes:[
    {
        type:Schema.Types.ObjectId,
        ref:"Recipe",
        unique:true
    }
  ]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User