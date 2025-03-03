import { Router } from "express";
import accounts from "../models/accounts.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import refresh from "../models/refresh.js";

const router = Router();
dotenv.config();

router.post("/login", async (req, res) => {
  const { body } = req;
  if (!body.username || !body.password) {
    return res.status(401).send("All fields are required");
  }

  const userFind = await accounts.findOne({ username: body.username });
  if (!userFind) {
    return res.status(404).send("Unauthorized");
  }

  try {
    const compared = await bcrypt.compare(body.password, userFind.password);
    if (!compared) {
      return res.status(404).send("Unauthorized");
    }

    const accessT = jwt.sign(
      { id: userFind._id, role: "user" },
      process.env.A_SECRET_VAL,
      {
        expiresIn: "15m",
      }
    );
    const refreshT = jwt.sign(
      { id: userFind._id, role: "user" },
      process.env.R_SECRET_VAL,
      {
        expiresIn: "1d",
      }
    );


    const refreshe = new refresh({
      refreshToken: refreshT,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    await refreshe.save();

    res.status(201).send({accessToken:accessT,refreshToken:refreshT});
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

export default router;
