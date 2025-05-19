const User = require("../models/user")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/jwtUtils")
const { verifyToken } = require("../utils/authMiddleware")

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new Error("User not found")
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordValid) {
            throw new Error("Incorrect password")
        }
        return generateToken(existingUser)
    } catch (err) {
        throw new Error("Invalid creds")
    }
}
async function refreshToken(oldToken) {
    try {
        const decodeToToken = verifyToken(oldToken)
        const user = User.findById(decodeToToken._id)
        if (!user) {
            throw new Error("User not found")
        }
        const newToken = generateToken(user)
        return newToken
    } catch (err) {
        throw new Error("Invalid token")
    }
}
module.exports = {
    login,
    refreshToken,
}