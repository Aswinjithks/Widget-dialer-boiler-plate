const jwt = require("jsonwebtoken");
const config = require("../../config");
const isUserAuthenticated=(req,res,next)=>{
const token = req.headers?.["authorization"]?.split(" ")[1];
if(token){
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if(err){
      res.status(401).json({message:"invalid token"});
    }else{
      req.user=decoded;
      next();
    }
});
}}
module.exports = {
  isUserAuthenticated, // authentication for user identity
};
