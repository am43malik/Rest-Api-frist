import { valid } from "joi";
import Custumerrorhandler from "../error/CustumErrorhandler";
const errorHandller = (error, req, res, next) => {
  let statusCode = 405;
  let data = {
    message: "Internal server Error ",
    orignalError: error.message,
  };

  if (error instanceof valid) {
    data = {
      message: error.message,
    };
  }

if(error instanceof Custumerrorhandler){
  res.status(error.status).json({
    message:error.message
  })
}





  

  return res.status(statusCode).json(data);
};

export default errorHandller;
