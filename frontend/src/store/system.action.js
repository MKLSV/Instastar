// import { storyService } from "../services/story.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { TOGGLE_MODAL} from "./system.reducer.js";
import { SET_SCORE } from "./user.reducer.js";
import { storyService } from "../services/story.service.js";

// Action Creators:SET_STORIES
export function toggleModal() {

        store.dispatch({
            type: TOGGLE_MODAL
        
        })
}