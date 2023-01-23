
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { storyService } from "../services/story.service";
import { ImgUploader } from "./img-uploader";
import { useSelector } from 'react-redux';

const CreateStoryModal = ({setIsOpen}) => {
    const navigate = useNavigate()
    const [createdStory, setCreatedStory] = useState(storyService.getEmptyStory())
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
        storyService.save(createdStory).then((story) => {
            setIsOpen(false)
            window.location.reload(false)
        })
    }

    // function onClose() {
    //     navigate(-1)
    // }

    return (
        <div className='create-modal'>
        {/* // <div className='create-modal' onClick={() => setIsOpen(false)}> */}
            <div className='create-post' >
                <header>
                    <a onClick={() => setIsOpen(false)}><i className="fa-solid fa-arrow-left"></i></a>
                    <span>Create new post</span>
                    <a className='share-btn' onClick={onSaveStory}>Next</a>
                </header>
                <div className='create-post-container'>
                    <section className='img-section'>
                        {createdStory.imgUrl.length ? <img src={createdStory.imgUrl} /> :
                            <ImgUploader onUploadSuccess={onUploadSuccess} />}
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

export default CreateStoryModal