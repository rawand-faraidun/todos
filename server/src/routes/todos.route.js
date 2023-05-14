const router = require('express').Router()
const controller = require('../controllers/todos.controller')

router.get('/collection/:id', controller.getAllTodosByCollection)
router.post('/', controller.createTodo)
router.get('/:id', controller.getTodoById)
router.put('/:id', controller.updateTodo)
router.patch('/:id', controller.updateTodoIsCompleted)
router.delete('/:id', controller.deleteTodo)

module.exports = router
