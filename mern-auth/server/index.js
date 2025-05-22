const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const app = express()

const userRoute = require("./routes/userRoute")
const messageRoute = require("./routes/messageRoute")

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
)
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err))

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: process.env.REACT_URL,  // Your React frontend URL
        methods: ['GET', 'POST']
    }
});


app.use("/user", userRoute)
app.use("/chat", messageRoute)

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('chatMessage', (data) => {
        // Save the message to MongoDB and broadcast to all connected clients
        // You'll need to implement this part based on your specific schema and requirements
        console.log(data);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});