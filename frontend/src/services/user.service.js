import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser,
    filterUsers
}

window.userService = userService

function filterUsers(filterBy, users) {
    if (!users.length) return
    const regex = new RegExp(filterBy.txt, 'i')
    users = users.filter(user => {
        return regex.test(user.username)
    })
    return users
}

async function getUsers(filterBy = { txt: '' }) {
    // var users = await storageService.query('user').then(users => users)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     users = users.filter(user => {
    //         return regex.test(user.username)
    //     })
    //     // users = users.filter(user => regex.test(user.unername) || regex.test(car.description))
    // }
    // return users
    return httpService.get(`user`)
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(userToUpdate) {
    // const user = await storageService.get('user', _id)
    // await storageService.put('user', user)

    const user = await httpService.put(`user/${userToUpdate._id}`, userToUpdate)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    // user = { _id: user._id, fullname: user.fullname, username: user.username, imgUrl: user.imgUrl, savedStoryIds: user.savedStoryIds, following: user.following, followers: user.followers }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    if (!user) userService.login(user1)
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



function getEmptyUser() {
    return {
        username: "",
        password: "",
        fullname: "",
        imgUrl: '',
        bio: '',
        following: [],
        followers: [],
        savedStoryIds: []
    }
}

const user1 = {
    username: "Vasya",
    password: "12345",
    fullname: "Vasya Vasilivich",
    imgUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    bio: 'Traveling and sharing my life! Folow me to see more!',
    following: [
        {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img"
        },
        {
            _id: "u100",
            fullname: "Rob",
            imgUrl: "http://some-img"
        }
    ],
    followers: [
        {
            _id: "u115",
            fullname: "Mob",
            imgUrl: "http://some-img"
        },
        {
            _id: "u125",
            fullname: "Gob",
            imgUrl: "http://some-img"
        },
        {
            _id: "u135",
            fullname: "Fob",
            imgUrl: "http://some-img"
        }
    ],
    savedStoryIds: [
        "s104",
        "s111",
        "s123"
    ]
}