const db = require('../db')

/**
 * get all todos
 */
const getAllTodosByCollection = async (req, res) => {
    try {
        const { id: userId } = req.user
        const { id } = req.params

        const data = await db('todo')
            .join('collection', 'collection.id', '=', 'todo.collectionId')
            .select('todo.*')
            .where('todo.collectionId', id)
            .where('collection.createdBy', userId)

        return res.status(200).json({
            status: 200,
            success: true,
            data
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
 * create todo
 */
const createTodo = async (req, res) => {
    try {
        const { id: userId } = req.user
        const { title, collectionId } = req.body

        const collection = await db.select('*').table('collection').where('id', collectionId).where('createdBy', userId)
        if (collection.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Collection not found'
            })
        }

        const createdId = await db('todo').insert({ title, collectionId })
        if (createdId.length == 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                error: 'No data added'
            })
        }

        const data = await db.select('*').table('todo').where('id', createdId[0])
        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Todo not found'
            })
        }

        return res.status(200).json({
            status: 200,
            success: true,
            data: data[0]
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
 * get todo by id
 */
const getTodoById = async (req, res) => {
    /** @todo - filter by user */

    try {
        const { id: userId } = req.user
        const { id } = req.params

        const data = await db('todo')
            .join('collection', 'collection.id', '=', 'todo.collectionId')
            .select('todo.*')
            .where('todo.id', id)
            .where('collection.createdBy', userId)

        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Todo not found'
            })
        }

        return res.status(200).json({
            status: 200,
            success: true,
            data: data[0]
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
 * update todo
 */
const updateTodo = async (req, res) => {
    /** @todo - filter by user */

    try {
        const { id: userId } = req.user
        const { title } = req.body
        const { id } = req.params

        const todo = await db('todo')
            .join('collection', 'collection.id', '=', 'todo.collectionId')
            .select('todo.*')
            .where('todo.id', id)
            .where('collection.createdBy', userId)
        if (todo.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Todo not found'
            })
        }

        const isUpdated = await db('todo').where('id', id).update({ title })
        if (isUpdated == 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                error: 'No data updated'
            })
        }

        const data = await db.select('*').table('todo').where('id', id)
        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Todo not found'
            })
        }

        return res.status(200).json({
            status: 200,
            success: true,
            data: data[0]
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
 * update todo
 */
const updateTodoIsCompleted = async (req, res) => {
    /** @todo - filter by user */

    try {
        const { id: userId } = req.user
        const { isCompleted } = req.body
        const { id } = req.params

        const todo = await db('todo')
            .join('collection', 'collection.id', '=', 'todo.collectionId')
            .select('todo.*')
            .where('todo.id', id)
            .where('collection.createdBy', userId)
        if (todo.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Todo not found'
            })
        }

        const isUpdated = await db('todo').where('id', id).update({ isCompleted })
        if (isUpdated == 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                error: 'No data updated'
            })
        }

        const data = await db.select('*').table('todo').where('id', id)
        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Todo not found'
            })
        }

        return res.status(200).json({
            status: 200,
            success: true,
            data: data[0]
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
 * delete todo
 */
const deleteTodo = async (req, res) => {
    /** @todo - filter by user */

    try {
        const { id: userId } = req.user
        const { id } = req.params

        const todo = await db('todo')
            .join('collection', 'collection.id', '=', 'todo.collectionId')
            .select('todo.*')
            .where('todo.id', id)
            .where('collection.createdBy', userId)
        if (todo.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Todo not found'
            })
        }

        const isDeleted = await db('todo').where('id', id).del()
        if (isDeleted == 0) {
            return res.status(400).json({
                status: 400,
                success: true,
                error: 'No data deleted'
            })
        }

        return res.status(200).json({
            status: 200,
            success: true,
            data: { id }
        })
    } catch (err) {
        return res.status(500).json({
            status: 500,
            success: false,
            error: err.message
        })
    }
}

module.exports = {
    getAllTodosByCollection,
    createTodo,
    getTodoById,
    updateTodo,
    updateTodoIsCompleted,
    deleteTodo
}
