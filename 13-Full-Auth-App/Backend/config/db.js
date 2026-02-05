import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(`MongoDB Connected successfully!`);
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
