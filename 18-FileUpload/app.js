import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { dbConnection } from "./DB/db.js";
import router from "./routes/user.js";

const app = express();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on ${process.env.PORT}`);
});
