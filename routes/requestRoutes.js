const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { InterestedUser } = require("../controller/requestController");

console.log("IU", InterestedUser);

router.post("/:status/:toUserID", authMiddleware, InterestedUser);
router.post("/ignored/:userID", authMiddleware, async (req, res) => {});
router.post("/accepted/:userID", authMiddleware, async (req, res) => {});
router.post("/rejected/:userID", authMiddleware, async (req, res) => {});

module.exports = router;
