const express = require("express");

const Product = require("../models/Product");
const upload = require("../middleware/upload");

const router = express.Router();


// ADD PRODUCT
router.post(
  "/add",
  upload.single("image"),
  async (req, res) => {

    try {

      console.log(req.body);
      console.log(req.file);

      const {
        name,
        price,
        category,
        description,
        sizes,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message: "Image is required",
        });
      }

      // CREATE SLUG
      const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-");

      const product = new Product({
        name,
        slug,
        price,
        category,
        description,
        sizes: sizes ? sizes.split(",") : [],
        image: req.file.filename,
      });

      await product.save();

      res.status(201).json({
        message: "Product added",
        product,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// GET ALL PRODUCTS
router.get("/", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
});


// GET SINGLE PRODUCT
router.get("/:slug", async (req, res) => {

  try {

    const product = await Product.findOne({
      slug: req.params.slug,
    });

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    res.json(product);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;