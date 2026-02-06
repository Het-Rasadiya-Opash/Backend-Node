const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name must be provided"],
    },
    price: {
      type: Number,
      required: [true, "Price must be provided"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    company: {
      type: String,
      enum: {
        values: ["apple", "samsung", "dell", "mi"],
        message: `{VALUE} is not supported`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
