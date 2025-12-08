const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Deprecated in newer Mongoose versions
    // useFindAndModify: false // Deprecated in newer Mongoose versions
  })
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
