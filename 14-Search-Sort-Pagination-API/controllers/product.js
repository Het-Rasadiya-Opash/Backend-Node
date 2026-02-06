const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured } = req.query;

  const queryObject = {};

  if (company) queryObject.company = company;
  if (featured) queryObject.featured = featured;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  console.log(queryObject)

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  const products = await Product.find(queryObject)
    .sort(req.query.sort && req.query.sort.split(",").join(" "))
    .select(req.query.select && req.query.select.split(",").join(" "))
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    products,
    nbHits: products.length,
    page,
  });
};

module.exports = { getAllProducts };
