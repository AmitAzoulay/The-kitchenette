const jwt = require("jsonwebtoken")

function adminAuth(req, res, next){
    try {
        
        const token = req.cookies.token;
        console.log("token: ",token)
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        console.log(verified)
        if (verified.isAdmin)
        {
            next()
            return;
        }
        else if(verified && !verified.isAdmin){
            res.status(401).json({errorMessage: "Unauthorized logged in user"}) 
        }
        else {
            res.status(401).json({errorMessage: "Unauthorized not logged in user"}) 
        }
            
    } catch (error) {
        console.log(error)
        res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = adminAuth