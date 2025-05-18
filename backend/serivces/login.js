const User = require ("../models/user")
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/jwtUtils")

async function login(email, password) {
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser) {
            throw new Error("User not found")
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordValid) {
            throw new Error("Incorrect password")
        }
        return generateToken(existingUser)
    } catch (err) {
        throw new Error("Invalid creds")
    }
}

module.exports = {
    login,
}