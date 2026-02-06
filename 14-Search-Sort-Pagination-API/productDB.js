require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const ProductJSON = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.DB);

    await Product.create(ProductJSON);

    console.log("Success ");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
