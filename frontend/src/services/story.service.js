
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'story'
export const storyService = {
  query,
  getById,
  save,
  remove,
  getEmptyStory,
  onRemoveStoryComment,
  saveLike,
  createComment,
  sendNotif
}
window.ss = storyService

// async function onAddStoryComment(storyId, comment) {
//   // const updatedStory = await storageService.get(STORAGE_KEY, storyId)
//   const updatedStory = await getById(storyId)
//   updatedStory.comments.push(comment)
//   save(updatedStory)
//   // return storageService.post(STORAGE_KEY)
// }

function onRemoveStoryComment(storyId) {
  return storageService.remove(STORAGE_KEY, storyId)
}

async function query() {
  try {
    let stories = await httpService.get(STORAGE_KEY)
    return stories.reverse() // TODO: ADD FILTER BY!
  } catch (err) {
    console.log(err)
    throw err
  }

  // const stories = await storageService.query(STORAGE_KEY)
  // if (!stories || !stories.length) _createSrories()
  // return storageService.query(STORAGE_KEY)
  // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(storyId) {
  // return storageService.get(STORAGE_KEY, storyId)
  return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
  // await storageService.remove(STORAGE_KEY, storyId)
  return httpService.delete(`story/${storyId}`)
}

async function sendNotif(notif) {
  await httpService.post(`story/notification`, notif)
}

async function save(story) {
  var savedStory
  if (story._id) {
    // savedStory = await storageService.put(STORAGE_KEY, story)
    savedStory = await httpService.put(`story/${story._id}`, story)

  } else {
    // Later, owner is set by the backend
    // story.owner = userService.getLoggedinUser()
    const user = userService.getLoggedinUser()
    console.log(story)
    story.by = {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      imgUrl: user.imgUrl
    }
    // savedStory = await storageService.post(STORAGE_KEY, story)
    savedStory = await httpService.post('story', story)
  }
  console.log(savedStory)
  return savedStory
}

async function saveLike(story) {
  var savedStory = await storageService.put(STORAGE_KEY, story)
  return savedStory
}

