const jwt = require('jsonwebtoken')


exports.isLoggedIn = (req, res, next) => {
    try {
        const cookie = req.cookies.aBigSecret
        const decoded = jwt.verify(cookie, process.env.JWT_KEY)
        const userId = decoded.userId
        if (req.session.userId === userId) {
            next()
        } else {
            return res.status(401).json({ message: "non authentifié" })
        }

    } catch (e) {
        console.log(e)
        return res.status(401).json({ message: "non authentifié" })
    }
}

exports.isUser = (req, res, next) => {
    if (req.session.userId.toString() === req.params.id.toString()) {
        next()
    } else {
        return res.status(401).json({ message: "non authentifié" })
    }
}