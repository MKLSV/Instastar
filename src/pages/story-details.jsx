import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { MsgForm } from "../cmps/msg-form.jsx";
import { ReviewForm } from "../cmps/review-form.jsx";
import { StoryReviews } from "../cmps/story-reviews.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

import { storyService } from "../services/story.service.js"
import { addReview } from "../store/review.actions.js";

export function StoryDetails() {
    const [story, setStory] = useState(null)
    const [msg, setMsg] = useState({ txt: '' })
    const [review, setReview] = useState({ txt: '' })
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStory()
    }, [])

    function loadStory() {
        storyService.getById(params.storyId)
            .then((story) => setStory(story))
            .catch((err) => {
                console.log('Had issues in story details', err)
                navigate('/story')
            })
    }

    async function addStoryMsg() {
        const msgFromBack = await storyService.onAddStoryMsg(story._id, msg.txt)
        // console.log('msgFromBack:', msgFromBack);
        
        showSuccessMsg(`Msg Added, id:${msgFromBack.id}`)
        navigate('/story')
    }

    async function removeStoryMsg(msgId) {
        await storyService.onRemoveStoryMsg(story._id, msgId)
        showSuccessMsg(`Msg Removed`)
        navigate('/story')
    }

    if (!story) return <div>Loading...</div>
    return <section className="story-details">
        <h1>530 likes</h1>
        <MsgForm msg={msg} setMsg={setMsg} addStoryMsg={addStoryMsg} />
        {story.msgs && <section className="story-msgs">
            <h3>Story Msg:</h3>
            <div>{story.msgs.map(msg => <div key={msg.id} className="msg">{msg.txt} | By: {msg.by.fullname}<button onClick={() => removeStoryMsg(msg.id)}>X</button></div>)}</div>
        </section>}
    </section>
}