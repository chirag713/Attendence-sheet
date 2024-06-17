import mongoose, { Schema } from "mongoose";

const userSchema= new Schema({
    name:String,
    email:{
        type:String,
        required:[true , "Email is required"],
        unique:true,
        dropDups:true,
    },

    password:{
        type:String,
        required:[true , "Password is required"],
    },
    role:String,
    profileurl:String,
    address:{
        street:String,
        city:String,
        state:String,
        country:String,
        pincode:Number
    },
    joiningdae:String
})


export const User= mongoose.models.users || mongoose.model("users" , userSchema);