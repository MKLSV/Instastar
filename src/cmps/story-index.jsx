import { Link} from "react-router-dom";
import { useEffect, useState } from "react"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { removeStory} from "../store/story.action.js"
import { StoriesList } from "./stories-list.jsx"

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
        console.log('storyId:', storyId);
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
