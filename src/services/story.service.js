
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    addStoryMsg
}
window.cs = storyService


async function query(filterBy = { txt: '', price: 0 }) {
    return storageService.query(STORAGE_KEY)
    // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
    // return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    await storageService.remove(STORAGE_KEY, storyId)
    // return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedStory
    if (story._id) {
        savedStory = await storageService.put(STORAGE_KEY, story)
        // savedStory = await httpService.put(`story/${story._id}`, story)

    } else {
        // Later, owner is set by the backend
        // story.owner = userService.getLoggedinUser()
        savedStory = await storageService.post(STORAGE_KEY, story)
        // savedStory = await httpService.post('story', story)
    }
    return savedStory
}

async function addStoryMsg(storyId, txt) {
    const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt })
    return savedMsg
}


function getEmptyStory() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





