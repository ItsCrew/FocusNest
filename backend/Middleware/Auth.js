const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(403).json({ message: "Unauthorized" })
}

module.exports = {
    isAuthenticated
}