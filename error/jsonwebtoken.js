import  Jwt  from "jsonwebtoken"


class jsonwebservise{
static sign(pyload, expiry='1d' ,secret='12334455y',){
  return  Jwt.sign(pyload,secret, {expiresIn:expiry})
}



static verify(token,secret='12334455y',){
  return Jwt.verify(token,secret,)
}

}


export default jsonwebservise