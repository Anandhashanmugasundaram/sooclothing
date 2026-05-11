const express = require("express");

const Product = require("../models/Product");

const upload = require("../middleware/upload");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// =====================================
// ADD PRODUCT (ADMIN ONLY)
// =====================================
router.post(
  "/add",
  adminMiddleware,
  upload.single("image"),

  async (req, res) => {

    try {

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const {
        name,
        price,
        category,
        description,
        sizes,
      } = req.body;

      // CHECK IMAGE
      if (!req.file) {

        return res.status(400).json({
          message: "Image is required",
        });

      }

      // CREATE SLUG
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      // CREATE PRODUCT
      const product = new Product({

        name,

        slug,

        price: Number(price),

        category,

        description,

        sizes: sizes
          ? sizes.split(",")
          : [],

        image: req.file.filename,

      });

      // SAVE PRODUCT
      await product.save();

      res.status(201).json({

        message:
          "Product added successfully",

        product,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message ||

          "Server Error",

      });

    }
  }
);


// =====================================
// GET ALL PRODUCTS
// =====================================
router.get("/", async (req, res) => {

  try {

    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    res.status(200).json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message ||

        "Server Error",

    });

  }
});


// =====================================
// GET SINGLE PRODUCT
// =====================================
router.get("/:slug", async (req, res) => {

  try {

    const product =
      await Product.findOne({

        slug:
          req.params.slug,

      });

    // CHECK PRODUCT
    if (!product) {

      return res.status(404).json({

        message:
          "Product not found",

      });

    }

    res.status(200).json(product);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message ||

        "Server Error",

    });

  }
});


// =====================================
// DELETE PRODUCT (ADMIN ONLY)
// =====================================
router.delete(
  "/:id",
  adminMiddleware,

  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      // CHECK PRODUCT
      if (!product) {

        return res.status(404).json({

          message:
            "Product not found",

        });

      }

      // DELETE PRODUCT
      await Product.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        message:
          "Product deleted successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message ||

          "Server Error",

      });

    }
  }
);

module.exports = router;