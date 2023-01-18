import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)

    return (
        <section className="side-bar">
            <a href='/'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' style={{ width: "130px" }} /></a>
            <nav>
                {routes.map(route => <NavLink className='nav-btn' key={route.path} to={route.path}>{route.icon}{route.label}</NavLink>)}
            </nav>
            <a>More</a>
        </section>
    )
}