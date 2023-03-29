let express=require("express")
let userrouter=express.Router()
const bcrypt = require('bcrypt')
let {UserModel}=require("../model/usermodel")
let jwt = require('jsonwebtoken')


userrouter.post("/register",async(req,res)=>{
        let {email,password}=req.body
        console.log(req.body,"g")
        try{
            let data=await UserModel.findOne({email})
            if(data){
                res.status(400).send({"message":"User already exist, please login"})
            } 
        else{
        bcrypt.hash(password,5,async(err, hash)=>{
            let userdata= new UserModel({
                email:email,
                password:hash
            })
            await userdata.save()
            console.log(userdata,"userdata")
            res.status(200).send({"message":"signup successfull"})
        });
        }
    }
    catch(err){
        res.status(400).send({"message":err.message})
    }
})

userrouter.post("/login",async(req,res)=>{
    let {email,password}=req.body
   try{
      let data=await UserModel.find({email})
      if(data.length>0){
          bcrypt.compare(password,data[0].password,(err, result)=>{
              if(result){
                  res.status(200).send({"message":"login successfull",
              "token":token = jwt.sign({userid:data[0]._id},'sourabh')})
              }
              else{
                  res.status(400).send({"message":"wrong credentials"})
              }
          })
      }
      else{
          res.status(400).send({"message":"register first"})
      }

   }
   catch(err){
      res.status(400).send({"message":err.message})
   }

})

userrouter.get()






module.exports={userrouter}