import express from "express";
import { validateRegister } from "./validator.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  const { error, value } = validateRegister(req.body);
  if (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  console.log(value);
  res.status(200).json({
    value,
  });
});

app.listen(3000, () => {
  console.log(`Server is Running on 3000`);
});
