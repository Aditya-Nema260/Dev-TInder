
const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {showFeed} = require("../controller/userController")
const {showRequestList} = require("../controller/userController")
const {showConnection} = require("../controller/userController")


router.get("/feed",authMiddleware,showFeed)
router.get("/requests",authMiddleware,showRequestList)
router.get("/connections",authMiddleware,showConnection)

module.exports = router