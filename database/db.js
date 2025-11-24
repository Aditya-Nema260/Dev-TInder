const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to dev tinder");
    
  } catch (error) {
    console.log("Connection failed", error);
  }
};


module.exports = connectDB