import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from "react"
import { loadStories } from "../store/story.actions"
import { IoMdApps } from 'react-icons/io'
import {BsBookmark , BsPersonSquare} from 'react-icons/bs'

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
                    <a className="bio">{user.bio}</a>
                </div>
            </section>
        </section>
        <section className="profile-links">
            <a className="profile-pics-link active"> <a  className='posts-icon'><IoMdApps/></a>POSTS</a>
            <a className="profile-pics-link"> <a className='saved-icon'><BsBookmark /></a>SAVED</a>
            <a className="profile-pics-link"> <a className='tagged-icon'><BsPersonSquare /></a>TAGGED</a>

        </section>
        <section className="profile-stories">
            {profileStories.map(story => <img key={story.imgUrl} src={story.imgUrl} />)}
        </section>
    </div>

}


