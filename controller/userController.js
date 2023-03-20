import Custumerrorhandler from "../error/CustumErrorhandler";

import User from "../model/user";

const userController={
  async  me(req,res,next){

      try{
        const user= await User.findOne({id:req.user._id}).select('-password -updatedAt ')
        if(!user){
            return next(Custumerrorhandler.notfound())
        }
        
           res.json(user)





      }catch(err){
        return next(err)
      }



    }
}

export default userController;