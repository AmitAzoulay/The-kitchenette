const User = require ("../models/user")
const bcrypt = require("bcrypt")

async function createAdminAccount(userData) {
    try {
        const existingAdmin = await User.findOne({email: "marchen@test.com"})
        if(!existingAdmin) {
            const newAdmin = new User({
                email: "marchen@test.com",
                name: "Admin",
                password: await bcrypt.hash("admin",10),
                role: "admin"
            })
            await newAdmin.save()
            console.log("admin account created successfully")
        }
        else {
            console.log("Admin Already exist.")
        }
    } catch(err) {
        console.error(err.message)
    }
}

module.exports = createAdminAccount