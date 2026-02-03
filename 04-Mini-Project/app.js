const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", (req, res) => {
  const { filename } = req.params;
  fs.readFile(`./files/${filename}`, "utf-8", (err, fileData) => {
    res.render("show", { fileData, fileName: filename });
  });
});

app.post("/create", (req, res) => {
  const { title, description } = req.body;
  fs.writeFile(
    `./files/${title.split(" ").join("")}.txt`,
    description,
    (err) => {
      res.redirect("/");
    },
  );
});

app.get("/edit/:filename", (req, res) => {
  const { filename } = req.params;
  res.render("edit", { filename });
});

app.post("/edit/:filename", (req, res) => {
  const oldTitle = req.params.filename;
  const { newTitle } = req.body;

  const oldPath = `./files/${oldTitle}`;
  const newPath = `./files/${newTitle}`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      return res.send("Error renaming file");
    }

    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server Running on 3000");
});
