import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(`Db Connected....`);
  } catch (error) {
    console.log(`DB ERROR ${error}`)
  }
};
