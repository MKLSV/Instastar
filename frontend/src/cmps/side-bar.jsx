import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useState } from 'react'
import { toggleModal } from '../store/system.action'
import { SearchModal } from './search-modal'
import { Notifications } from './notifications'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isExpanted, setIsExpanted] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [notifications, notificationsModal] = useState(false)
    const [full, setFull] = useState(true)


    const messagebtn = <svg aria-label="Messenger" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path></svg>

    // useEffect(() => {
    //     loadUsers()
    //   }, [])

    function onSearch() {
        setSearchModal(!searchModal)
        setFull(!full)
    }
    function onNotifications() {
        // setSearchModal(!searchModal)
        notificationsModal(!notifications)
        setFull(!full)
    }


    if (!user) return <div className="loading-page"></div>
    return (
        <Fragment>

            {/* {searchModal && <SearchModal setSearchModal={setSearchModal} />} */}
            <SearchModal setSearchModal={setSearchModal} searchModal={searchModal} full={full} setFull={setFull} />
            <Notifications setSearchModal={setSearchModal} searchModal={searchModal} full={full} setFull={setFull} notificationsModal={notificationsModal} notifications={notifications}/>
            <div className='test'>
                <a className='icon' href='/'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' /></a>
                <a onClick={toggleModal} className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span></a>
            </div>
            <section className={full ? "side-bar" : "side-bar mini"}>
                <a className='icon' href='/'>
                    {full ? <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' /> : <svg aria-label="Instagram" class="_ab6- st-current" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z" class=""></path></svg>}
                </a>
                <nav>
                    <NavLink className='nav-btn' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span className='nav-name'>Home</span></NavLink>
                    <a onClick={onSearch} className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-magnifying-glass"></i></span><span className='nav-name' >Search</span></a>
                    <NavLink className='nav-btn' to='/inbox'><span className='nav-icon'>{messagebtn}</span><span className='nav-name'>Messages</span></NavLink>
                    <a onClick={onNotifications} className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-heart"></i></span><span className='nav-name'>Notifications</span></a>
                    <a onClick={toggleModal} className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span><span className='nav-name' >Create</span></a>
                    <NavLink className='nav-btn' to={user.username}><span className='nav-icon'><img src={user.imgUrl} /></span><span className='nav-name' >Profile</span></NavLink>
                </nav>
                <div>
                    <div className={isExpanted ? 'nav-more open' : 'nav-more'}>
                        <Link className='nav-more-btn' to='switch'>Switch accounts</Link>
                        <Link className='nav-more-btn' to='login'>Login</Link>
                    </div>
                </div>
                <a className="side-bar-more" onClick={() => setIsExpanted(!isExpanted)}><i className="fa-solid fa-bars"></i><span>More</span></a>
            </section>
        </Fragment>
    )
}





