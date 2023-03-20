import Joi from "joi"
import Custumerrorhandler from "../error/CustumErrorhandler"
import User from "../model/user"
import bcrypt from 'bcrypt'
import jsonwebservise from "../error/jsonwebtoken"

const loginControlle={
   

async login(req,res,next){

    const loginSchma =Joi.object({
        email:Joi.string().email().required(),
                 password:Joi.string().required(),
    })


    const {error}= loginSchma.validate(req.body)
    if (error) {
      return next(error);
    }

// chek pass and email im the database....

try{  

  const user= await  User.findOne({email:req.body.email});
  if(!user){
    return next(Custumerrorhandler.wrongcredentials())

  }
  const password = await bcrypt.compare(req.body.password,user.password)
  if(!password){
    return next(Custumerrorhandler.wrongcredentials())

  }

  let access_jwt_token = jsonwebservise.sign({id:user._id,role:user.role})



  res.json({access_jwt_token})

}catch(err){
    return next(err)

}
  


}




}
export default loginControlle