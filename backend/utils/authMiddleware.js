const jwt = require("jsonwebtoken")
const { secretKey } = require("../configuration/jwtConfig")
const User = require("../models/user")

async function authenticateToken(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, secretKey, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({ status: true, user: user.username })
            else return res.json({ status: false })
        }
    })
}
function verifyToken(token) {
    jwt.verify(token, secretKey)
}

module.exports = {
    authenticateToken,
    verifyToken,
}