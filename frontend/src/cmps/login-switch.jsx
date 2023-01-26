import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { useNavigate } from "react-router-dom";
import { login, signup, logout } from '../store/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux';

export function LoginSwitch({ switchIsOpen }) {
    const [users, setUsers] = useState([])
    const [loginModal, onLoginModal] = useState(false)
    const logedinUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    console.log(users)

    useEffect(() => {
        loadUsers()
    }, [])

    function onClose() {
        switchIsOpen(false)
    }

    async function Login(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function Signup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function Logout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function handleChange(user) {
        if (user._id === logedinUser._id) return
        Login(user)
        switchIsOpen(false)
    }

    if (!users.length) return <div className="loading-page"><span className="loading"></span></div>
    return (
        <div className="switch-page">
            {loginModal ?
                <div className='login-form'>
                    <header>
                        <a onClick={onClose}><i className="fa-solid fa-x"></i></a>
                    </header>
                    <div className='login-container'>
                        <div className='logo'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' />
                        </div>
                        <div className='login-form'>
                            <input></input>
                            <input></input>
                            <button>Log in</button>
                        </div>
                    </div>

                </div>
                :
                <div className='switch-form'>

                    <div className='switch-header'>
                        <span>Switch accounts</span>
                        <a onClick={onClose}><i className="fa-solid fa-x"></i></a>
                    </div>
                    <div className='switch-users'>
                        {users.map(user => <section className='switch-user' key={user._id} onClick={() => handleChange(user)}>
                            <div>
                                <img src={user.imgUrl} />
                                <span>{user.username}</span>
                            </div>
                            {user._id === logedinUser._id ? <span className='check'><i className="fa-solid fa-check"></i></span> : ''}
                        </section>)}
                    </div>
                    <div className='switch-footer'>
                        <a onClick={() => onLoginModal(true)}>Log into an Exiting Account</a>
                    </div>
                </div>
            }
        </div>
    )
}