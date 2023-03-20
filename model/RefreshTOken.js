import mongoose from "mongoose";
 const Schema= mongoose.Schema;

 const RefreshTokenSchema= new  Schema({
   name:{ type: String, require: true,},

 })


 export default mongoose.model('Refreshtoken',RefreshTokenSchema,'Refreshtokens')