import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../apiService";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPost();
        setPosts(res.posts || []);
      } catch (err) {
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading posts...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            All Posts
          </h2>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium
                       hover:bg-blue-700 transition"
          >
            Home
          </button>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            No posts found.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {post.title}
                </h3>

                <p className="text-gray-700 mt-3 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
