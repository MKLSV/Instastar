import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { storyService } from '../services/story.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { filterStorys, loadStorys, removeStory, saveStory } from "../store/story.action.js"
import { StoriesList } from "./stories-list.jsx"
import { StoryFilter } from "../cmps/story-filter.jsx";

export function StoryIndex() {

    const [storys, setStorys] = useState([])

    useEffect(() => {
        loadStorys()
    }, [])

    function loadStorys() {
        carService.query().then(storysToUpdate => {
            setStorys(storysToUpdate)
        })
    }

    function onRemoveStory(storyId) {
        removeStory(storyId)
            .then(() => {
                showSuccessMsg('Story removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove story')
            })
    }

    return <section className='storys-index'>
        <div className="new-story-container">
        <Link className="nice-link" to="/story/edit">Add Story</Link>
        </div>
        {storys && <StoriesList
            storys={storys}
            onRemoveStory={onRemoveStory} />}
    </section>
}
