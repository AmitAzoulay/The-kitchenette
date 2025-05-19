const jwt = require("jsonwebtoken")
const { secretKey } = require("../configuration/jwtConfig")


async function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization")
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: missing token" })
    }
    const bearer = authHeader.split(" ")[0]
    const token = authHeader.split(" ")[1]
    //console.log(authHeader, bearer, token)
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: invalid token format" })
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Forbidden: invalid token" })
        }
        req.user = user
        next()
    })
}
function verifyToken(token) {
    jwt.verify(token, secretKey)
}

module.exports = {
    authenticateToken,
    verifyToken,
}