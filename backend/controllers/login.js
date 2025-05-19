const authService = require("../serivces/login")

async function login(req, res) {
    try {
        const { email, password } = req.body
        const token = await authService.login(email, password)
        res.json({ token: token })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Invalid creds" })
    }
}

async function refreshToken(req, res) {
    try {
        const { token } = req.body
        const newToken = await authService.refreshToken(token)
        res.json({ newToken: newToken })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Invalid Token" })
    }
}

module.exports = {
    login,
    refreshToken,
}