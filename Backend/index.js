const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require('./models/Employees');
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/nxtTrend");

app.post('/login',async (req,res)=>{
    const {email,password} = req.body
    const user  = await RegisterModel.findOne({email:req.body.email, password : req.body.password})
    
    .then(user=>{
        
        if(user){
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, "secret123")
            
            // Updated example
            
            return res.json({status : 'ok' , user : token})
        }else{
            res.json("No existed record")
        }
    })
})

app.post('/register', (req,res)=>{
    console.log(req.body)
    RegisterModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=> res.json(err))

})

app.listen(15796, ()=>{
    console.log("server is running")
})