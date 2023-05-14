const router = require('express').Router()
const prefix = process.env.API_PREFIX || 'api'

// root
router.get('/', (req, res) => res.send('Todos backend'))

// auth
router.use(`/${prefix}/auth`, require('./auth.route'))

// auth check middleware
router.use(require('../controllers/middlewares/authCheck.middleware'))

/// validate token
router.get('/validate', require('../controllers/middlewares/validateToken.middleware'))

// collections
router.use(`/${prefix}/collections`, require('./collections.route'))
// todos
router.use(`/${prefix}/todos`, require('./todos.route'))

// 404
router.use((req, res) =>
    res.status(404).send({
        status: 404,
        success: false,
        error: 'Endpoint not found'
    })
)

module.exports = router
