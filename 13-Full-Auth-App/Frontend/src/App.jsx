import React from "react";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import AllPosts from "./components/AllPosts";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<AllPosts />} />
      </Routes>
    </>
  );
};

export default App;
