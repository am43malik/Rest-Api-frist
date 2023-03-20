
import mongoose, { model } from "mongoose";

const schema= mongoose.Schema;


  const productSchema = new schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    size:{type:String,required:true},
    image:{type:String,required:true, get:(image)=>{
      return (`http://localhost:3000/${image}`)
    }}
},{timestamps:true,toJSON:{getters:true},id:false})


  export default mongoose.model('Product',productSchema,'products')