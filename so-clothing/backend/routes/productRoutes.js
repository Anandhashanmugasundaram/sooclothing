const express = require("express");
const Product = require("../models/Products");
const upload = require("../middleware/upload");

const router = express.Router();

// =====================================
// ADD PRODUCT
// =====================================
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

  const {
  name,
  price,
  category,
  description,
  sizes,
  quantity,
  isSpecialOffer,
} = req.body;

    // CHECK IMAGE
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    // CREATE SLUG
    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    // BOOLEAN CONVERSION (VERY IMPORTANT)
    const specialOfferFlag = isSpecialOffer === "true";

    // CREATE PRODUCT
    const product = new Product({
      name,
      slug,
      price: Number(price),
      category,
      description,
      sizes: sizes ? sizes.split(",") : [],
      quantity: Number(quantity),
      image: req.file.path,

      // ✅ FIXED FIELD
      isSpecialOffer: specialOfferFlag,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
});

// =====================================
// GET ALL PRODUCTS
// =====================================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
});

// =====================================
// GET SINGLE PRODUCT
// =====================================
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

    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
});

// =====================================
// UPDATE PRODUCT
// =====================================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

  const {
  name,
  price,
  category,
  description,
  sizes,
  quantity,
  isSpecialOffer,
} = req.body;

    product.name = name || product.name;

    product.slug = name
      ? name.toLowerCase().trim().replace(/\s+/g, "-")
      : product.slug;

    product.price = price || product.price;
    product.category = category || product.category;
    product.description = description || product.description;

    product.sizes = sizes ? sizes.split(",") : product.sizes;
    if (quantity !== undefined) {
  product.quantity = Number(quantity);
}

    // ✅ FIX SPECIAL OFFER UPDATE
    if (isSpecialOffer !== undefined) {
      product.isSpecialOffer = isSpecialOffer === "true";
    }

    // UPDATE IMAGE ONLY IF NEW IMAGE EXISTS
    if (req.file) {
  console.log("UPDATED FILE:", req.file);

  product.image = req.file.path;
}

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
});

// =====================================
// DELETE PRODUCT
// =====================================
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
});

module.exports = router;