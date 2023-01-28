import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from "react-router-dom";
import { loadStories } from '../store/story.actions'
import { StoriesList } from '../cmps/stories-list.jsx'
import { LikesModal } from '../cmps/likes-modal';
import { LoginSwitch } from '../cmps/login-switch';
import { loadUsers } from '../store/user.actions';
import { userService } from '../services/user.service';

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const user = useSelector(storeState => storeState.userModule.user)
    const [likes, likesIsOpen] = useState([])
    const [userSwitch, switchIsOpen] = useState(false)
    const navigate = useNavigate()

    // console.log(stories)
    // console.log(user)
    // console.log(userService.getLoggedinUser())
    // if(!user) user = userService.getLoggedinUser()

    useEffect(() => {
        loadStories()
        loadUsers()
    }, [])

    function goToProfile(){
        navigate('/profile')
    }

    // if (!stories.length || !user) return <div className="loading-page"><span className="loading"></span></div>

    return (
        <Fragment>
            <div className="nested-route">
                <Outlet />
            </div>
            {likes.length ? <LikesModal likesIsOpen={likesIsOpen} likes={likes} /> : null}
            {userSwitch ? <LoginSwitch switchIsOpen={switchIsOpen} /> : null}

            <div className='contant'>
                <StoriesList stories={stories} likesIsOpen={likesIsOpen} />
                <div className='suggestions'>
                    <div className='suggestion-header'>
                        <div className='suggestion-user-info'>
                            <img className='suggestion-photo' src={user.imgUrl} onClick={goToProfile} />
                            <div className='suggestion-user-name'>
                                <a onClick={goToProfile}>{user.username}</a>
                                <span>{user.fullname}</span>
                            </div>
                        </div>
                        <a className='suggestion-switch' onClick={() => switchIsOpen(true)}>Switch</a>
                    </div>
                    <div className='suggestion-options'>
                        <span>Suggestions For You</span>
                        <a>See All</a>
                    </div>

                    <ul>
                        <li>
                            <div className='suggestion-profile'>
                                <img src="https://i.pinimg.com/736x/68/ff/f1/68fff1b8797527499b7de8e78c774b14.jpg" />
                                <div className='suggestion-profile-info'>
                                    <a className='suggestion-profile-name'>adarbogos</a>
                                    <a className='suggestion-profile-followers'>Followed by leetalgk</a>
                                </div>
                            </div>
                            <span className='suggestion-profile-folow'>Follow</span>
                        </li>
                        <li>
                            <div className='suggestion-profile'>
                                <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                                <div className='suggestion-profile-info'>
                                    <a className='suggestion-profile-name'>talilosbakery</a>
                                    <a className='suggestion-profile-followers'>Followed by alexkurakin91</a>
                                </div>
                            </div>
                            <span className='suggestion-profile-folow'>Follow</span>
                        </li>
                        <li>
                            <div className='suggestion-profile'>
                                <img src="https://i0.wp.com/www.kahanihindi.com/wp-content/uploads/2020/02/Whatsapp-DP-HALF-SIZE-Profile-81.jpg?resize=500%2C500&ssl=1" />
                                <div className='suggestion-profile-info'>
                                    <a className='suggestion-profile-name'>denhlebnikov</a>
                                    <a className='suggestion-profile-followers'>Follows you</a>
                                </div>
                            </div>
                            <span className='suggestion-profile-folow'>Follow</span>
                        </li>

                    </ul>
                </div>
            </div>
        </Fragment>
    )
}