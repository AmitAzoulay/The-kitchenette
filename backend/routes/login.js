const express = require("express")
const loginController = require("../controllers/login")
const cors = require("cors")

const router = express.Router()

router.use(cors())

router.post("/login", loginController.login)
router.post("/refresh-token", loginController.refreshToken)

module.exports = router