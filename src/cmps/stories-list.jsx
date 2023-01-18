
import { StoryPreview } from "./story-preview"

export function StoriesList({ stories, onRemoveStory, onEditStory }) {
    return <section className="story-list">
        {stories.map(story => <div
            className="story"
            key={story.id}>
            <StoryPreview story={story}
                onRemoveStory={onRemoveStory} onEditStory={onEditStory}
            />
        </div>)}
    </section>
}