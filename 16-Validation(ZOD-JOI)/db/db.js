import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(`DB Connected...`);
  } catch (error) {
    console.log(`DB Error : ${error}`);
  }
};
