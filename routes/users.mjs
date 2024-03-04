import express from "express";
import Users from "../models/Users.mjs";

const router = express.Router()

router.post('/register',async(req,res)=>{
    try{
        const user= Users(req.body)
        await user.save()
        res.send({message: "User Logged In Successfully !"})
    }catch(e){
        res.send({message:e.message})
    }
})
 
router.get('/',async(req,res)=>{
    const user = await Users.find()
    res.send({message:"Data aagia Hai",data:users})
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body

        const user = Users.findOne({email})


        if(!Users){
            res.send({message: "User Nhn Mila muja"})
            return
        }


        const Password= user.comparePassword(password)

if(!Password){
    res.send({message:"Password Galat Hai Bahi"})
    return
}

res.send({message:"User Logged In Succeddfully"})
    }catch(e){
        res.send({message:e.message})
    }

})