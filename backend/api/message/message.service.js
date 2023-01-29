const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')


const DB_NAME = 'message'

async function query(filterBy = {}) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        const collection = await dbService.getCollection(DB_NAME)
        const messages = await collection.find({
            $or: [
                { byUserId: ObjectId(loggedinUser._id), toUserId: ObjectId(filterBy.userId) },
                { toUserId: ObjectId(loggedinUser._id), byUserId: ObjectId(filterBy.userId) }
            ]
        }
        ).toArray()
        return messages
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }
}


async function getChats(userId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const messages = await collection.aggregate([
            {
                $match: {
                    $or: [
                        { byUserId: ObjectId(userId) },
                        { toUserId: ObjectId(userId) }
                    ]
                }
            },
            {
                $lookup: {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup: {
                    localField: 'toUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'toUser'
                }
            },
            {
                $unwind: '$toUser'
            },
        ]).toArray()
        return messages
    } catch (err) {
        console.log(err)
    }
}


async function add(message) {
    try {
        const messageToAdd = {
            byUserId: ObjectId(message.byUserId),
            toUserId: ObjectId(message.toUserId),
            txt: message.txt
        }
        const collection = await dbService.getCollection(DB_NAME)
        await collection.insertOne(messageToAdd)
        return messageToAdd
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}


// async function remove(reviewId) {
//     try {
//         const store = asyncLocalStorage.getStore()
//         const { loggedinUser } = store
//         const collection = await dbService.getCollection('review')
//         // remove only if user is owner/admin
//         const criteria = { _id: ObjectId(reviewId) }
//         if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
//         const {deletedCount} = await collection.deleteOne(criteria)
//         return deletedCount
//     } catch (err) {
//         logger.error(`cannot remove review ${reviewId}`, err)
//         throw err
//     }
// }

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    getChats,
    // remove,
    add
}


