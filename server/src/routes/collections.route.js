const router = require('express').Router()
const controller = require('../controllers/collections.controller')

router.get('/', controller.getAllCollections)
router.post('/', controller.createCollection)
router.get('/:id', controller.getCollectionById)
router.put('/:id', controller.updateCollection)
router.delete('/:id', controller.deleteCollection)

module.exports = router
