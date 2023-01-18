
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { storyService } from "../services/story.service";
import { ImgUploader } from "./img-uploader";

export function CreateStory(story) {
    const navigate = useNavigate()
    const [createdStory, setCreatedStory] = useState(storyService.getEmptyStory())

    function onUploadSuccess(imgUrl) {
        setCreatedStory(prevState => ({ ...prevState, imgUrl }))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCreatedStory(prevStory => ({ ...prevStory, [field]: value }))
    }

    function onSaveStory(ev) {
        ev.preventDefault()
        storyService.save(createdStory).then((story) => {
            console.log('story saved', story);
            navigate('/')
        })
    }
    return (
        <div>
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