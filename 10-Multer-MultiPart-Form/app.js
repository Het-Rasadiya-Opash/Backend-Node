const express = require("express");
const app = express();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("test");
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
});

app.listen(3000, () => {
  console.log(`Server running on 3000`);
});
