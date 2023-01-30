const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const { getStories, getStoryById, addStory, updateStory, removeStory, storyNotification } = require('./story.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', log, getStories)
router.get('/', getStories)
router.get('/:id', getStoryById)
router.post('/', requireAuth, addStory)
router.put('/:id', updateStory)
router.post('/notification', storyNotification)
router.delete('/:id', removeStory)

// router.post('/:id/msg', requireAuth, addCarMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeCarMsg)

module.exports = router