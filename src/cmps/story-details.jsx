const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { storyService } from "../services/story.service.js"

export function StoryDetails() {

    const [story, setStory] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStory()
    }, [])

    function loadStory() {
        storyService.query()
            .then((story) => setStory(story))
            .catch((err) => {
                console.log('Had issues in story details', err)
                navigate('/story')
            })
    }

    function onGoBack() {
        navigate('/story')
    }

    if (!story) return <div>Loading...</div>
    return <section className="story-details">
        <h1>{story.txt}</h1>
        <h2> {story.comments.txt}</h2>
        <button onClick={onGoBack}>Go Back</button>
    </section>
}