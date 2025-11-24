const mongoose = require("mongoose");

const userConnectionSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accept","reject","interested","ignored"],
      },
    },

  },
  { timestamps: true }
);



module.exports = mongoose.model("UserConnection",userConnectionSchema)