const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim:true,
      minLength: 5,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Please enter valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
       validate(val) {
        if (!validator.isStrongPassword(val)) {
          throw new Error("Please enter strong password");
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    techStack: {
      type: [String],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
      },
    },
    about: {
      type: String,
      default:"this is default about section for every user"
    },
    imageUrl: {
      type: String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      validate(val) {
        if (!validator.isURL(val)) {
          throw new Error("Invalid image URL");
        }
      },
    },
    connectionList: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
