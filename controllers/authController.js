const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        status: 400,
        data: null,
        message: "User already exists",
      });

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPwd,
    });
    await newUser.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: null,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res.status(400).json({
        status: 400,
        data: null,
        message: "no user found with this email",
      });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch)
      return res.status(400).json({
        status: 400,
        data: null,
        message: "wrong password",
      });

    const data = {
      _id: foundUser._id,
      username: foundUser.username,
      role: foundUser.role,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.status(200).json({
      status: 200,
      data: token,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: null,
      message: err.message,
    });
  }
};
