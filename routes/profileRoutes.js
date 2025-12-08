const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  viewProfile,
  editProfile,
  editPassword,
} = require("../controller/profileController");
const router = express.Router();

router.get("/view", authMiddleware, viewProfile);
router.patch("/edit", authMiddleware, editProfile);
router.patch("/password", authMiddleware, editPassword);

module.exports = router;
