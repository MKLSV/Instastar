import { useEffect, useState } from "react";
import { storyService } from "../services/story.service";
import { ImgUploader } from "./img-uploader";




export function CreateStory(story) {

    const [createdStory, SetCreatedStory] = useState(storyService.getEmptyStory())

    function onUploadSuccess(imgUrl) {
        SetCreatedStory(prevState => ({ ...prevState, imgUrl }))
    }


    useEffect(() => {
        console.log(createdStory)
    }, [createdStory])

    return (
        <div>
            <ImgUploader story={story} onUploadSuccess={onUploadSuccess} />
            <h1> Hello from create</h1>
        </div>
    )

} 