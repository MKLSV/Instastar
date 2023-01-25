export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

const initialState = {
  isLoading: false,
  isModalOpen: false
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case TOGGLE_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen }
    default: return state
  }
}
