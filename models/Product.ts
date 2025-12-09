import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    seller: String,
    image: String,
    price: Number,
    oldPrice: Number,
    rating: Number,
    reviews: Number,
    category: String,
    features: [String],
    deliveryDate: String,
    inStock: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
