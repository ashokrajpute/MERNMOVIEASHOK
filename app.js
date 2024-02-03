require('dotenv').config();
const express =require('express');
const cors=require('cors');
const bodyparser=require('body-parser')
const {userRouter}=require('./Routes/userRoutes');
const app=express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(userRouter);

app.listen(process.env.PORT||8000,()=>{
    console.log('server started at 8000');
});
