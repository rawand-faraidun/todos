const jwt = require('jsonwebtoken')

const validateToken = (req, res) => {
    return res.status(200).send({
        status: 200,
        success: true,
        message: 'Token is valid'
    })
}

module.exports = validateToken
