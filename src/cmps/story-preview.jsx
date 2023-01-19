import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { storyService } from "../services/story.service";
import { userService } from "../services/user.service";
import { removeStory } from "../store/story.actions";
import { MsgForm } from "./msg-form";

export function StoryPreview({ story, onRemoveStory }) {

    const [comment, setComment] = useState({ txt: '' })
    // const [msg, setMsg] = useState({ txt: '' })
    const { by, imgUrl, txt, likedBy, comments } = story


    async function onRemoveStory(storyId) {
        try {
            console.log('storyId:', storyId);
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
        // showSuccessMsg(`Msg Added, id:${msgFromBack.id}`)
        // navigate('/toy')
    }

    // function handleChange({ target }) {
    //     let { value, type, name: field } = target
    //     value = type === 'number' ? +value : value
    //     setCreatedComment(prevStory => ({ ...prevStory, [field]: value }))
    // }


    // function onSaveComment(ev) {
    //     ev.preventDefault()
    //     console.log(createdComment)
    //     // storyService.save(createdStory).then((story) => {
    //     //     console.log('story saved', story);
    //     //     navigate('/')
    //     // })
    // }


    return <article className="story-preview">
        <section className="story-header">
            <img className="prew-user-img" src={by.imgUrl} />
            <a>{by.username}</a>
            <button onClick={() => onRemoveStory(story._id)}>X</button>
        </section>
        <Slider dots={true}>
            <img className="story-img" src={imgUrl[0]} />
            <img className="story-img" src={imgUrl[1]} />
        </Slider>
        <section className="story-footer">
            <div className="btn-container">
                <a><i className="fa-regular fa-heart"></i></a>
                <a><i className="fa-regular fa-comment"></i></a>
                <a><i className="fa-regular fa-paper-plane"></i></a>
            </div>
            <a className="story-likes">{likedBy.length} likes</a>
            <a><span className="story-user-name">{by.username}</span> <span className="story-text">{txt}</span></a>
            <a className={comments.length > 2 ? "story-comments-view" : "hide"}>View all {comments.length} comments</a>
            {comments.length ? <a className="story-comment"><span className="story-user-name">{comments[0].by.username}</span> <span className="story-text">{comments[0].txt}</span></a> : null}
            <MsgForm comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
            {/* <form onSubmit={onSaveComment}>
                <input type="text" name="txt" id="txt" placeholder="Add a comment..." value={createdComment.txt} onChange={handleChange} />
            </form> */}
        </section>
    </article>
}
