import Joi from "joi";
import jsonwebservise from "../error/jsonwebtoken";
import User  from "../model/user";
import bcrypt from 'bcrypt'
import Custumerrorhandler from "../error/CustumErrorhandler";
import RefreshTOken from "../model/RefreshTOken";


const registerController = {
  async register(req, res, next) {

   const  registerSchema= Joi.object({
                 name:Joi.string().required(),
                 email:Joi.string().email().required(),
                 password:Joi.string().required(),
                  reppassword:Joi.ref("password")
               })

   
    const {error}= registerSchema.validate(req.body)
    if (error) {
      return next(error);
    }
    
    // User Already Exist....

    try{
      const exist= await User.exists({email:req.body.email})

      if(exist){
       return next(Custumerrorhandler.alradyExist('User Already Exist.'))
 
      }
    }catch(error){
  return next(error)
    }

    // bcrypt password...
    const {name,email,password}=req.body

 const hasdPassword =await bcrypt.hash(password,10)

 let  user = new User  ({
  name,
  email,
  password:hasdPassword
 })


 // save code......
 let access_jwt_token;
 let refresf_jwt_token;



try{

   user= await user.save()


     access_jwt_token= jsonwebservise.sign({_id: user._id, role:user.role})
     refresf_jwt_token= jsonwebservise.sign({_id: user._id, role:user.role},'1y','12fgfggg5y')
      
     await RefreshTOken.create({token:refresf_jwt_token})
      
  }catch(error){
    console.log(error)
    return next(error)
  }
  
   res.json({access_jwt_token,refresf_jwt_token});



    
  },
};
export default registerController;



