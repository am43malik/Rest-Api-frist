class Custumerrorhandler extends Error{
  constructor(status,message){
     super() 
       this.status=status,
       this.message=message

    }




    static alradyExist(message){
      return new  Custumerrorhandler(420,message) 

    }


    static wrongcredentials(){
      return new Custumerrorhandler(401,{message:'Worng Email and Password'})
    }
     


    static unAuthorized (){
      return new Custumerrorhandler(401,{message:'unAuthorizedAccess'})
    }


    static notfound (message){
      return new Custumerrorhandler(404,{message:'notfound'})
    }


    static server (message){
      return new Custumerrorhandler(401,'Server Error')
    }

}



export default Custumerrorhandler