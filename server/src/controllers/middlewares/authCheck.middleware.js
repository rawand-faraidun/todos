const jwt = require('jsonwebtoken')

const authCheck = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            throw new Error('Unauthrized')
        }

        if (!authorization.startsWith('Bearer ')) {
            throw new Error('Unauthorized, please provide token in `Bearer {token}`')
        }

        const token = authorization.split(' ')[1]

        const user = await jwt.verify(token, process.env.JWT_SECRET)
        if (!user) {
            throw new Error('Unauthorized, invalid token')
        }

        req.user = { id: user.id }

        next()
    } catch (err) {
        return res.status(401).send({
            status: 401,
            success: false,
            error: err.message
        })
    }
}

module.exports = authCheck
