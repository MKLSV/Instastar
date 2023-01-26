import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from "react"
import { loadStories } from "../store/story.actions"
import { IoMdApps } from 'react-icons/io'
import { BsBookmark, BsPersonSquare } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { loadUsers } from '../store/user.actions'

export function UserDetails() {
  const user = useSelector(storeState => storeState.userModule.user)
  const users = useSelector(storeState => storeState.userModule.users)
  const stories = useSelector(storeState => storeState.storyModule.stories)
  const params = useParams()
  let loggedInUser
  let userProfile
  params.username === user.username ? loggedInUser = true : loggedInUser = false
  const [toggle, setToggle] = useState('posts')

  useEffect(() => {
    loadStories()
    loadUsers()
  }, [])

  if (loggedInUser) userProfile = user
  else {
    userProfile = users.find(user => user.username === params.username)
  }

  const profileStories = stories.filter(story => story.by._id === userProfile._id)
  const savedStories = stories.filter(story => user.savedStoryIds.includes(story._id))


  function onToggle(str) {
    if (!loggedInUser) return
    setToggle(str)
  }


  return <div className="profile-container">
    <section className="profile-header">
      <section className="profile-photo"><img src={userProfile.imgUrl} /></section>
      <section className="profile-info">
        {loggedInUser ? <div className="profile-info-header">
          <a>{userProfile.username}</a>
          <button>Edit Profile</button>
        </div>
          :
          <div className="profile-info-header">
            <a>{userProfile.username}</a>
            <button>Follow</button>
            <button>Message</button>
          </div>}
        <div className="user-info">
          <section><a className="user-number">{profileStories.length}</a><a> posts</a></section>
          <section><a className="user-number">{userProfile.followers.length}</a><a> followers</a></section>
          <section><a className="user-number">{userProfile.following.length}</a><a> following</a></section>
        </div>
        <div className="user-bio">
          <a className="user-name">{userProfile.fullname}</a>
          <a className="bio">{userProfile.bio}</a>
        </div>
      </section>
    </section>
    <section className="profile-links">
      <a onClick={() => setToggle('posts')} className={toggle === "posts" ? "profile-pics-link active" : "profile-pics-link"}><a className='posts-icon'><IoMdApps /></a>POSTS</a>
      <a onClick={() => onToggle('saved')} className={toggle === "saved" ? "profile-pics-link active" : "profile-pics-link"}><a className='saved-icon'><BsBookmark /></a>SAVED</a>
      {/* <a onClick={() => setToggle('saved')} className={toggle === "saved" ? "profile-pics-link active" : "profile-pics-link"}><a className='saved-icon'><BsBookmark /></a>SAVED</a> */}
      <a className="profile-pics-link"> <a className='tagged-icon'><BsPersonSquare /></a>TAGGED</a>

    </section>
    {toggle === "posts" ?
      <section className="profile-stories">
        {profileStories.map(story => <img key={story.imgUrl} src={story.imgUrl} />)}
      </section>
      :
      <section className="profile-stories">
        {savedStories.map(story => <img key={story.imgUrl} src={story.imgUrl} />)}
      </section>
    }
  </div>

}


