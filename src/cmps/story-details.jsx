import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";


import { storyService } from "../services/story.service.js"
import { userService } from "../services/user.service.js";
import { MsgForm } from "./msg-form.jsx";

export function StoryDetails() {

    const [story, setStory] = useState(null)
    const [comment, setComment] = useState({ txt: '' })
    const params = useParams()
    const navigate = useNavigate()
    console.log('params:', params);


    useEffect(() => {
        loadStory()
    }, [])

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
        console.log(comment)
        const user = userService.getLoggedinUser()
        const msgFromBack = await storyService.onAddStoryComment(story._id, comment.txt, user)
    }
    if (!story) return <div className="loading-page"><span className="loading"></span></div>
    
    return <section className="story-details">
        <div className="image">
            <img src={story.imgUrl[0]} />
        </div>
        <div className="details-comment">
            <section className="details-header">
                <div>
                    <img className="prew-user-img" src={story.by.imgUrl} />
                    <a className="details-username">{story.by.username}</a>
                </div>
            </section>
            <section className="comments-container">
                <div className="comments-list">
                    <section className="comment">
                        <img className="prew-user-img" src={story.by.imgUrl} />
                        <div>
                            <span className="details-username">{story.by.username}</span>
                            <span className="story-text">&nbsp;{story.txt}</span>
                        </div>
                    </section>
                    {story.comments && story.comments.length &&
                        <Fragment>
                            {story.comments.map(comment => <section className="comment" key={comment.id}>
                                <img className="prew-user-img" src={comment.by.imgUrl} />
                                <div>
                                    <span className="details-username">{comment.by.username}</span>
                                    <span className="story-text">&nbsp;{comment.txt}</span>
                                </div>
                            </section>)}
                        </Fragment>}
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
                    <a>Post</a>
                </div>
            </section>
        </div>
    </section>
}