import { reviewService } from '../services/review.service'
import { store } from './store.js'
import { ADD_MESSAGE, REMOVE_MESSAGE, SET_MESSAGES } from './message.reducer'
import { SET_SCORE, SET_WATCHED_USER } from './user.reducer'
import { messageService } from '../services/message.service'

// Action Creators
export function getActionRemoveReview(reviewId) {
  return { type: REMOVE_MESSAGE, reviewId }
}
export function getActionAddReview(review) {
  return { type: ADD_MESSAGE, review }
}
export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadMessages() {
  try {
    const messages = await messageService.query()
    store.dispatch({ type: SET_MESSAGES, messages })

  } catch (err) {
    console.log('Messages Action: err in loadMessages', err)
    throw err
  }
}

export async function addReview(review) {
  try {
    const addedReview = await reviewService.add(review)
    store.dispatch(getActionAddReview(addedReview))
    // const { score } = addedReview.byUser
    // store.dispatch({ type: SET_SCORE, score })
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}