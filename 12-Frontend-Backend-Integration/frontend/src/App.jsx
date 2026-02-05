import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  console.log(import.meta.env.VITE_API_URL)
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/jokes`)
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <h1>Frontend </h1>
      <p>Jokes : {jokes.length}</p>
      {jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  );
};

export default App;
