import mongoose, { Schema }  from 'mongoose';

const userSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email: {
    type:String,
    unique:true
  },
  image: {
    type:String,
    sparse:true
  },
  savedRecipes:[
    {
        type:Schema.Types.ObjectId,
        ref:"Recipe",
    }
  ]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User