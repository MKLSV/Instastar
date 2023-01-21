import {  NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)

    return (
        <section className="side-bar">
            <a href='/'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' style={{ width: "130px" }} /></a>
            <nav>
                <NavLink className='nav-btn' key='/' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span>Home</span></NavLink>
                <NavLink className='nav-btn' key='create' to='create'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span><span>Create</span></NavLink>
                <NavLink className='nav-btn' key='profile' to='profile'><span className='nav-icon'><img src={user.imgUrl} /></span><span>Profile</span></NavLink>
            </nav>
            <a className="side-bar-more"><i className="fa-solid fa-bars"></i><span>More</span></a>
        </section>
    )
}