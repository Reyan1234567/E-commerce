import mongoose from "mongoose";

const refreshSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default:Date.now
  },
  expiresAt: {
    type: Date,
  },
});

const refresh = mongoose.model("refreshTokens", refreshSchema);
export default refresh;
