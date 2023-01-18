
// const { useNavigate, useParams, Link } = ReactRouterDOM
import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from "react";
import { storyService } from "../services/story.service";
import { ImgUploader } from "./img-uploader";
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"


export function CreateStory(story) {

    const navigate = useNavigate()
    const [createdStory, SetCreatedStory] = useState(storyService.getEmptyStory())

    // useEffect(() => {
    //     console.log(createdStory)
    // }, [createdStory])

    function onUploadSuccess(imgUrl) {
        SetCreatedStory(prevState => ({ ...prevState, imgUrl }))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        SetCreatedStory((prevStory) => ({ ...prevStory, [field]: value }))
    }

    function onSaveStory(ev) {
        ev.preventDefault()
        storyService.save(createdStory).then((story) => {
            console.log('story saved', story);
            // showSuccessMsg('Story saved!')
            navigate('/')
        })
    }
    return (
        <div>
            <h1> Hello from create</h1>
            <ImgUploader story={story} onUploadSuccess={onUploadSuccess} />
            {createdStory.imgUrl && <img src={createdStory.imgUrl}/>}
            <form onSubmit={onSaveStory}>
                <label htmlFor="text">your post: </label>
                <input type="text"
                    name="txt"
                    id="txt"
                    placeholder="Enter your post"
                    value={createdStory.txt}
                    onChange={handleChange}

                />
            </form>
        </div>
    )

} 