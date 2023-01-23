import { useSelector } from 'react-redux'
import { useEffect } from "react"
import { loadStories } from "../store/story.actions"

export function ProfilePage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const profileStories = stories.filter(story => story.by._id === user._id)
    console.log(user)

    useEffect(() => {
        loadStories()
    }, [])

    return <div className="profile-container">
        <section className="profile-header">
            <section className="profile-photo"><img src={user.imgUrl} /></section>
            <section className="profile-info">
                <div className="profile-info-header">
                    <a>{user.username}</a>
                    <button>Edit Profile</button>
                </div>
                <div className="user-info">
                    <section><a className="user-number">{profileStories.length}</a><a> posts</a></section>
                    <section><a className="user-number">{user.followers.length}</a><a> followers</a></section>
                    <section><a className="user-number">{user.following.length}</a><a> following</a></section>
                </div>
                <div className="user-bio">
                    <a className="user-name">{user.fullname}</a>
                    <a>{user.bio}</a>
                </div>
            </section>
        </section>
        <section className="profile-links">
            
            <a className="profile-pics-link active">POSTS</a>
            {/* <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons"></a> */}
             {/* <svg aria-label="Posts" className="_ab6-" color="#0095f6" fill="#0095f6" height="24" role="img" viewBox="0 0 24 24" width="24"></svg> */}
           

            <a className="profile-pics-link">SAVED</a>
            {/* <svg aria-label="Saved" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"></svg> */}

            <a className="profile-pics-link">TAGGED</a>
            {/* <svg aria-label="Tagged" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"></svg> */}

        </section>
        <section className="profile-stories">
            {profileStories.map(story => <img key={story.imgUrl} src={story.imgUrl} />)}
        </section>
    </div>
}