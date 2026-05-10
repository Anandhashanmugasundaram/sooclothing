const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const dbConnect = require("./config/db_con");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();


// DATABASE CONNECTION
dbConnect();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// STATIC FOLDER
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});