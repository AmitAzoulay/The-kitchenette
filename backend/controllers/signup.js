const userService = require("../serivces/signup")

async function createUser(req, res){
    try {
        const userData = req.body
        const user = await userService.createUser(userData)
        res.status(201).json({user: user, message: "User created successfully"})
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    createUser, 
}