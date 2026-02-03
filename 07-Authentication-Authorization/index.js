const cookieParser = require("cookie-parser");
const exprees = require("express");
const app = exprees();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cookieParser());

// app.get("/", (req, res) => {
//   //set cookie
//   res.cookie("name", "het");
//   res.send("Done");
// });

// app.get("/read", (req, res) => {
//   //read cookie
//   console.log(req.cookies);
//   res.send("Read Page");
// });

//password encryption

// app.get("/", (req, res) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     console.log(salt);
//     bcrypt.hash("het", salt, (err, hash) => {
//       console.log(hash);
//     });
//   });
// });

//password decryption Compare

// app.get("/", (req, res) => {
//   res.send("Working...");
//   bcrypt.compare(
//     "het",
//     "hashpassword",
//     (err, result) => {
//       console.log(result);
//     },
//   );
// });

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "het@gmail.com" }, "secret");
  res.cookie("token", token);
  res.send("Done");
});

app.get("/read", (req, res) => {
  const data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});

app.listen(3000, () => {
  console.log(`Server is RUnning `);
});
