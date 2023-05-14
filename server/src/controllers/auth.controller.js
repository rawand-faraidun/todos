const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../db')

/**
 * login user
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const data = await db.select('*').table('user').where('username', username)
        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'User not found'
            })
        }

        const checkPassword = bcrypt.compareSync(password, data[0].password)
        if (!checkPassword) throw new Error('Invailed credentials')

        const token = await jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        return res.status(200).json({
            status: 200,
            success: true,
            data: {
                token,
                id: data[0].id,
                username: data[0].username,
                createdAt: data[0].createdAt
            }
        })
    } catch (err) {
        return res.status(500).json({
            status: 500,
            success: false,
            error: err.message
        })
    }
}

/**
 * register user
 */
const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const hashedPassword = bcrypt.hashSync(password, 10)

        const createdId = await db('user').insert({ username, password: hashedPassword })
        if (createdId.length == 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                error: 'No data added'
            })
        }

        const data = await db
            .select({ id: 'id', username: 'username', createdAt: 'createdAt' })
            .table('user')
            .where('id', createdId[0])
        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'User not found'
            })
        }

        return res.status(200).json({
            status: 200,
            success: true,
            data: data[0]
        })
    } catch (err) {
        if (err.errno == 1062) {
            return res.status(500).json({
                status: 500,
                success: false,
                error: 'Username already taken'
            })
        }

        return res.status(500).json({
            status: 500,
            success: false,
            error: err.message
        })
    }
}

module.exports = {
    login,
    register
}
