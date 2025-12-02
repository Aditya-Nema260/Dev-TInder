require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes")
const requestRoute = require("./routes/requestRoutes")
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
const cors = require("cors");
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : "http://localhost:5173",
  credentials: true,
}));

app.get("/check", (req, res) => {
  res.status(200).json({
    message: "all good",
  });
});
app.use("/profile",profileRoutes)
app.use("/api/auth", authRoutes);
app.use("/request",requestRoute)
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("SERVER STARTED ON PORT", port);
});
