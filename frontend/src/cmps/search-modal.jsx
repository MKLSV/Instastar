import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { loadUsers } from "../store/user.actions"


export function SearchModal({ setSearchModal }) {
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const elInputRef = useRef(null)
    const users = useSelector(storeState => storeState.userModule.users)
    const filteredUsers = userService.filterUsers(filterBy, users)
    const navigate = useNavigate()

    useEffect(() => {
        elInputRef.current.focus()
        loadUsers()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        setFilterBy(filterBy)
    }, [filterBy])


    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterBy((prevFilter) => {
            return { prevFilter, [field]: value };
        });
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        // onSetFilter(filterBy)
    }

    function goTo(username) {
        setSearchModal(false)
        navigate(username)
    }

    return <div className="search-modal">
        <section className="car-filter full main-layout">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="vendor">Search</label>
                <input type="text"
                    id="vendor"
                    name="txt"
                    placeholder="Search"
                    value={filterBy.txt}
                    onChange={handleChange}
                    ref={elInputRef}
                />
            </form>
        </section>
        <div>
            {filteredUsers.length && filterBy.txt ? filteredUsers.map(user =>
                <div onClick={() => goTo(user.username)} className="user-container">
                    <img src={user.imgUrl} />
                    <section>
                        <span className="username">{user.username}</span>
                        <span className="fullname">{user.fullname}</span>
                    </section>
                </div>)
                : <div className="empty-search">
                    <span>No recent searches.</span>
                </div>}
        </div>
    </div>
}
