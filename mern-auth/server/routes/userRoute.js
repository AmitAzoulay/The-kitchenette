const express = require("express")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//U!n&JJ&iPC-Uwq8zyTu@J*acc!BG$3Ie@S0lvoUa8ye0Syxdro

const router = express.Router()

router.post("/register", async (req,res) => {
    try {
        const {email, displayName, password} = req.body
       
        console.log(email, displayName, password)
        if(!email || !displayName || !password) {
            res.status(400).send({errorMessage: "Please enter all required fields"})
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser) {
             res.status(400).send({errorMessage: "An account with this email already exists"})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword =  await bcrypt.hash(password, salt)
        const newUser = new userModel({
            displayName,
            email,
            password: hashedPassword,
            isAdmin: false,
        })
        const savedUser = await newUser.save()
        
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
        }).send()

    } catch(error) {
        res.status(500).send()
    }
})

router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            res.status(400).send({errorMessage: "Please enter all required fields"})
        }
        const existingUser = await userModel.findOne({email})
        if(!existingUser) {
             res.status(401).send({errorMessage: "User doesssssssssss not exists"})
        }
        
        const passwordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!passwordCorrect) {
             res.status(401).send({errorMessage: "Wrong email or password"})
        }

        const token = jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
        }).send()

    } catch(error) {
        res.status(500).send()
    }
})

router.get("/logout", async (req,res) => {
    res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        }).send()
})

router.get("/loggedIn", async (req,res) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({errorMessage: "Unauthorized"})
        }

        jwt.verify(token, process.env.JWT_SECRET)
        res.json(true)
    } catch (error) {
        console.log(error)
        res.json(false)
    }
})

module.exports = router