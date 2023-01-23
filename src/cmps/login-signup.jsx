import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { login, signup } from '../store/user.actions.js'
import { useNavigate } from "react-router-dom";

export function LoginSignup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])


    async function Login(credentials) {
        try {
            const user = await login(credentials)
            console.log('USER FROM LOGIN', user)

        } catch (err) {
            console.log(err)
        }
    }

    async function Signup(credentials) {
        try {
            const user = await signup(credentials)
            navigate('/')
            console.log('USER FROM SIGN UP', user)
        } catch (err) {
            console.log(err)
        }
    }

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function clearState() {
        setCredentials(userService.getEmptyUser())
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        Login(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        Signup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }


    return (
        <div className="login-page">
            <p>
                <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
            </p>
            {!isSignup && <form className="login-form" onSubmit={onLogin}>
                <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                </select>

                <button>Login!</button>
            </form>}
            <div className="signup-section">
                {isSignup && <form className="signup-form" onSubmit={onSignup}>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button >Signup!</button>
                </form>}
            </div>
        </div>
    )
}