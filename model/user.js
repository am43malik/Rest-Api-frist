import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Userschema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:'custmer'}

},{timestamps:true})


export default mongoose.model('User',Userschema,'users')