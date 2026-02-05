import React, { useState } from "react";
import { createPost } from "../apiService";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createPost(formData);
      setMessage(res.message || "Post created successfully!");
      setError("");
      setFormData({ title: "", content: "" });

      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>

        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Create Post
          </h2>

          {message && (
            <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md
                       hover:bg-green-700 transition duration-200 font-semibold"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
