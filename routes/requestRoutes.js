const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { sendStatus } = require("../controller/requestController");
const { responseRequest } = require("../controller/requestController");

router.post("/send/:status/:toUserID", authMiddleware, sendStatus);
router.post("/response/:status/:requestId", authMiddleware, responseRequest);


module.exports = router;
