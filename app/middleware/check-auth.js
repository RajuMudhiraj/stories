const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userData = decoded
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: 'Auth failed.'
        })
    }
}

const checkAuthAndAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.isAdmin) {
            req.userData = decoded
            next()
        }
        else {
            return res.status(401).json({
                message: 'User is not an Admin'
            })
        }
    }
    catch (err) {
        return res.status(401).json({
            message: 'Auth failed.'
        })
    }
}

module.exports = { checkAuth, checkAuthAndAdmin }