
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'story'
_createSrories()

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    onAddStoryMsg,
    onRemoveStoryMsg
}
window.cs = storyService

// async function addStoryMsg(storyId, txt) {
//     const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt })
//     return savedMsg
// }

function onAddStoryMsg(txt){
    return storageService.post(STORAGE_KEY)
}

function onRemoveStoryMsg() {
    return storageService.remove(STORAGE_KEY, msgId)

}

async function query() {
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

function getEmptyStory() {
    return {
        id: "",
        txt: "",
        imgUrl: "",
        by: {
            _id: "",
            fullname: "",
            imgUrl: ""
        },

    }
}

async function _createSrories() {
    const story = [
        {
            id: "s103",
            txt: "Best trip ever",
            imgUrl: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
            by: {
                _id: "u101",
                fullname: "Deniska",
                imgUrl: "https://robohash.org/Deniska?set=set2"
            },
        },
        {
            id: "s101",
            txt: "Best trip ever",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQts6Lwc6Qnjvkse8MNNRbUCvJSsE0RoEXKVaLM4b6f&s",
            by: {
                _id: "u101",
                fullname: "Ulash Ulashi",
                imgUrl: "https://robohash.org/Ulashi?set=set2"
            },
        },
        {
            id: "s102",
            txt: "Best trip ever",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3-GCC3JniRESwNTjZkcmoEL9MOU59RB7cNrbEbNk&s",
            by: {
                _id: "u102",
                fullname: "Bobby bob",
                imgUrl: "https://robohash.org/Bobby?set=set2"
            },
        },

        {
            id: "s104",
            txt: "Best trip ever",
            imgUrl: "https://www.dictionary.com/e/wp-content/uploads/2018/06/pics-300x300.jpg",
            by: {
                _id: "u101",
                fullname: "Yaron Baton",
                imgUrl: "https://robohash.org/Baton?set=set2"
            },
        }
    ]
    storageService._save(STORAGE_KEY, story)
}

