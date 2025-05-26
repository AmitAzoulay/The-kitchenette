function auth(req, res, next){
    try {
        const token = req.cookies.token;
        if (token)
        {
            next()
        }      
        res.status(401).json({errorMessage: "Unauthorized"})
    } catch (error) {
        console.log(error)
        res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = auth