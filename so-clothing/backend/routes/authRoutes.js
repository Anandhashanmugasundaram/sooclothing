const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/temp");

const router = express.Router();


// REGISTER
router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      // CHECK USER
      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER
      const user = new User({
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
      });

      await user.save();

      res.status(201).json({
        message:
          "User registered successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


// LOGIN
router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      // FIND USER
      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(400).json({
          message:
            "Invalid email",
        });
      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Invalid password",
        });
      }

      // CREATE TOKEN
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // RESPONSE
      res.status(200).json({
        message:
          "Login successful",

        token,

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin:
            user.isAdmin,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

module.exports = router;