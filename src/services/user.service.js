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
    changeScore
}

window.userService = userService

function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}



async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id }) {
    const user = await storageService.get('user', _id)
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, username: user.username, imgUrl: user.imgUrl, savedStoryIds: user.savedStoryIds, following: user.following, followers: user.followers }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    if (!user) _createUser()
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function _createUser() {
    await userService.signup(user)
    await userService.signup(user2)
}

const user = {
    _id: "u101",
    username: "MukoPuko99",
    password: "mukmuk",
    fullname: "Muki Muka",
    imgUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
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


const user2 =  {
    _id: "u102",
    username: "ShukiD12",
    password: "shuki",
    fullname: "Mr.Shuki",
    
    imgUrl: 'https://st.depositphotos.com/1005844/1403/i/600/depositphotos_14039169-stock-photo-young-man-outdoor.jpg',
    following: [
        {
            _id: "u107",
            fullname: "Dudu",
            imgUrl: "http://some-img"
        },
        {
            _id: "u101",
            fullname: "Roberto",
            imgUrl: "http://some-img"
        }
    ],
    followers: [
        {
            _id: "u116",
            fullname: "Don",
            imgUrl: "http://some-img"
        },
        {
            _id: "u126",
            fullname: "Goblin",
            imgUrl: "http://some-img"
        },
        {
            _id: "u136",
            fullname: "Fobim",
            imgUrl: "http://some-img"
        }
    ],
    savedStoryIds: [
        "s105",
        "s112",
        "s124"
    ]
}
// ; (async () => {
//     await userService.signup(user)
//     await userService.signup(user2)
// })()




