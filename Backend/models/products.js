import mongoose from "mongoose";

const productsSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    alt:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})


const product=mongoose.model("product",productsSchema)
export default product