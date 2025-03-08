import { Router } from "express";
import { adminCheck } from "../middleware/adminCheck.js";
const router = Router();

router.get("/items", adminCheck, (req, res) => {
  res.send("the items");
  console.log("items right here");
});

export default router;
