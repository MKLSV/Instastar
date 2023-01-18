import { ImgUploader } from "./img-uploader";


export function CreateStory(story) {

    return (
        <div>
  <ImgUploader story={story} />
            <h1> Hello from create</h1>
        </div>
    )

} 