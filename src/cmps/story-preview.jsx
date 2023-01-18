import { Link } from "react-router-dom";

export function StoryPreview({ story, onRemoveStory }) {
    const { by, imgUrl, txt, _id, likedBy, comments } = story

    return <article className="story-preview">
        <section className="story-header">
            <img className="prew-user-img" src={by.imgUrl} />
            <a>{by.fullname}</a>
        </section>
        <img className="story-img" src={imgUrl} />
        <section className="story-footer">
            <div className="btn-container">
                <a><i class="fa-regular fa-heart"></i></a>
                <a><i class="fa-regular fa-comment"></i></a>
                <a><i class="fa-regular fa-paper-plane"></i></a>
            </div>
            <a className="story-likes">{likedBy.length} likes</a>
            <a><span className="story-user-name">{by.username}</span> <span className="story-text">{txt}</span></a>
            <a className={comments.length > 2 ? "story-comments-view" : "hide"}>View all {comments.length} comments</a>
            <a className="story-comment"><span className="story-user-name">{comments[0].by.username}</span> <span className="story-text">{comments[0].txt}</span></a>
        </section>
    </article>
}