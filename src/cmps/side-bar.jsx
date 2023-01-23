import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export function SideBar({ setIsOpen }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isExpanted, setIsExpanted] = useState(false)


    return (
        <section className="side-bar">
            <a className='icon' href='/'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' /></a>
            <nav>
                <NavLink className='nav-btn' key='feed' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span>Home</span></NavLink>
                <a onClick={() => setIsOpen(true)} className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span><span>Create</span></a>
                <NavLink className='nav-btn' key='profile' to='profile'><span className='nav-icon'><img src={user.imgUrl} /></span><span>Profile</span></NavLink>
            </nav>
            <a className="side-bar-more"><i className="fa-solid fa-bars"></i><span>More</span></a>
        </section>
    )
}