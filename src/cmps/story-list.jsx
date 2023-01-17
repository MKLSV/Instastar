import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { StoryPreview } from "./story-preview"

export function StoryList({ storys, onRemoveStory, onEditStory }) {

    return <section className="story-list grid">
        {storys.map(story => <div
         className="story"
         key={story._id}>
            <StoryPreview story={story} onRemoveStory={onRemoveStory} onEditStory={onEditStory} />
        </div>)}
    </section>
}