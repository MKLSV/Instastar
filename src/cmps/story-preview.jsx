import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { storyService } from "../services/story.service";
import { userService } from "../services/user.service";
import { removeStory } from "../store/story.actions";
import { MsgForm } from "./msg-form";

export function StoryPreview({ story, onRemoveStory }) {
    const [comment, setComment] = useState({ txt: '' })
    const { by, imgUrl, txt, likedBy, comments } = story

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
        } catch (err) {
            console.log(err)
        }
    }

    async function addStoryComment(ev) {
        ev.preventDefault()
        console.log(comment)
        const user = userService.getLoggedinUser()
        const msgFromBack = await storyService.onAddStoryComment(story._id, comment.txt, user)
    }

    return <article className="story-preview">
        <section className="story-header">
            <div>
                <img className="prew-user-img" src={by.imgUrl} />
                <a>{by.username}</a>
            </div>
            <button onClick={() => onRemoveStory(story._id)}>X</button>
        </section>
        {imgUrl.length > 1 ?
            <Slider dots={true}>
                <img className="story-img" src={imgUrl[0]} />
                <img className="story-img" src={imgUrl[1]} />
            </Slider>
            : <img className="story-img" src={imgUrl[0]} />}
        <section className="story-footer">
            <div className="btn-container">
                <a><i className="fa-regular fa-heart"></i></a>
                <Link to={`/story/${story._id}`}><span><i className="fa-regular fa-comment"></i></span></Link>
                <a><i className="fa-regular fa-paper-plane"></i></a>
            </div>
            <a className="story-likes">{likedBy.length} likes</a>
            <a><span className="story-user-name">{by.username}</span> <span className="story-text">{txt}</span></a>
            {comments.length > 2 && <Link className="link" to={`/story/${story._id}`}><span className="story-comments-view"> View all {comments.length} comments </span></Link>}

            {comments.length ? <a className="story-comment"><span className="story-user-name">{comments[0].by.username}</span> <span className="story-text">{comments[0].txt}</span></a> : null}
            <MsgForm comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
        </section>
    </article >
}