function createComment(txt, user) {
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
    // _id: "",
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
      _id: "s104",
      txt: "Exhibition  curated by @giulioaprin presents a spectrum of aerial photographers that push themselves into finding unusual and different point of view bringing us extraordinary facets of our reality.",
      imgUrl: ["https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg", "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"],
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
              username: "Amarama_1990",
              fullname: "Bob",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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
              username: "Amarama_1990",
              fullname: "Bob",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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
          username: "Amarama_1990",
          imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg"
        },

        {
          _id: "u106",
          fullname: "Dob",
          username: "Doby_90",
          imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
        },

        {
          _id: "7zLay",
          fullname: "Muki Muka",
          username: "Mukomik",
          imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        }
      ]
    },
    {
      _id: "s111",
      txt: "Let Me See Your Likes!",
      imgUrl: ["https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
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
            imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              username: "Amarama_1990",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "u106",
            fullname: "Dob",
            username: "Doby_90",
            imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "u105",
          fullname: "Bob",
          username: "Amarama_1990",
          imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        },

        {
          _id: "u106",
          fullname: "Dob",
          username: "Doby_90",
          imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
        }
      ]
    },
    {
      _id: "s123",
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
            imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              username: "Amarama_1990",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "u106",
            fullname: "Dob",
            username: "Doby_90",
            imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "u105",
          fullname: "Bob",
          username: "Amarama_1990",
          imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        },

        {
          _id: "u106",
          fullname: "Dob",
          username: "Doby_90",
          imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
        }
      ]
    },
    {
      _id: "s108",
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
            imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          },

          txt: "good one!",

          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              username: "Amarama_1990",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
            }
          ]
        },

        {
          id: "c1002",
          by: {
            _id: "u106",
            fullname: "Dob",
            username: "Doby_90",
            imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
          },
          txt: "not good!"
        }
      ],

      likedBy: [
        {
          _id: "u105",
          username: "Amarama_1990",
          fullname: "Bob",
          imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        },

        {
          _id: "u106",
          fullname: "Dob",
          username: "Doby_90",
          imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
        }
      ]
    },
    {
      _id: "s105",
      txt: "זמן מוגבל | עד גמר המלאי | ההנחה רק על המלאי הקיים | משלוחים, החזרות והחלפה ראשונה חינם בכל קנייה מעל 400₪ | ללא כפל מבצעים",
      imgUrl: ["https://media.cntraveler.com/photos/6372794f6b04ae53c818dffc/3:4/w_1476,h_1968,c_limit/Tote%20Bags-2022_00-Lede.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT519pWn4flL9yEPn8BZgqpXos2xiTOpa2sQA&usqp=CAU"],
      by: {
        _id: "seller1",
        fullname: "Lady Shoes & Bags 👠",
        username: "lady_shoes_and_bags",
        imgUrl: "https://cdn.shopify.com/s/files/1/0074/6320/7027/articles/ultimate-guide-to-womens-bags_2048x.jpg?v=1572446822"
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

          txt: "אלוהים אדירים , איזה מחיר מציע !",

          likedBy: [
            {
              _id: "u105",
              username: "Amarama_1990",
              fullname: "Bob",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",

            },

            {
              _id: "u106",
              fullname: "Dob",
              username: "Doby_90",
              imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
            },

            {
              _id: "u101",
              fullname: "Baron Baton",
              username: "bar_bat_001",
              imgUrl: "https://i.pinimg.com/236x/e9/a5/16/e9a516010926848acc79e80d1670b3ee.jpg"
            },

          ]
        },

        {
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
              username: "Amarama_1990",
              fullname: "Bob",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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
          txt: "This sale is on fire , keep this spirit"
        }
      ],

      likedBy: [
        {
          _id: "u105",
          fullname: "Bob",
          username: "Amarama_1990",
          imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg"
        },

        {
          _id: "u106",
          fullname: "Dob",
          username: "Doby_90",
          imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
        },

        {
          _id: "7zLay",
          fullname: "Muki Muka",
          username: "Mukomik",
          imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        },

      ]
    },
    {
      _id: "s106",
      txt: "worldwide shipping",
      imgUrl: ["https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-cruise-23-femme2/folder-prelaunch/m9334utzqm928/38188347-1-eng-GB/m9334utzqm928_1440_1200.png",
        "https://cdn.cliqueinc.com/posts/295126/best-dior-bags-295126-1658183714371-main.700x0c.jpg",
        "https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-cruise-23-femme2/m1286zmdwm884/38149056-1-eng-GB/m1286zmdwm884_1440_1200.jpg"],
      by: {
        _id: "seller2",
        fullname: "myibags",
        username: "myibags",
        imgUrl: "https://assets.vogue.com/photos/615347cdd43372473562f36d/4:3/w_939,h_704,c_limit/1216-VO-WELL27-02.jpg"
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
              username: "Amarama_1990",
              fullname: "Bob",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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
              username: "Amarama_1990",
              fullname: "Bob",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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
          username: "Amarama_1990",
          imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg"
        },

        {
          _id: "u106",
          fullname: "Dob",
          username: "Doby_90",
          imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
        },

        {
          _id: "7zLay",
          fullname: "Muki Muka",
          username: "Mukomik",
          imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        }
      ]
    },

    {
      _id: "s107",
      txt: "",
      imgUrl: ["https://cdn.cliqueinc.com/posts/281381/most-popular-chanel-bags-281381-1563835000997-main.700x0c.jpg",
        "https://kdvr.com/wp-content/uploads/sites/11/2022/06/000_x-best-chanel-handbag-lookalikes-a5fb98.jpg?w=1280",
        "https://www.telegraph.co.uk/content/dam/luxury/2021/10/21/GettyImages-1044474606_trans_NvBQzQNjv4BqLzLrDmuUc_Tf9Lumyc958K7Dp_leXmjl6IfADRfEYQs.jpg"],
      by: {
        _id: "seller3",
        fullname: "chanelofficial",
        username: "chanelofficial",
        imgUrl: "http://cdn.shopify.com/s/files/1/0434/3103/5031/products/Sticker-autocollant-Logo-chanel-metallique-Deco-Sticker-Store-412.png?v=1672147188"
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
              username: "Amarama_1990",
              fullname: "Bob",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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
              username: "Amarama_1990",
              fullname: "Bob",
              imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
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
          username: "Amarama_1990",
          imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg"
        },

        {
          _id: "u106",
          fullname: "Dob",
          username: "Doby_90",
          imgUrl: "https://i.pinimg.com/736x/90/bb/27/90bb272181024a601488c2e17affc743.jpg"
        },

        {
          _id: "7zLay",
          fullname: "Muki Muka",
          username: "Mukomik",
          imgUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        }
      ]
    },


  ]

  storageService._save(STORAGE_KEY, story)
}

