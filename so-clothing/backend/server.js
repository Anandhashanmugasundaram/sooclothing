const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

// ADMIN CREATION
const createAdmin = require("./config/createAdmin");

const app = express();

// MIDDLEWARES
app.use(cors());

app.use(express.json());

// ROUTES
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

    // CREATE ADMIN
    await createAdmin();

    // START SERVER
    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(
      "DB Connection Error:",
      error
    );
  });

// EXPORT FOR VERCEL
module.exports = app;