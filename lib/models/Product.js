import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    typeBreed: { type: String, required: true, trim: true },
    availability: { type: String, enum: ["In Stock", "Out of Stock"], default: "In Stock" },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
