const jwt = require("jsonwebtoken")

function auth(req, res, next){
    try {
        
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (verified)
        {
            next()
            return;
        }
        else {
            res.status(401).json({errorMessage: "Unauthorized"}) 
        }
            
    } catch (error) {
        console.log(error)
        res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = auth