const express=require('express');
const jwt=require('jsonwebtoken'); 
const {userModel} =require('../models/usermodel');
const {authRoute,authlogin,delfav}=require("./authRoutes");
const bcrypt = require('bcrypt');


let userRouter=express.Router();

userRouter.get('/',(req,res)=>{
    res.json({
        message:"verfied User"
    });
});

userRouter.post('/ut',authRoute,(req,res)=>{
    res.json({
        message:"verfied User"
    });
});

userRouter.post('/login',authlogin,(req,res)=>{
    //console.log(req.UserID);
   try{ let id=req.UserID;
    var token = jwt.sign({ id }, process.env.SECRET_KEY);
    console.log(token);
    res.cookie('AshokCookie',token,{httpOnly:false});
    res.json({
        message:"Succesfully Logined"
    });}
    catch(err){
        res.json({
            message:"Unable to login Please try again"
        });
    }
});


userRouter.post('/register',async (req,res)=>{
    try{
    if(req.body.UserName&&req.body.UserEmail&&req.body.UserPassword){

const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(req.body.UserPassword, salt);

    let data={
        UserName:req.body.UserName,
        UserEmail:req.body.UserEmail,
        UserPassword:hash
    };
    let user=await userModel.create(data);
 if(user){
 res.json({
        message:"i am registered"
    });}
    else[
        res.json({
            message:"NOT REGISTERED"
        })
    ]
}else{
    res.json({
        message:"Enter All Details"
    });
}
}catch(err){
    res.json({
        message:err.message+' backend'
    })
}
});//agar logined he to register na kar paye

userRouter.get('/logout',async (req,res)=>{
 try{
    res.cookie('AshokCookie','',{ maxAge:1});
    res.json({
        message:'Succesfully logout'
    });
 }
 catch(err){
    res.json({
        message:"Unable to Logout"
    });
 }


});//agar logined nahi he tabhi logout ho paye ya khule

userRouter.post('/isauthenticated',authRoute,(req,res)=>{
    res.json({
        message:"verfied User",
        UserName:req.UserName,
        UserEmail:req.UserEmail,
        UserFavourite:req.UserFavourite
    });

});





userRouter.post('/addfav',authRoute,async (req,res)=>{
///here==========>
try{
    let user=await userModel.findOneAndUpdate({_id:req.UserID},{
    UserFavourite:[...req.UserFavourite,req.body.movie]
  });

  console.log(user);
  if(user){
     res.json({
        message:"Succesfully Added :"+req.body.movie.original_title
     });


  }
  else{
    res.json({
        message:"Unable to add :"+req.body.movie.original_title
    });
  }

}
catch(err){
    res.json({
        message:"Unable to add :"+req.body.movie.original_title
    });
}


});


userRouter.post('/deletefav',authRoute,delfav,async (req,res)=>{
    try{
       
       let user=userModel.findOneAndUpdate({_id:req.UserID},{
        UserFavourite:req.UserFavourite
       })

    res.json({
            message:"Succesfully Removed :"+req.body.movie.original_title,
            fav:user.UserFavourite
        });
    }
    catch(err){
        res.json({
            message:"Unable to remove :"+req.body.movie.original_title
        });
    }
});





module.exports={userRouter};