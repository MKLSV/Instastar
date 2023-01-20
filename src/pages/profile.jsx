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

    const {imgUrl, savedStoryIds ,followers, following,fullname , username , by} = user

    const profileStories = story
    
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

            {/* {by.imgUrl.map(img => <section className="comment" key={comment.id}>
                                <img className="prew-user-img" src={comment.by.imgUrl} /> */}

          
            <img src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmVlbCUyMGdvb2R8ZW58MHx8MHx8&w=1000&q=80" />
            <img src="https://www.befunky.com/images/prismic/5ddfea42-7377-4bef-9ac4-f3bd407d52ab_landing-photo-to-cartoon-img5.jpeg?auto=avif,webp&format=jpg&width=863" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_C83dAtu27sZWagcVeEQhFKBVWCKiXrZ4jsXk4P9i65fVsiHegUV69xqAcvB4GgU4c1I&usqp=CAU" />
            <img src="https://media.istockphoto.com/id/890641852/photo/caucasian-young-man-going-straight-on-his-way-on-sandy-desert.jpg?s=612x612&w=0&k=20&c=lLYYETKZdTbBcsDB0vqOGuQ1rq6jBWBSYiiLk4fk5ak=" />
            <img src="data:image/jpeg;base64,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" />
            <img src="https://expertphotography.b-cdn.net/wp-content/uploads/2021/08/Store-Photos-Maxime-Medvedev.jpg" />
        </section>
    </div>
}