import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("App");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "A joke",
      content: "This is a joke",
    },
    {
      id: 2,
      title: "Another joke",
      content: "This is another joke",
    },
    {
      id: 3,
      title: "Funny joke",
      content: "Why don’t programmers like nature? It has too many bugs.",
    },
    {
      id: 4,
      title: "Dad joke",
      content: "I would tell you a UDP joke, but you might not get it.",
    },
    {
      id: 5,
      title: "Tech joke",
      content:
        "There are 10 types of people in the world: those who understand binary and those who don’t.",
    },
  ];
  res.send(jokes);
});

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
