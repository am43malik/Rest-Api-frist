
import { fstat } from "fs";
import Joi from "joi";
import { now } from "mongoose"
import multer from "multer"
import path from 'path'
import fs from 'fs'
import Custumerrorhandler from "../error/CustumErrorhandler";
import Product from "../model/product";

const storage = multer.diskStorage({
    destination:(req,file,cd)=>cd(null,'uploads/'),
    filename:(req,file,cd)=> {
//   const uniquename = `${Date.now()}-${Math.round(Math.random()*1E9)}
//    ${path.extname(file.originalname)}`;






//-------------- github code---------------
   cd(null,Date.now()+file.originalname)
//    console.log(uniquename)
}})


const handelmulter= multer({storage,limits:{fileSize:1000000*5},}).single('image')


const productsController={
      async store(req,res,next){

     handelmulter (req,res,async(err) =>{
           
        if(err){
            return next(err)
        }
    const filePath= req.file.path
      

    const productSchema =Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required(),
        size:Joi.string().required()
    })

    const {error}= productSchema.validate(req.body)
    if(error){
        fs.unlink(`${appRoot}/${filePath}`,(err)=>{
            if(err){
                
                return next(Custumerrorhandler.server(err.message))
            }

        })
        return next(error)

    }

    const {name,price,size}=req.body
 let document;
    try{
       document= await Product.create({
        name,
        price,
        size,
        image:filePath

       })

    }catch(err){
        return next(Custumerrorhandler.server(err.message))
    }


         res.status(201).json(document)
        //  console.log(document)
  


       })

  },

  update(req,res,next){

    handelmulter (req,res,async(err) =>{
           
        if(err){
            return next(err)
        }
    let filePath;
    
    if(filePath){

        req.file.path
    }
      

    const productSchema =Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required(),
        size:Joi.string().required(),
        image:Joi.string()
    })

    const {error}= productSchema.validate(req.body)
    if(error){
        if(filePath){
            fs.unlink(`${appRoot}/${filePath}`,(err)=>{
                if(err){
                    
                    return next(Custumerrorhandler.server(err.message))
                }
    
            })  
        }
        
        return next(error)

    }

    const {name,price,size}=req.body
 let document;
    try{
       document= await Product.findOneAndUpdate({id:req.params.id},{
        name,
        price,
        size,
        ...(filePath&& {
            image:filePath
        })

       },{new: true})

    }catch(err){
        return next(Custumerrorhandler.server(err.message))
    }


         res.status(201).json(document)
        //  console.log(document)
  


       })

  },

  async destroy(req,res,next){
    let document;
    try{
        document= await Product.findOneAndRemove({id:req.params.id})
      console.log(document)
       const   imagepath= document._doc.image
          
            fs.unlink(`${appRoot}/${imagepath}`,(error)=>{


                if(error){

                    return next(Custumerrorhandler.server())
                }

                
            })
          
          

        if(!document){
            return next(new Error('Nothing  to delete'))
    
        }
    }catch(err){
        return next(err)
    }
     res.json(document)

  },

  async index(req,res,next){
    let document;
    try{
        document = await Product.find().select('-updatedAt -__v').sort({_id:-1})

        if(!document){
            return next(new Error('Document not found'))
        }

    }catch(err){
        return next(err)
    }

     res.json(document)
  },


  async one(req,res,next){
 let document;
    try{
        document= await Product.findOne({id:req.params.id})
        if(!document){
            return next(new Error('Document not found!'))
        }

    }catch(err){
        return next(err)
    }
    return res.status(200).json(document)

  }




}
export default productsController