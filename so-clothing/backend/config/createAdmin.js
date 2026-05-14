const bcrypt = require("bcryptjs");

const User = require("../models/Users");

const createAdmin = async () => {

  try {

    // CHECK EXISTING ADMIN
    const adminExists =
      await User.findOne({
        email:
          process.env.ADMIN_EMAIL,
      });

    if (adminExists) {

      console.log(
        "Admin already exists"
      );

      return;
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
      );

    // CREATE ADMIN
    const admin = new User({
      name:
        process.env.ADMIN_NAME,

      email:
        process.env.ADMIN_EMAIL,

      password:
        hashedPassword,

      isAdmin: true,
    });

    await admin.save();

    console.log(
      "Default admin created"
    );

  } catch (error) {

    console.log(error);

  }
};

module.exports = createAdmin;