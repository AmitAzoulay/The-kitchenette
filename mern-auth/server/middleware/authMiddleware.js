function auth(req, res, next){
    try {
        console.log(req.cookies)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = auth