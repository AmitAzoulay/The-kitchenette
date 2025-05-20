const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const userRoute = require("./routes/user")
const bodyParser = require("body-parser")
const cors = require("cors")
const http = require("http");
const createAdminAccount = require("./scripts/admin")
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use(express.static('public'));
createAdminAccount()
app.use("/user", signupRoute)
app.use("/auth", loginRoute)
app.use("/api", userRoute)

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err))

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',  // Your React frontend URL
    methods: ['GET', 'POST']
  }
});

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