import Custumerrorhandler from "../error/CustumErrorhandler"
import User from "../model/user"


const admin = async(req,res,next) => {
  
try{
    const users= await User.findOne({id:req.user._id})
   
    if(users.role === 'admin'){
        next()
    
    }else{
        next(error)

    }
}catch(error){
    return next(error)

}


   
  
     


}

export default admin
