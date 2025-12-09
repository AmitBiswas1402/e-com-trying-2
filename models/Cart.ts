import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: Number,
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart ||
  mongoose.model("Cart", CartSchema);
