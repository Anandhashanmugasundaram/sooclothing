const express = require("express");

const router = express.Router();

const Order = require("../models/orderModel");


// CREATE ORDER
router.post("/", async (req, res) => {
  try {

    console.log("Incoming Order:");
    console.log(req.body);

    const order = await Order.create(req.body);

    console.log("ORDER SAVED");

    res.status(201).json(order);

  } catch (error) {

    console.log("ORDER ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    console.log(
      "ORDERS FETCHED:",
      orders.length
    );

    res.json(orders);

  } catch (error) {

    console.log(
      "FETCH ORDERS ERROR:"
    );

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {

    await Order.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Order deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// UPDATE ORDER STATUS
router.put("/:id", async (req, res) => {
  try {

    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status:
            req.body.status,
        },
        {
          new: true,
        }
      );

    res.json(updatedOrder);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;