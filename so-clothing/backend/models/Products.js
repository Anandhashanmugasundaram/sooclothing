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

    sizes: [
      {
        size: {
          type: String,
        },

        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],

    isSpecialOffer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
