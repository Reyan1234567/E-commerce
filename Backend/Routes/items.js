import { Router } from "express";
import { checkAuth } from "../middleware/adminCheck.js";
const router=Router()

router.get("/items",checkAuth,(req,res)=>{
    res.send("the items")
    console.log("items right here")
})









export default router