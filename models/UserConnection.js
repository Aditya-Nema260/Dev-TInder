const mongoose = require("mongoose");

const userConnectionSchema = new mongoose.Schema(
  {
    fromUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    toUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted","rejected","interested","ignored"],
      },
    },

  },
  { timestamps: true }
);



module.exports = mongoose.model("UserConnection",userConnectionSchema)