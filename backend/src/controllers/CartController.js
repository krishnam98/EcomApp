exports.getCart = async () => {
  try {
    const userId = "mockUser";
    const items = await CartItem.find({ userId }).populate("product");
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );
    res.status(200).json({ items, total });
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, qty = 1 } = req.body;
    const userId = "mockUser";

    if (!productId)
      return res.status(400).json({ message: "productId required" });

    const existing = await CartItem.findOne({ userId, product: productId });

    if (existing) {
      existing.qty += qty;
      await existing.save();
      const populated = await existing.populate("product");
      return res.status(200).json(populated);
    }

    const item = await CartItem.create({ userId, product: productId, qty });
    const populated = await item.populate("product");
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const deleted = await CartItem.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Item removed", deleted });
  } catch (error) {
    next(error);
  }
};
