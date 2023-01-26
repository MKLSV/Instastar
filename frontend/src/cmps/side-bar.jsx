import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment,useState } from 'react'
import { toggleModal } from '../store/system.action'
import { SearchModal } from './search-modal'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isExpanted, setIsExpanted] = useState(false)
    const [searchModal, setSearchModal] = useState(false)

    // useEffect(() => {
    //     loadUsers()
    //   }, [])


    // if (!user) return <div className="loading-page"></div>

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
                    <NavLink className='nav-btn' key='feed' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span className='nav-name'>Home</span></NavLink>
                    <a onClick={() => setSearchModal(!searchModal)} className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-magnifying-glass"></i></span><span className='nav-name' >Search</span></a>
                    <a onClick={toggleModal} className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span><span className='nav-name' >Create</span></a>
                    <NavLink className='nav-btn' key='profile' to={user.username}><span className='nav-icon'><img src={user.imgUrl} /></span><span className='nav-name' >Profile</span></NavLink>
                </nav>
                <div>
                    <div className={isExpanted ? 'nav-more open' : 'nav-more'}>
                        <Link className='nav-more-btn' key='switch' to='switch'>Switch accounts</Link>
                        <Link className='nav-more-btn' key='login' to='login'>Login</Link>
                    </div>
                </div>
                <a className="side-bar-more" onClick={() => setIsExpanted(!isExpanted)}><i className="fa-solid fa-bars"></i><span>More</span></a>
            </section>
        </Fragment>
    )
}