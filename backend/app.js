const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const bodyParser = require("body-parser")
const cors = require("cors")
const createAdminAccount = require("./scripts/admin")
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
createAdminAccount()
app.use("/user", signupRoute)
app.use("/auth", loginRoute)
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})