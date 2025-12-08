require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const requestRoute = require("./routes/requestRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
const cors = require("cors");
require("./database/db");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", //should not hardcoded
    credentials: true, ///why?   ans this will accept cookies
  })
);

app.use("/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/request", requestRoute);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("SERVER STARTED ON PORT", port); //listen for request on this port
});
