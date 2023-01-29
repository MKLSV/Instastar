import { storageService } from './async-storage.service'
import { httpService } from './http.service'


export const messageService = {
    add,
    query,
    remove,
    getAvailableChats
}

function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?userId=${filterBy.userId}`
    return httpService.get(`message${queryStr}`)
}

async function getAvailableChats() {
    try {
        return await httpService.get('message/userChats')
    } catch (err) {
        console.log(err)
    }
}

async function add(messageToSend) {
    await httpService.post(`message`, messageToSend)
    return messageToSend
}

async function remove(reviewId) {
    // await httpService.delete(`review/${reviewId}`)
    await storageService.remove('review', reviewId)
}