const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const registerUser = async (req, res) => {
  console.log("REGISTER");

  try {
    const {firstName, email, password } = req.body;

    if(!firstName){
      throw new Error("FirstName is required");
      
    }

    const checkExistingUser = await User.findOne({
      email,
    });

    if (checkExistingUser) {
      throw new Error("User already exist with same email");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Please enter strong password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("HASHED", hashedPassword);

    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    if (newUser) {
      res.status(201).json({
        message: "user registered successfully",
        newUser,
      });
    } else {
      throw new Error("unable create user please try again");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign(
      {
        userID: user._id,
      },
      "pass",
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", accessToken);

    res.status(200).json({
      message: "logged in successfull",
      accessToken,
      user
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  console.log("logout aou");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  
  res.send("User logged out Successfully");
};
module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};
