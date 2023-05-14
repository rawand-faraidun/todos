const knex = require('knex')

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        typeCast(field, next) {
            if (field.type == 'BIT') {
                let buffer = field.buffer()
                return buffer[0] == 1
            }
            return next()
        }
    }
})

module.exports = db
