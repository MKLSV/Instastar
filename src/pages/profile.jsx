import { userService } from "../services/user.service"
import { useSelector } from 'react-redux'
import { useEffect } from "react"
import { loadStories } from "../store/story.actions"

export function ProfilePage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)

    useEffect(() => {
        loadStories()
    }, [])

    console.log(stories)
    console.log(user)
    const { imgUrl, savedStoryIds, followers, following, fullname, username } = user

    const profileStories = stories.filter(story => story.by._id === user._id)
    console.log('profileStories', profileStories)

    return <div className="profile-container">
        <section className="profile-header">
            <section className="profile-photo"><img src={imgUrl} /></section>
            <section className="profile-info">
                <div className="profile-info-header">
                    <a>{username}</a>
                    <button>Edit Profile</button>
                </div>
                <div className="user-info">
                    <section><a className="user-number">{savedStoryIds.length}</a><a> posts</a></section>
                    <section><a className="user-number">{followers.length}</a><a> followers</a></section>
                    <section><a className="user-number">{following.length}</a><a> following</a></section>
                </div>
                <div className="user-bio">
                    <a className="user-name">{fullname}</a>
                    <a className="bio">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, earum. Iste, architecto. Architecto magnam distinctio repellat, iste aliquid nesciunt laboriosam ipsam, nihil voluptates tempore quisquam ipsa ab earum fugiat iure!</a>
                </div>
            </section>
        </section>
        <section className="profile-links">
            <a className="profile-pics-link active">POSTS</a>
            <a className="profile-pics-link">SAVED</a>
            <a className="profile-pics-link">TAGGED</a>
        </section>
        <section className="profile-stories">
            {profileStories.map(story => <img key={story.imgUrl} src={story.imgUrl} />)}
        </section>
    </div>
}