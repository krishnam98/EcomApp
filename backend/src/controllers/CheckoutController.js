const CartItem = require("../models/CartItem");

exports.checkout = async (req, res, next) => {
  try {
    const userId = "mockUser";
    const items = await CartItem.find({ userId }).populate("product");
    const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    const receipt = {
      total,
      timestamp: new Date().toISOString(),
      items: items.map((i) => ({
        name: i.product.name,
        price: i.product.price,
        qty: i.qty,
      })),
    };

    // Optional: Clear cart after checkout
    await CartItem.deleteMany({ userId });

    res.status(200).json({ receipt });
  } catch (error) {
    next(error);
  }
};
