const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express(); // ✅ MUST BE FIRST

// MIDDLEWARES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express(); // ✅ MUST BE FIRST

// MIDDLEWARES
app.use(
  cors({
    origin: [
      "https://soclothing.in",
      "https://www.soclothing.in",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());

// 🔥 STATIC FILES (FIX YOUR IMAGE ISSUE)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// ADMIN CREATION
const createAdmin = require("./config/createAdmin");
// ADD THIS with other requires


// ADD THIS with other app.use routes
app.use("/api/payment", paymentRoutes);
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
app.use(express.json());

// 🔥 STATIC FILES (FIX YOUR IMAGE ISSUE)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// ADMIN CREATION
const createAdmin = require("./config/createAdmin");
// ADD THIS with other requires


// ADD THIS with other app.use routes
app.use("/api/payment", paymentRoutes);
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