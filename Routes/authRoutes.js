
require('dotenv').config();
const jwt=require('jsonwebtoken'); 
const {userModel} =require('../models/usermodel');
const bcrypt = require('bcrypt');

module.exports.authRoute=async function authRoute(req,res,next){
    try{console.log("=>",req.body.token)
        if(req.body.token){
    var decoded = jwt.verify(req.body.token,process.env.SECRET_KEY);
      console.log(decoded);
      let user=await userModel.findById(decoded.id);
      if(user){
        console.log(user);
        req.UserID=user._id;
        req.UserName=user.UserName;
        req.UserEmail=user.UserEmail;
        req.UserFavourite=user.UserFavourite;
        next();
      }
      else{
        res.json({
            message:"LOGIN FIRST"
        });
      }
        }
        else{
            res.json({
                message:"LOGIN FIRST"
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}


module.exports.authlogin=async function authlogin(req,res,next){
    console.log(req.body);
  try{
      let user=await userModel.findOne({UserEmail:req.body.UserEmail});
      console.log(user);
      if(user){
        let t=bcrypt.compareSync(req.body.UserPassword,user.UserPassword);
        if(t){
          req.UserID=user._id;
          console.log("Yes");
        next();
  
        }
        else{
          res.json({
              message:"Invalid Credentials"
          });
        }
      }else{
          res.json({
              message:"Invalid Credentials"
          });
      }
  
  }catch(err){
      res.json({
          message:err.message
      });
  }
  }


module.exports.delfav=async function delfav(req,res,next){
    try{
        let newfav=req.UserFavourite.filter((movie)=>{
            if(movie==req.body.movie)return false;
            return true;
         });
       req.UserFavourite=newfav;
       next();
    }
    catch(err){
        res.json({
            message:"Unable to remove :"+req.body.movie.original_title
        });
    }

}

  

