const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error(
        "Access denied no token provided, Please login to continue"
      );
    }

    const user =  jwt.verify(token, "pass");
    console.log("USER", user);

    const { userID } = user;

    console.log("ID", userID);

    req.userInfo = await User.findById(userID);
    req.userId = userID
    console.log("Auth",req.userId);
    


    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = authMiddleware;
