import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useState } from 'react'
import { toggleModal } from '../store/system.action'
import { SearchModal } from './search-modal'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isExpanted, setIsExpanted] = useState(false)
    const [searchModal, setSearchModal] = useState(false)


    const messagebtn = <svg aria-label="Messenger" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>

    // useEffect(() => {
    //     loadUsers()
    //   }, [])


    if (!user) return <div className="loading-page"></div>
    return (
        <Fragment>

            {searchModal && <SearchModal setSearchModal={setSearchModal} />}
            <div className='test'>
                <a className='icon' href='/'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' /></a>
                <a onClick={toggleModal} className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span></a>
            </div>
            <section className="side-bar">
                <a className='icon' href='/'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' /></a>
                <nav>
                    <NavLink className='nav-btn' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span className='nav-name'>Home</span></NavLink>
                    <a onClick={() => setSearchModal(!searchModal)} className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-magnifying-glass"></i></span><span className='nav-name' >Search</span></a>
                    <NavLink className='nav-btn' to='/inbox'><span className='nav-icon'>{messagebtn}</span><span className='nav-name'>Messages</span></NavLink>
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





