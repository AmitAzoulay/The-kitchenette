const express = require("express")
const Message = require("../models/messageModel")
const auth = require("../middlewares/authMiddleware")

const router = express.Router()



router.get("/getMessages",auth ,async (req,res) => {
    try {
       const messages = await Message.find()
       res.json(messages)
    } catch(error) {
        res.status(500).send() 
    }
})

module.exports = router