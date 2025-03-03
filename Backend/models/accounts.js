import mongoose from "mongoose";

const accountsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
    default:"user"
  }
});

const account = mongoose.model("account", accountsSchema);
export default account;
