const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator")


const viewProfile = async (req, res) => {
  try {
    const user = req.userInfo;
    res.status(200).json({
      message: `Here's the profile of ${user.firstName}`,
      user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const editProfile = async (req, res) => {
  const editableFeild = [
    "firstName",
    "lastName",
    "email",
    "age",
    "techStack",
    "gender",
    "about",
    "imageUrl",
  ];

  const isEditEditable = Object.keys(req.body).every((field) => {
    editableFeild.includes(field);
    console.log(editableFeild.includes(field));
    return editableFeild.includes(field);
  });
  try {
    if (!isEditEditable) {
      throw new Error("Invalid edit reqest");
    }
    const userId = req.userId;
    console.log("hello");

    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "User edited",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const editPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { password } = req.userInfo;
    console.log(password);

    const isCorrectPassword = await bcrypt.compare(currentPassword, password);
    if (!isCorrectPassword) {
      throw new Error("Wrong current password");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("New password did not match with Confirm password");
    }
    if (newPassword == currentPassword) {
      throw new Error("You can not use previous password");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Please enter strong password");
    }

    const userId = req.userId;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).send(`${user.firstName} your password is changed`);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { editProfile, viewProfile, editPassword };
