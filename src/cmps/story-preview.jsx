import { Link } from "react-router-dom";

export function StoryPreview({ story, onRemoveStory }) {
    const { by, imgUrl, txt, _id } = story
    return <article className="story-preview">
        <section className="story-header">
            <img className="prew-user-img" src={by.imgUrl} />
            <a>{by.fullname}</a>
        </section>
        <img className="story-img" src={imgUrl} />
        <section className="story-footer">
            <a>{txt}</a>
            <div className="btn-container">
                <button onClick={() => onRemoveStory(_id)}>Delete</button>
                <Link className="nice-link" to={`/story/${_id}`}> Details</Link>
                <Link className="nice-link" to={`/story/edit/${_id}`}> Edit</Link>
            </div>
        </section>
    </article>
}