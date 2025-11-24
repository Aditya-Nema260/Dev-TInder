const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const {viewProfile} = require("../controller/profileController")
const router = express.Router();

router.get("/view", authMiddleware, viewProfile);
router.patch("/edit", authMiddleware, async (req, res) => {});
router.patch("/password", authMiddleware, async (req, res) => {});

module.exports = router;
