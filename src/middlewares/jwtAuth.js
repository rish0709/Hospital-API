import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    // const {jwtToken}=req.cookies;
    console.log(req.headers);
  const token = req.headers["authorization"];
  console.log(token);
  try {
     const authStatus = jwt.verify(token, "CodingNinjas2016");
    // console.log(authStatus);
    req.id = authStatus.userId; 
    

    // res.status(200).json({success:true,msg:"login successfull",authStatus}
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: error });
  }
};

export default jwtAuth;
