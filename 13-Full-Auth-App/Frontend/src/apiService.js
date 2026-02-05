import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:3000/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/post/create`, postData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something wents wrong");
  }
};

export const getAllPost = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/post`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something wents wrong");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Not authenticated");
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
