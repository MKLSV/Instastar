const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {getMessages, getUserChats, addMessage} = require('./messages.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getMessages)
router.get('/userChats', log, getUserChats)
router.get('/:userId', log, getMessages)
router.post('/',  log, addMessage)
// router.delete('/:id',  deleteReview)

module.exports = router