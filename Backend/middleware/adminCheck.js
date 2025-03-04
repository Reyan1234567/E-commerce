import jwt from "jsonwebtoken"

export const adminCheck=(req,res,next)=>{
    const authHeader=req.headers["Authorization"]
    const accessToken=authHeader.split(" ")[1]
    try {
        if(!accessToken){
            return res.status(401).send("Unauthorized")
        }
        const verifiedKey=jwt.verify(accessToken,process.env.A_SECRET_VAL)
        if(!verifiedKey){
            return res.status(401).send("Unauthorized")
        }
        if(verifiedKey.role===user){
            return res.status(401).send("Unauthorized")
        }
        return next()
    } catch (error) {
        console.log(error)
        res.status(401).send(error.message)
    }
}