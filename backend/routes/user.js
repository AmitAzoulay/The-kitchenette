const express = require("express")
const userController = require("../controllers/user")
const cors = require("cors")
const authMiddleware = require("../utils/authMiddleware")
const router = express.Router()

router.use(cors())

router.get("/users", authMiddleware.authenticateToken, userController.getUsers)

module.exports = router