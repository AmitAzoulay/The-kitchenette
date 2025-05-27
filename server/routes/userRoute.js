const express = require("express")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { email, displayName, password } = req.body
        if (!email || !displayName || !password) {
            res.status(400).send({ errorMessage: "Please enter all required fields" })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            res.status(400).send({ errorMessage: "An account with this email already exists" })
        }
        
        const newUser = new userModel({
            displayName,
            email,
            password: password,
            isAdmin: false,
        })
        await newUser.save()

        res.status(200).send()

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).send({ errorMessage: "Please enter all required fields" })
        }

        const existingUser = await userModel.findOne({ email })
        

        if (!existingUser) {
            res.status(401).send({ errorMessage: "User does not exist" })
        }

        if (password !== existingUser.password) {
            res.status(401).send({ errorMessage: "Wrong email or password" })
        }

        const token = jwt.sign({
            user: existingUser._id,
            email: email
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        }).send()

    } catch (error) {
        res.status(500).send()
    }
})

router.get("/logout", async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    }).send()
})

router.get("/loggedIn", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch (err) {
        res.json(false);
    }
})

router.get("/current", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" })

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(verified.user).select("-password")

        res.json(user)
    } catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" })
    }
})

router.get("/isAdmin", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(verified.user).select("-password")

        if(user.isAdmin) {
            return res.json(true)
        }
        else {
            res.json(false)
        }
    } catch (err) {
        console.error(err);
        return res.json(false)
    }
})

router.get("/getUsers" ,async (req, res) => {
    try {
        const users = await userModel.find()
        res.json(users)
    } catch(error) {
        res.status(500).send() 
    }
})

router.delete("/delete/:email", async (req, res) => {
    try {
        const deletedUser = await userModel.findOneAndDelete({email: req.params.email})
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        } 
        res.json(deletedUser)
    } catch(error) {
        res.status(500).send() 
    }
})

module.exports = router