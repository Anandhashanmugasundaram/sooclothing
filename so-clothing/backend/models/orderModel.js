const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    zip: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: String,
        name: String,
        image: String,
        size: String,
        qty: Number,
        price: Number,
      },
    ],

    // ORDER STATUS
    status: {
      type: String,
      default: "Pending",
    },

    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);