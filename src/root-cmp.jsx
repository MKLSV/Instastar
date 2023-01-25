import React, { useState } from 'react'
import { Routes, Route } from 'react-router'

// const Router = ReactRouterDOM.HashRouter

import routes from './routes'

import { SideBar } from './cmps/side-bar'
import { StoryDetails } from './cmps/story-details'
import { LoginSwitch } from './cmps/login-switch'
import { StoryIndex } from './pages/story-index'
import { CreateStory } from './cmps/create'
import { ProfilePage } from './pages/profile'
import CreateStoryModal from './cmps/create-modal'
import { LoginSignup } from './cmps/login-signup'



export function RootCmp() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // <Router>
        <div className='app-container'>
            {isOpen && <CreateStoryModal setIsOpen={setIsOpen} />}
            <SideBar setIsOpen={setIsOpen} />
            <main className='contant-container'>
                <Routes>

                    <Route path="/post" element={<StoryIndex />} >
                        <Route path="/post/:id" element={<StoryDetails />} />
                    </Route>

                    <Route path="/" element={<StoryIndex />} />
                    <Route path="/post/:id" element={<StoryDetails />} />
                    <Route path="create" element={<CreateStory />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="login" element={<LoginSignup />} />
                    {/* <Route path="switch" element={<LoginSwitch />} /> */}
                </Routes>
            </main>
        </div>
    )

    // </Router>
}


