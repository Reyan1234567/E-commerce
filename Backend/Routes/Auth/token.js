import {Router} from express;
import {config} from "dotenv"
import jwt from "jsonwebtoken"
import refresh from "../../models/refresh.js"
const router=Router()
config()

router.post("/token",async(req,res)=>{
    const {body}=req
    const refreshToken=body.refreshToken
    if(!refreshToken){
        return res.status(401).send("Unauthorized")
    }
    const findRefreshToken=await refresh.findOne({refreshToken})
    if(!findRefreshToken){
        return res.status(401).send("Unauthorized")
    }
    jwt.verify(refreshToken, process.env.R_SECRET_VAL, (err,user)=>{
        if(err){
            return res.status(401).send("Unauthorized")
        }
        res.status(200).send(jwt.sign({id:user._id, role:user},process.env.A_SECRET_VAL))
    })

})
























export default router