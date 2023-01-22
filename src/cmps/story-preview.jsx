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
    const [like, setLike] = useState('')
    const { imgUrl, txt, likedBy, comments } = story
    const user = useSelector(storeState => storeState.userModule.user)

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
        // const user = userService.getLoggedinUser()
        const msgFromBack = await storyService.onAddStoryComment(story._id, comment.txt, user)
    }

    function checkLike() {
        return likedBy.some(likedUser => likedUser._id === user._id)
    }

    function toggleLike() {
        if (checkLike()) {
            const idx = likedBy.findIndex(likedUser => likedUser._id === user._id)            
            likedBy.splice(idx, 1)
        }

        // likedBy: [
        //     {
        //       _id: "u105",
        //       fullname: "Bob",
        //       imgUrl: "http://some-img"
        //     }

        else likedBy.push({
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl
        })
        storyService.saveLike(story)
        setLike(checkLike())
    }

    return <article className="story-preview">
        <section className="story-header">
            <div className="header-info">
                <img className="prew-user-img" src={story.by.imgUrl} />
                <a>{story.by.username}</a>
                <div className="time">
                    <span>•</span>
                    <time>1h</time>
                </div>
            </div>
            <svg onClick={() => onRemoveStory(story._id)} aria-label="More options" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </section>
        {imgUrl.length > 1 ?
            <Slider dots={true}>
                <img className="story-img" src={imgUrl[0]} />
                <img className="story-img" src={imgUrl[1]} />
            </Slider>
            : <img className="story-img" src={imgUrl[0]} />}
        <section className="story-footer">
            <div className="btn-container">
                <a onClick={toggleLike}><i className={checkLike() ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></a>
                <Link to={`/story/${story._id}`}><span><i className="fa-regular fa-comment"></i></span></Link>
                <a><i className="fa-regular fa-paper-plane"></i></a>
            </div>
            <a className="story-likes">{likedBy.length} likes</a>
            <a><span className="story-user-name">{story.by.username}</span> <span className="story-text">{txt}</span></a>
            {comments.length > 2 && <Link className="link" to={`/story/${story._id}`}><span className="story-comments-view"> View all {comments.length} comments </span></Link>}

            {comments.length ? <a className="story-comment"><span className="story-user-name">{comments[0].by.username}</span> <span className="story-text">{comments[0].txt}</span></a> : null}
            <MsgForm comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
        </section>
    </article >
}
