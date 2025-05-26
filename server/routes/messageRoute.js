const express = require("express")
const Message = require("../models/messageModel")
const auth = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/addMessage", async (req,res) => {
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

router.get("/getMessages" ,async (req,res) => {
    try {
       const messages = await Message.find()
       res.json(messages)
    } catch(error) {
        res.status(500).send() 
    }
})

module.exports = router