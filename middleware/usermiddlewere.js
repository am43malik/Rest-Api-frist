import Custumerrorhandler from "../error/CustumErrorhandler";
import jsonwebservise from "../error/jsonwebtoken"

const userauth =async (req, res, next) => {
  let auth = req.headers.authorization;
//   console.log(auth);

  if (!auth) {
    return next(Custumerrorhandler.unAuthorized());
  }

  const token = auth.split(' ')[1];


  try {
    const { id, role } = await jsonwebservise.verify(token);

    let user = {
      id, role,
    };

    req.user = user;
    
    next();
  } catch (err) {
    return next(err);
  }
};

export default userauth;
