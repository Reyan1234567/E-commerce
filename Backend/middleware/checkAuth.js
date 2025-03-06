import jwt from "jsonwebtoken";
import refresh from "../models/refresh";

export const checkAuth = async (req,res,next) => {
  const authHeader = req.headers["Authorization"];
  const accessToken = authHeader.split(" ")[1];
  const refreshToken = authHeader.split(" ")[2];
  try {
    if (!accessToken) {
      return res.status(401).send("Unauthorized");
    }
    const verifiedKey = jwt.verify(accessToken, process.env.A_SECRET_VAL);
    if (!verifiedKey) {
      const refreshCheck = await refresh.findOne({ refreshToken });
      if (!refreshCheck) {
        return res.status(401).send("Unauthorized");
      }
      const verifyRefresh = jwt.verify(refreshCheck, process.env.R_SECRET_VAL);
      if (!verifyRefresh) {
        return res.status(401).send("Unauthorized");
      }
      jwt.sign(
        { id: verifyRefresh.id, role: verifyRefresh.role },
        process.env.A_SECRET_VAL,
        {
          expiresIn: "15m",
        }
      );
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(401).send(error.message)
  }
};
