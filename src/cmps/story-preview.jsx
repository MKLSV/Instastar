import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { ImgUploader } from "./img-uploader";

export function StoryPreview({ story, onRemoveStory }) {

    return <article className="story-preview">
            <img src={story.img} />
        <div className="btn-container">
            <button onClick={() => onRemoveStory(story._id)}>Delete</button>
            <Link className="nice-link" to={`/story/${story._id}`}> Details</Link>
            <Link className="nice-link" to={`/story/edit/${story._id}`}> Edit</Link>
        </div>
    </article>
}