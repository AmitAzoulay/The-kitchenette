const userService = require("../serivces/user")

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

module.exports = {
    getUsers,
}