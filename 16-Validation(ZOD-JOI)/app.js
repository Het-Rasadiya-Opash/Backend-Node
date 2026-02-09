import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/db.js";
import router from "./routes/auth.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
