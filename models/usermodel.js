require('dotenv').config();
const mongoose =require( "mongoose");

mongoose.connect(process.env.DATABASE);


let userSchema=mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        maxLength: 20
    },
    UserEmail:{
        type:String,
        required:true
    },
    UserPassword:{
        type:String,
        required:true,
        minLength:8
        
    },
    UserFavourite:Array
});

const userModel=mongoose.model('Userdb',userSchema);
module.exports={userModel};


