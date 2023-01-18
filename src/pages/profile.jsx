import { userService } from "../services/user.service"
import { useSelector } from 'react-redux'

export function ProfilePage() {

    const user = useSelector(storeState => storeState.userModule.user)
    console.log(user)

    return <div className="profile-container">
        <section className="profile-header">
            <section className="profile-photo"><img src={user.imgUrl} /></section>
            <section className="profile-info">
                <div className="profile-info-header">
                    <a>{user.username}</a>
                    <button>Edit Profile</button>
                </div>
                <div className="user-info">
                    <section><a className="user-number">{user.savedStoryIds.length}</a><a> posts</a></section>
                    <section><a className="user-number">{user.followers.length}</a><a> followers</a></section>
                    <section><a className="user-number">{user.following.length}</a><a> following</a></section>
                </div>
                <div className="user-bio">
                    <a className="user-name">{user.fullname}</a>
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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQts6Lwc6Qnjvkse8MNNRbUCvJSsE0RoEXKVaLM4b6f&s" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQts6Lwc6Qnjvkse8MNNRbUCvJSsE0RoEXKVaLM4b6f&s" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQts6Lwc6Qnjvkse8MNNRbUCvJSsE0RoEXKVaLM4b6f&s" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQts6Lwc6Qnjvkse8MNNRbUCvJSsE0RoEXKVaLM4b6f&s" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQts6Lwc6Qnjvkse8MNNRbUCvJSsE0RoEXKVaLM4b6f&s" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQts6Lwc6Qnjvkse8MNNRbUCvJSsE0RoEXKVaLM4b6f&s" />
        </section>
    </div>
}