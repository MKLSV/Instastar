import React from 'react'
import { Routes, Route } from 'react-router'

// const Router = ReactRouterDOM.HashRouter

import routes from './routes'

import { SideBar } from './cmps/side-bar'
import { StoryDetails } from './cmps/story-details'
import { StoryIndex } from './pages/story-index'
import { ProfilePage } from './pages/profile'
import CreateStoryModal from './cmps/create-modal'
import { LoginSignup } from './cmps/login-signup'
import { useSelector } from 'react-redux'
import { UserDetails } from './pages/user-details'



export function RootCmp() {
    const isModalOpen = useSelector(storeState => storeState.systemModule.isModalOpen)

    return (
        <div className='app-container'>
            {isModalOpen && <CreateStoryModal />}
            <SideBar />
            <main className='contant-container'>
                <Routes>
                    <Route path="/post" element={<StoryIndex />} >
                        <Route path="/post/:id" element={<StoryDetails />} />
                    </Route>
                    <Route path="/" element={<StoryIndex />} />
                    {/* <Route path="/post/:id" element={<StoryDetails />} /> */}
                    {/* <Route path="profile" element={<ProfilePage />} /> */}
                    <Route path="/:username" element={<UserDetails />} />
                    <Route path="login" element={<LoginSignup />} />
                </Routes>
            </main>
        </div>
    )
}


