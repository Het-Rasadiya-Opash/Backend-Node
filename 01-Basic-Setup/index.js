const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Create a Server.....");
});

server.listen(3000,()=>{
  console.log('server running');
  
});


// fs.writeFile("hey.txt", "", (err) => {
//   if (err) console.log(err);
//   else console.log("Done");
// });

// fs.appendFile("hey.txt", " add some extra text ", (err) => {
//   if (err) console.log(err);
//   else console.log("Done");
// });

// fs.rename("hey.txt", "hello.txt", (err) => {
//   if (err) console.log(err);
//   else console.log("done");
// });

// fs.copyFile("hello.txt", "./copy/test.txt", (err) => {
//   if (err) console.log(err.message);
//   else console.log("Done");
// });

// fs.unlink('hello.txt',(err)=>{
//     if (err) console.log(err.message);
//   else console.log("Done");
// })

// fs.rm("./html", { recursive: true }, (err) => {
//   if (err) console.log(err.message);
//   else console.log("Done");
// });

// fs.readFile("hey.txt",'utf8', (err, data) => {
//   if (err) console.log(err.message);
// console.log("Done:", data);
// });
