
const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {showFeed} = require("../controller/userController")


router.get("/feed",authMiddleware,showFeed)

module.exports = router