import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { storyService } from "../services/story.service.js"
import { userService } from "../services/user.service.js";
import { updateStory } from "../store/story.actions.js";
import { MsgForm } from "./msg-form.jsx";

// const {Outlet} = ReactRouterDom 

export function StoryDetails() {
    const [story, setStory] = useState(null)
    const [comment, setComment] = useState({ txt: '' })
    const user = useSelector(storeState => storeState.userModule.user)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStory()
    }, [])

    function onClose() {
        navigate(-1)
    }

    function loadStory() {
        storyService.getById(params.id)
            .then((story) => {
                setStory(story)
            })
            .catch((err) => {
                console.log('Had issues in story details', err)
                navigate('/')
            })
    }

    async function addStoryComment(ev) {
        ev.preventDefault()
        if(!comment.txt) return
        const newComment = storyService.createComment(comment.txt, user)
        story.comments.push(newComment)
        // const user = userService.getLoggedinUser()
        await storyService.onAddStoryComment(story._id, newComment)
        //  await storyService.onAddStoryComment(story._id, comment.txt, user)
        setComment({ txt: '' })
    }

    function removeComment(commId) {
        const idx = story.comments.findIndex(comment => comment.id === commId)
        story.comments.splice(idx, 1)
        updateStory(story)
        setStory(prevStory => {
            return { ...prevStory, comments: story.comments }
        })
    }

    if (!story) return <div className="loading-page"><span className="loading"></span></div>
    return <section className="story-details">
        {/* </Outlet> */}
        <div className="image">
            <img src={story.imgUrl[0]} />
        </div>
        <div className="details-comment">
            <section className="details-header">
                <div>
                    <img className="prew-user-img" src={story.by.imgUrl} />
                    <a className="details-username">{story.by.username}</a>
                </div>
                <button onClick={onClose}>X</button>
            </section>
            <section className="comments-container">
                <div className="comments-list">
                    <section className="comment">
                        <img className="prew-user-img" src={story.by.imgUrl} />
                        <div>
                            <section>
                                <span className="details-username">{story.by.username}</span>
                                <span className="story-text">&nbsp;{story.txt}</span>
                            </section>
                            <section className="comment-footer">
                                <span className="time">1h</span>
                                <svg onClick={() => removeComment(comment.id)} aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                            </section>
                        </div>
                    </section>
                    {story.comments && story.comments.length ?
                        <Fragment>
                            {story.comments.map(comment => <section className="comment" key={comment.id}>
                                <img className="prew-user-img" src={comment.by.imgUrl} />
                                <div>
                                    <secction>
                                        <span className="details-username">{comment.by.username}</span>
                                        <span className="story-text">&nbsp;{comment.txt}</span>
                                    </secction>
                                    <section className="comment-footer">
                                        <span className="time">1h</span>
                                        <svg onClick={() => removeComment(comment.id)} aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                                    </section>
                                </div>

                            </section>)}
                        </Fragment> : null}
                </div>
                <div>
                    <div className="btn-container">
                        <a><i className="fa-regular fa-heart"></i></a>
                        <a><i className="fa-regular fa-comment"></i></a>
                        <a><i className="fa-regular fa-paper-plane"></i></a>
                    </div>
                    <div className="likes-time">
                        <a>{story.likedBy.length} likes</a>
                        <span>1 HOUR AGO</span>
                    </div>
                </div>
                <div className="input-section">
                    <span><i className="fa-regular fa-face-smile"></i></span>
                    <MsgForm comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
                    <a className={comment.txt ? 'active' : 'none'} onClick={addStoryComment}>Post</a>
                </div>
            </section>
        </div>
    </section>
}