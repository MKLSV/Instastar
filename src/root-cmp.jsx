import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { SideBar } from './cmps/side-bar'
import { StoryDetails } from './cmps/story-details'
import { LoginSignup } from './cmps/login-signup'
import { StoryIndex } from './pages/story-index'
import { CreateStory } from './cmps/create'
import { ProfilePage } from './pages/profile'

export function RootCmp() {

    return (
        <div className='app-container'>
            <SideBar />
            <main className='contant-container'>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    <Route path="/" element={<StoryIndex />} >
                    </Route>
                    <Route path="create" element={<CreateStory />} />
                    <Route path="story/:id" element={<StoryDetails />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="login" element={<LoginSignup />} />
                </Routes>
            </main>
        </div>
    )
}


