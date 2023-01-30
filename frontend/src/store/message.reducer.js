export const SET_MESSAGES = 'SET_MESSAGES'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const NEW_MESSAGE = 'NEW_MESSAGE'


const initialState = {
  messages: [],
  newMessage: false,
  
}

export function messageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, messages: action.messages }
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] }
    case REMOVE_MESSAGE:
      return { ...state, messages: state.messages.filter(message => message._id !== action.messageId) }
    case NEW_MESSAGE:
      return { ...state, newMessage: action }



    default:
      return state
  }
}
