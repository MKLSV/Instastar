import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { ImgUploader } from "./img-uploader";

export function StoryPreview({ story, onRemoveStory }) {

    return <article className="story-preview">
        <section className="story-header">
            <img className="prew-user-img" src={story.by.imgUrl} />
            <a>{story.by.fullname}</a>

        </section>
        <img className="story-img" src={story.imgUrl} />
        <section className="story-footer">
            <a>{story.txt}</a>
            <div className="btn-container">
                <button onClick={() => onRemoveStory(story._id)}>Delete</button>
                <Link className="nice-link" to={`/story/${story._id}`}> Details</Link>
                <Link className="nice-link" to={`/story/edit/${story._id}`}> Edit</Link>
            </div>
        </section>
    </article>
}