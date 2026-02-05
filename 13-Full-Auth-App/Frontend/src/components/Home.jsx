import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../apiService";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const buttonBase =
    "font-semibold py-2 px-6 rounded-lg transition duration-200 focus:outline-none focus:ring-2";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to the Auth App
        </h1>

        {loading ? (
          <p className="text-gray-500 animate-pulse">Loading....</p>
        ) : user ? (
          <div className="space-y-5">
            <p className="text-gray-700">
              Signed in as{" "}
              <span className="font-semibold">{user.email}</span>{" "}
              <span className="text-sm text-gray-500">
                ({user.role})
              </span>
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {user.role === "admin" && (
                <Link
                  to="/create-post"
                  className={`${buttonBase} bg-green-600 hover:bg-green-700 text-white focus:ring-green-400`}
                >
                  Create Post
                </Link>
              )}

              <Link
                to="/posts"
                className={`${buttonBase} ${
                  user.role === "admin"
                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-400"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400"
                } text-white`}
              >
                Show All Posts
              </Link>

              <button
                onClick={handleLogout}
                className={`${buttonBase} bg-red-600 hover:bg-red-700 text-white focus:ring-red-400`}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className={`${buttonBase} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`${buttonBase} bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-400`}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
