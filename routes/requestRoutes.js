const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")


router.get("/interested/:userID", authMiddleware, async (req, res) => {});
router.get("/ignored/:userID", authMiddleware, async (req, res) => {});
router.get("/accepted/:userID", authMiddleware, async (req, res) => {});
router.get("/rejected/:userID", authMiddleware, async (req, res) => {});

module.exports = router;
