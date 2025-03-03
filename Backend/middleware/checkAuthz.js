import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()
export const checkAuth=(req,res,next)=>{
    const authHeader=req.headers['Authorization']
    const accessToken=authHeader?.split(" ")[1]
    if(accessToken){
        return res.status(401).send("Unauthorized")
    }
    jwt.verify(accessToken,process.env.R_SECRET_VAL,(err,user)=>{
        if(err){
            return res.status(401).send("Unauthorized")
        }
        if(user.role==="user"){
            return res.status(401).send("Unauthorized")
        }
    })
    return next()
}