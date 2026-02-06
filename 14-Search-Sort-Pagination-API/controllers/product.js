const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;

  const queryObject = {};

  if (company) queryObject.company = company;
  if (featured) queryObject.featured = featured;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  let result = Product.find(queryObject);

  if (sort) {
    result = result.sort(sort.split(",").join(" "));
  }

  if (select) {
    result = result.select(select.split(",").join(" "));
  }

  //count number of results fetched
  const numOfProducts = await Product.countDocuments(queryObject);

  //pagination
  const products = await result.skip(skip).limit(limit);

  res.status(200).json({
    products,
    numOfProducts,
    page,
  });
};

module.exports = { getAllProducts };
