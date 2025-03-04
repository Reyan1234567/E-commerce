import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/db.js";
import routes from "./Routes/routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(routes);

connect();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
