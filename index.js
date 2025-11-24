require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes")
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");

connectDB();
app.use(express.json());
app.use(cookieParser());

app.get("/check", (req, res) => {
  res.status(200).json({
    message: "all good",
  });
});
app.use("/profile",profileRoutes)
app.use("/api/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("SERVER STARTED ON PORT", port);
});
