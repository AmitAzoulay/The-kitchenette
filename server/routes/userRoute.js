const express = require("express")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
//U!n&JJ&iPC-Uwq8zyTu@J*acc!BG$3Ie@S0lvoUa8ye0Syxdro

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

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
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
            secure: true,
        }).send()

    } catch (error) {
        res.status(500).send()
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
            res.status(401).send({ errorMessage: "User doesssssssssss not exists" })
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!passwordCorrect) {
            res.status(401).send({ errorMessage: "Wrong email or password" })
        }

        const token = jwt.sign({
            user: existingUser._id
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