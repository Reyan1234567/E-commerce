import { Router } from "express";
import jwt from "jsonwebtoken"
import {config} from configDotenv;
const router=Router()

config()
router.get("/check",(req,res)=>{
    const authHeader=req.headers["Authorization"]
    const accessToken=authHeader.split(" ")[1]
    try{
    const verifiedKey=jwt.verify(accessToken,process.env.A_SECRET_VAL)
    if(!verifiedKey){
        return res.status(401).send("Unauthorized")
    }
    return res.status(200).json(verifiedKey)

}
    catch(err){
        console.log(err)
        res.send(401).send(err.message)
    }
    
})



export default router