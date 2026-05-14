const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express(); // ✅ MUST BE FIRST

// MIDDLEWARES
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// 🔥 STATIC FILES (FIX YOUR IMAGE ISSUE)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

// ADMIN CREATION
const createAdmin = require("./config/createAdmin");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    await createAdmin();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB Connection Error:", error);
  });

// EXPORT FOR VERCEL
module.exports = app;