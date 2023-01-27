
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    // update,
    add
}

const DB_NAME = 'user'

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection(DB_NAME)
        var users = await collection.find().toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}


async function getById(userId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const user = await collection.findOne({ _id: ObjectId(userId) })
        delete user.password

        // user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
        // user.givenReviews = user.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })
        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        console.log('username', username)
        const collection = await dbService.getCollection(DB_NAME)
        console.log('collection', collection)
        const user = await collection.findOne({ username })
        console.log('user from getByUsername', user)
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.deleteOne({ _id: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

// async function update(user) {
//     try {
//         // peek only updatable properties
//         const userToSave = {
//             ...user,
//             _id: ObjectId(user._id) // needed for the returnd obj
//         }
//         const collection = await dbService.getCollection(DB_NAME)
//         await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
//         return userToSave
//     } catch (err) {
//         logger.error(`cannot update user ${user._id}`, err)
//         throw err
//     }
// }

async function add(user) {
    try {
        // peek only updatable fields!
        // const userToAdd = {
        //     ...user,
        //     score: 100
        // }
        const collection = await dbService.getCollection(DB_NAME)
        await collection.insertOne(user)
        return user
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.txt) {
//         const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
//         criteria.$or = [
//             {
//                 username: txtCriteria
//             },
//             {
//                 fullname: txtCriteria
//             }
//         ]
//     }
//     if (filterBy.minBalance) {
//         criteria.score = { $gte: filterBy.minBalance }
//     }
//     return criteria
// }




