// import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove
}

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(`review${queryStr}`)
  // return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId }) {

  const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  add.reviewService(reviewToAdd)

  await userService.update(reviewToAdd.byUser)
  await httpService.post(`review`, reviewToAdd)
  // const addedReview = await storageService.post('review', reviewToAdd)
  return reviewToAdd
}