import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from "react"
import { loadStories } from "../store/story.actions"
import { IoMdApps } from 'react-icons/io'
import { BsBookmark, BsPersonSquare } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { loadUsers } from '../store/user.actions'
import { userService } from '../services/user.service'

export function UserDetails() {
  const user = useSelector(storeState => storeState.userModule.user)
  const users = useSelector(storeState => storeState.userModule.users)
  const stories = useSelector(storeState => storeState.storyModule.stories)
  const params = useParams()

  const [follow, setFollow] = useState('')
  const [toggle, setToggle] = useState('posts')

  const navigate = useNavigate()

  let loggedInUser
  let userProfile
  params.username === user.username ? loggedInUser = true : loggedInUser = false

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

  function storyModal(story) {
    navigate(`/post/${story._id}`)
  }


  function checkFollow() {
    return user.following.some(user => user._id === userProfile._id)
  }

  function goToMessages() {
    navigate(`/inbox/${userProfile._id}`)
  }


  function toggleFollow() {
    if (checkFollow()) {
      const idx = user.following.findIndex(user => user._id === userProfile._id)
      user.following.splice(idx, 1)

      const userProfileIdx = userProfile.followers.findIndex(userProfile => userProfile._id === user._id)
      userProfile.followers.splice(userProfileIdx, 1)
    }

    else {
      user.following.push({
        _id: userProfile._id,
        fullname: userProfile.fullname,
        username: userProfile.username,
        imgUrl: userProfile.imgUrl
      })

      userProfile.followers.push({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        imgUrl: user.imgUrl
      })
    }
    userService.update(user)
    userService.update(userProfile)
    setFollow(checkFollow())
  }

  if (!userProfile) return <div className="loading-page"><span className="loading"></span></div>
  return <div className="profile-page">
    <div className="profile-container">
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
              <div>
                {checkFollow() ? <button onClick={toggleFollow}>Following</button> : <button onClick={toggleFollow} className='follow'>Follow</button>}
                <button onClick={goToMessages}>Message</button>
              </div>
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
      <div className='content-container'>
        <section className="profile-links">
          <section onClick={() => setToggle('posts')} className={toggle === "posts" ? "profile-pics-link active" : "profile-pics-link"}><a className='posts-icon'>{toggle === "posts" ? <svg aria-label="" className="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg> : <svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>}</a>POSTS</section>
          <section onClick={() => onToggle('saved')} className={toggle === "saved" ? "profile-pics-link active" : "profile-pics-link"}><a className='saved-icon'>{toggle === "saved" ? <svg aria-label="" className="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg> : <svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>}</a>SAVED</section>
          <section className="profile-pics-link"> <a className='tagged-icon'><svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg></a>TAGGED</section>

        </section>
        {toggle === "posts" ?
          <section className="profile-stories">
            {profileStories.map(story => <div key={story._id} onClick={() => storyModal(story)} className='story'>
              <section className='post-info'>
                <div className='likes-comm'>
                  <div>
                    <i className="fa-solid fa-heart"></i>
                    <span>{story.likedBy.length}</span>
                  </div>
                  <div>
                    <i className="fa-solid fa-comment"></i>
                    <span>{story.comments.length}</span>
                  </div>
                </div>
              </section>
              <img key={story.imgUrl} src={story.imgUrl} /></div>)}
          </section>
          :
          <section className="profile-stories">
            {savedStories.map(story => <img key={story._id} src={story.imgUrl[0]} />)}
          </section>
        }
      </div>
    </div>
  </div>

}


