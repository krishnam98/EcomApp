const { getProducts } = require("../controllers/ProductController");

exports.getProducts = (req, res) => {
  try {
    const products = Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
