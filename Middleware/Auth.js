const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(403).json({ message: "Unauthorized" })
}

const isAuthenticatedForPages = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/google')
}

module.exports = {
    isAuthenticated,
    isAuthenticatedForPages
}