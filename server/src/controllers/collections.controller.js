const db = require('../db')

/**
 * get all collections
 */
const getAllCollections = async (req, res) => {
    try {
        const { id: userId } = req.user

        const data = await db.select('*').table('collection').where('createdBy', userId)

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
 * create collection
 */
const createCollection = async (req, res) => {
    try {
        const { id: userId } = req.user
        const { name } = req.body

        const createdId = await db('collection').insert({ name, createdBy: userId })
        if (createdId.length == 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                error: 'No data added'
            })
        }

        const data = await db.select('*').table('collection').where('id', createdId[0])
        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Collection not found'
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
 * get collection by id
 */
const getCollectionById = async (req, res) => {
    try {
        const { id: userId } = req.user
        const { id } = req.params

        const data = await db.select('*').table('collection').where('id', id).where('createdBy', userId)

        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Collection not found'
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
 * update collection
 */
const updateCollection = async (req, res) => {
    try {
        const { id: userId } = req.user
        const { name } = req.body
        const { id } = req.params

        const isUpdated = await db('collection').where('id', id).where('createdBy', userId).update({ name })
        if (isUpdated == 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                error: 'No data updated'
            })
        }

        const data = await db.select('*').table('collection').where('id', id)
        if (data.length == 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                error: 'Collection not found'
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
 * delete collection
 */
const deleteCollection = async (req, res) => {
    try {
        const { id: userId } = req.user
        const { id } = req.params

        await db('todo').where('collectionId', id).del()
        const isDeleted = await db('collection').where('id', id).where('createdBy', userId).del()
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
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection
}
