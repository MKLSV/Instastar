import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { useNavigate } from "react-router-dom";
import { login, signup, logout } from '../store/user.actions'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux';

export function LoginSignup() {

    const [users, setUsers] = useState([])
    const logedinUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    function onClose() {
        navigate(-1)
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
        navigate(-1)
    }

    if (!users.length) return <div className="loading-page"><span className="loading"></span></div>
    return (
        <div className="login-page">

            <div className='login-form'>

                <div className='login-header'>
                    <span>Switch accounts</span>
                    <a onClick={onClose}><i className="fa-solid fa-x"></i></a>
                </div>
                <div className='login-users'>
                    {users.map(user => <section className='login-user' key={user._id} onClick={() => handleChange(user)}>
                        <div>
                            <img src={user.imgUrl} />
                            <span>{user.username}</span>
                        </div>
                        {user._id === logedinUser._id ? <span className='check'><i className="fa-solid fa-check"></i></span> : ''}
                    </section>)}
                </div>
                <div className='login-footer'>
                    <a>Log into an Exiting Account</a>
                </div>
            </div>
        </div>
    )
}