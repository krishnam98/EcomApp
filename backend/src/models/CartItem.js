const { default: mongoose } = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, default: "mockUser" },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});
