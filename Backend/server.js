import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/db.js";
import routes from "./Routes/routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
app.use(routes);
app.use(cookieParser);
dotenv.config();

connect();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
