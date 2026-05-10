const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,

    slug: {
      type: String,
      unique: true,
    },

    price: Number,

    category: String,

    description: String,

    image: String,

    sizes: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);