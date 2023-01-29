import { storageService } from './async-storage.service'
import { httpService } from './http.service'

import { socketService, SOCKET_MESSAEGE_TO_USER } from './socket.service'
import { getActionAddReview } from '../store/message.actions'
import { store } from '../store/store'


(() => {
    socketService.on(SOCKET_MESSAEGE_TO_USER, (message) => {
        console.log('GOT from socket', message)
        store.dispatch(getActionAddReview(message))
    })
    // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
    //     showSuccessMsg(`New review about me ${review.txt}`)
    // })
})()


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