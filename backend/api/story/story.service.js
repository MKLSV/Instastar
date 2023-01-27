const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')


const DB_NAME = 'story'

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection(DB_NAME)
        const stories = await collection.find().toArray()

        return stories
    } catch (err) {
        logger.error('cannot find stories', err)
        throw err
    }
}

async function getStoryById(storyId) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection(DB_NAME)
        const story = await collection.findOne({ _id: ObjectId(storyId) })

        return story
    } catch (err) {
        logger.error('cannot find story', err)
        throw err
    }
}

async function add(story) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.insertOne(story)
        return story
    } catch (err) {
        logger.error('cannot insert story', err)
        throw err
    }
}

async function update(story) {
    try {
        const updatedStory = {...story}
        delete updatedStory._id
        const collection = await dbService.getCollection(DB_NAME)
        await collection.updateOne({ _id: ObjectId(story._id || req.params.id) }, { $set: updatedStory })
        return story
    } catch (err) {
        logger.error(`cannot update story ${story._id}`, err)
        throw err
    }
}


async function remove(storyId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.deleteOne({ _id: ObjectId(storyId || req.params.id)})
        return storyId
    } catch (err) {
        logger.error(`cannot remove story ${storyId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    getStoryById,
    add,
    update,
    remove
}


