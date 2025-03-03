import { Router } from "express";
import accounts from "../models/accounts.js";
import bcrypt from "bcrypt"
const router=Router()


router.post ("/signup",async(req,res)=>{
    const {body}=req
    const salt=10
    const userCheck=await accounts.findOne({username:body.username})
    const emailCheck=await accounts.findOne({email:body.email})
    if(!body.username||!body.email||!body.password){
        return res.status(500).send("All fields are required")
    }
    if(userCheck){
        return res.status(500).send("User already in use")
    }
    if(emailCheck){
        return res.status(500).send("email already in use")
    }
    //email isn't verified yet
    const newPassword=await bcrypt.hash(body.password, salt)
    const account=new accounts({
        username:body.username,
        email:body.email,
        password:newPassword
    })
    try{
        const newAccount=account.save()
        res.status(201).send(newAccount)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
})


export default router