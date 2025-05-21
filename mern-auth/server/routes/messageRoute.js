const express = require("express")
const Message = require("../models/messageModel")
const auth = require("../middleware/authMiddleware")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/", auth, async (req,res) => {
    try {
       const {displayName, message} = req.body
       const newMessage = new Message({
        message,
        displayName,
        sentAt: new Date()
       })
       const savedMessage = await newMessage.save()
       res.json(savedMessage)

    } catch(error) {
        res.status(500).send() 
    }
})

router.get("/", auth, async (req,res) => {
    try {
       const messages = new Message.find()
       res.json(messages)

    } catch(error) {
        res.status(500).send() 
    }
})

module.exports = router