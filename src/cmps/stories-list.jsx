
import { StoryPreview } from "./story-preview"

export function StoriesList({ stories }) {
    return <section className="story-list">
        {stories.map(story => <div
            className="story"
            key={story._id}>
            <StoryPreview story={story}
            />
        </div>)}
    </section>
}