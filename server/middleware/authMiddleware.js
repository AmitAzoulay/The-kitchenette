function auth(req, res, next){
    try {
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = auth