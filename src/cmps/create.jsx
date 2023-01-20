
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { storyService } from "../services/story.service";
import { ImgUploader } from "./img-uploader";
import { useSelector } from 'react-redux';

export function CreateStory(story) {
    const navigate = useNavigate()
    const [createdStory, setCreatedStory] = useState(storyService.getEmptyStory())
    console.log('CSTRY', createdStory)
    const logedinUser = useSelector(storeState => storeState.userModule.user)

    

    function onUploadSuccess(imgUrl) {
        setCreatedStory(prevState => ({ ...prevState, imgUrl: [imgUrl] }))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCreatedStory(prevStory => ({ ...prevStory, [field]: value }))
    }

    function onSaveStory(ev) {
        ev.preventDefault()
        console.log(createdStory)
        storyService.save(createdStory).then((story) => {
            console.log('story saved', story);
            navigate('/')
        })
    }
    function onClose() {
        navigate(-1)
    }
    return (
        <div className='create-page'>
            <div className='create-post'>
                <header>
                    <a onClick={onClose}><i className="fa-solid fa-arrow-left"></i></a>
                    <span>Create new post</span>
                    <a className='share-btn' onClick={onSaveStory}>Share</a>
                </header>
                <div className='create-post-container'>
                    <section className='img-section'>
                        {createdStory.imgUrl.length ? <img src={createdStory.imgUrl} /> :
                            <ImgUploader story={story} onUploadSuccess={onUploadSuccess} />}

                        {/* <ImgUploader story={story} onUploadSuccess={onUploadSuccess} />
                        {createdStory.imgUrl && <img src={createdStory.imgUrl} />} */}
                    </section>
                    <section className='post-info'>
                        <div className='post-user-info'>
                            <section>
                                <img src={logedinUser.imgUrl} />
                                <span>{logedinUser.username}</span>
                            </section>

                            <form onSubmit={onSaveStory}>
                                <label htmlFor="text"></label>
                                <textarea type="text"
                                    name="txt"
                                    id="txt"
                                    placeholder="Write a caption..."
                                    value={createdStory.txt}
                                    onChange={handleChange}
                                />
                            </form>
                        </div>
                        <div className='post-info-footer'>
                            <a><i className="fa-regular fa-face-smile"></i></a>
                            <span>{createdStory.txt.length}/2,200</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )

} 