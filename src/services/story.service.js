
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
  onAddStoryComment,
  onRemoveStoryComment
}
window.ss = storyService

// async function addStoryMsg(storyId, txt) {
//     const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt })
//     return savedMsg
// }

async function onAddStoryComment(storyId, txt, user) {
  const updatedStory = await storageService.get(STORAGE_KEY, storyId)
  updatedStory.comments.push(_createComment(txt, user))
  console.log(updatedStory)
  save(updatedStory)
  // return storageService.post(STORAGE_KEY)
}

function onRemoveStoryComment(storyId) {
  return storageService.remove(STORAGE_KEY, storyId)
}

async function query() {
  const stories = await storageService.query(STORAGE_KEY)
  if (!stories || !stories.length) _createSrories()
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
  const user = userService.getLoggedinUser()
  story.by = {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      imgUrl: user.imgUrl
  }
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

function _createComment(txt, user) {
  return {
    id: _makeId(),
    by: {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      imgUrl: user.imgUrl
    },
    txt
  }
}

function _makeId(length = 4) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getEmptyStory() {

  return {
    _id:  "",
    txt: "",
    imgUrl: [],
    comments: [],
    likedBy: [],
    by: {
      _id: "",
      username: "",
      fullname: "",
      imgUrl: ""
    },
  }
}

function _createSrories() {
  const story = [
    {
      _id: "s103",
      txt: "Exhibition  curated by @giulioaprin presents a spectrum of aerial photographers that push themselves into finding unusual and different point of view bringing us extraordinary facets of our reality.",
      imgUrl: ["https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg", "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
      by: {
        _id: "u101",
        fullname: "Deniska",
        username: "denchik1996",
        imgUrl: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      },
      comments: [
        {
          id: "c1005",
          by: {
            _id: "u105",
            username: "Amarama_1990",
            fullname: "Bob",
            imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            }
          ]
        }, {
          id: "c1001",
          by: {
            _id: "u105",
            username: "miniGun777",
            fullname: "Bob",
            imgUrl: "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg"
          },

          txt: "very nice!",

          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "u106",
            username: "redBread",
            fullname: "Dob",
            imgUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "u105",
          fullname: "Bob",
          imgUrl: "http://some-img"
        },

        {
          _id: "u106",
          fullname: "Dob",
          imgUrl: "http://some-img"
        }
      ]
    },
    {
      _id: "s101",
      txt: "Let Me See Your Likes!",
      imgUrl: ["https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
      by: {
        _id: "u101",
        fullname: "Ulash Ulashi",
        username: "ulash888",
        imgUrl: "https://i.pinimg.com/736x/28/3a/b1/283ab1108ef8e379a2e555de019e1aee.jpg"
      },
      comments: [
        {
          id: "c1001",
          by: {
            _id: "u105",
            fullname: "Bob",
            username: "Amarama_1990",
            imgUrl: "http://some-img"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "u105",
          fullname: "Bob",
          imgUrl: "http://some-img"
        },

        {
          _id: "u106",
          fullname: "Dob",
          imgUrl: "http://some-img"
        }
      ]
    },
    {
      _id: "s102",
      txt: "Best trip ever",
      imgUrl: ["https://images.pexels.com/photos/1540977/pexels-photo-1540977.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
      by: {
        _id: "u102",
        fullname: "Bobby bob",
        username: "RobbyBoby21",
        imgUrl: "https://i.pinimg.com/474x/85/59/09/855909df65727e5c7ba5e11a8c45849a.jpg"
      },
      comments: [
        {
          id: "c1001",
          by: {
            _id: "u105",
            fullname: "Bob",
            username: "Amarama_1990",
            imgUrl: "http://some-img"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "u105",
          fullname: "Bob",
          imgUrl: "http://some-img"
        },

        {
          _id: "u106",
          fullname: "Dob",
          imgUrl: "http://some-img"
        }
      ]
    },
    {
      _id: "s104",
      txt: "Your reaction? 😍",
      imgUrl: ["https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
      by: {
        _id: "u101",
        fullname: "Baron Baton",
        username: "bar_bat_001",
        imgUrl: "https://i.pinimg.com/236x/e9/a5/16/e9a516010926848acc79e80d1670b3ee.jpg"
      },
      comments: [
        {
          id: "c1001",
          by: {
            _id: "u105",
            fullname: "Bob",
            username: "Amarama_1990",
            imgUrl: "http://some-img"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "u105",
          fullname: "Bob",
          imgUrl: "http://some-img"
        },

        {
          _id: "u106",
          fullname: "Dob",
          imgUrl: "http://some-img"
        }
      ]
    },
  ]
  storageService._save(STORAGE_KEY, story)
}

