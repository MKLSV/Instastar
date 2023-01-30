import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { storyService } from "../services/story.service";
import { userService } from "../services/user.service";
import { removeStory } from "../store/story.actions";
import { MsgForm } from "./msg-form";



// export function StoryPreview({ story, onRemoveStory, likesIsOpen }) {
export function StoryPreview({ story, onRemoveStory, likesIsOpen }) {
    const [comment, setComment] = useState({ txt: '' })
    const [like, setLike] = useState('')
    const [save, setSave] = useState('')
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
        const newComment = storyService.createComment(comment.txt, user)
        story.comments.push(newComment)
        await storyService.save(story)

        const notif = {
            storyId: story._id,
            imgUrl: story.imgUrl,
            storyBy: story.by,
            notif: `commented your post: ${comment.txt}`,
            notifBy: {
                _id: user._id,
                username: user.username,
                imgUrl: user.imgUrl
            },
        }
        storyService.sendNotif(notif)

        setComment({ txt: '' })
    }

    function checkLike() {
        return likedBy.some(likedUser => likedUser._id === user._id)
    }

    function toggleLike() {
        if (checkLike()) {
            const idx = likedBy.findIndex(likedUser => likedUser._id === user._id)
            likedBy.splice(idx, 1)
        }

        else {
            likedBy.push({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                imgUrl: user.imgUrl
            })

            const notif = {
                storyId: story._id,
                imgUrl: story.imgUrl,
                storyBy: story.by,
                notif: `Liked your post!`,
                notifBy: {
                    _id: user._id,
                    username: user.username,
                    imgUrl: user.imgUrl
                },
            }
            storyService.sendNotif(notif)
        }
        storyService.save(story)
        setLike(checkLike())
    }

    function checkSave() {
        return user.savedStoryIds.some(id => id === story._id)
    }

    function toggleSave() {
        if (checkSave()) {
            const idx = user.savedStoryIds.findIndex(id => id === story._id)
            user.savedStoryIds.splice(idx, 1)
        }

        else user.savedStoryIds.push(story._id)
        userService.update(user)
        setSave(checkSave())
    }

    return <div>
        <div className='top-side-bar'></div>
        <article className="story-preview">
            <section className="story-header">
                <div className="header-info">
                    <img className="prew-user-img" src={story.by.imgUrl} />
                    <Link to={story.by.username} className="story-user-name link">{story.by.username}</Link>
                    <div className="time">
                        <span>•</span>
                        <time>1h</time>
                    </div>
                </div>
                <svg onClick={() => onRemoveStory(story._id)} aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </section>
            {imgUrl.length > 1 ?
                <Slider dots={true} infinite={false}>
                    {imgUrl.map(img => <img key={imgUrl} className="story-img" src={img} />)}
                </Slider>
                : <img className="story-img" src={imgUrl[0]} />}
            <section className="story-footer">
                <div className="btn-container">
                    <a onClick={toggleLike}><i className={checkLike() ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></a>
                    <Link to={`/post/${story._id}`}><span><i className="fa-regular fa-comment"></i></span></Link>
                    <a><i className="fa-regular fa-paper-plane"></i></a>
                    <a onClick={toggleSave} className="saved-btn"><i className={checkSave() ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i></a>
                </div>
                {likedBy.length ? <section> <img src={likedBy[0].imgUrl} /><span>Liked by</span> <Link to={likedBy[0].username} className="story-user-name link">{likedBy[0].username}</Link> {likedBy.length > 1 && <div><span>and </span><a onClick={() => likesIsOpen(likedBy)} className="story-likes">{likedBy.length - 1} others</a></div>}</section> : null}

                <div><Link to={story.by.username} className="story-user-name link">{story.by.username}</Link> <span className="story-text">{txt}</span></div>
                {comments.length > 2 && <Link className="link" to={`post/${story._id}`}><span className="story-comments-view"> View all {comments.length} comments </span></Link>}
                {comments.length > 1 ? <a className="story-comment"><span className="story-user-name">{comments[comments.length - 2].by.username}</span> <span className="story-text">{comments[comments.length - 2].txt}</span></a> : null}
                {comments.length ? <a className="story-comment"><span className="story-user-name">{comments[comments.length - 1].by.username}</span> <span className="story-text">{comments[comments.length - 1].txt}</span></a> : null}
                <MsgForm comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
            </section>
        </article >
    </div>
}
