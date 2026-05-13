const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.log("❌ MongoDB Connection Error");
    console.log(err.message);

   
  }
};

module.exports = dbConnect;