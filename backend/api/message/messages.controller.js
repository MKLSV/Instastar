const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const messageService = require('./message.service')
const asyncLocalStorage = require('../../services/als.service')

async function getMessages(req, res) {
    try {
        let messages = await messageService.query(req.query)
        messages = messages.map(message=>({...message, createdAt: message._id.getTimestamp()}))
        res.send(messages)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function getUserChats(req, res) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        let messages = await messageService.getChats(loggedinUser._id)
        messages = messages.map(message => ({
            id: message._id,
            txt: message.txt,
            byUser: {
                _id: message.byUser._id,
                username: message.byUser.username,
                imgUrl: message.byUser.imgUrl
            },
            toUser: {
                _id: message.toUser._id,
                username: message.toUser.username,
                imgUrl: message.toUser.imgUrl
            },
            createdAt: message._id.getTimestamp()
        }))
        res.send(messages)
    } catch (err) {
        logger.error('Cannot get messages', err)
        res.status(500).send({ err: 'Failed to get messages' })
    }
}

async function addMessage(req, res) {
  try {
    const message = req.body
    const addedMessage = await messageService.add(message)
    // socketService.emitToUser({type: 'message-to-you', data: message, userId: message.toUserId})
    socketService.emitToUser({type: 'message-to-user', data: message, userId: message.toUserId})
    res.json(addedMessage)
  } catch (err) {
    logger.error('Failed to add message', err)
    res.status(500).send({ err: 'Failed to add message' })
  }
}



module.exports = {
    getMessages,
    getUserChats,
    addMessage
    // deleteReview,
    // addReview
}