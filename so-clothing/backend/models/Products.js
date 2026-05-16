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
       isSpecialOffer: {
      type: Boolean,
      default: false,
    },

    quantity: {
  type: Number,
  required: true,
  default: 0,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);