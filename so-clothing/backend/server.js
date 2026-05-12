const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// ADMIN CREATION
const createAdmin = require("./config/createAdmin");

const app = express();
const userRoutes =
  require("./routes/userRoutes");

// MIDDLEWARES
app.use(cors());
app.use(express.json());


// STATIC FILES (UPLOADS)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});


// DATABASE CONNECTION + SERVER START
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {

    console.log("MongoDB Connected");

    // ✅ CREATE DEFAULT ADMIN
    await createAdmin();

    // START SERVER
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 5000}`
      );
    });

  })
  .catch((error) => {
    console.log("DB Connection Error:", error);
  });