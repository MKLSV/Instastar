import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { SideBar } from './cmps/side-bar'
import { StoryDetails } from './cmps/story-details'
import { LoginSignup } from './cmps/login-signup'

export function RootCmp() {

    return (
        <div className='app-container'>
            <SideBar />
            <main className='contant-container'>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="story/:id" element={<StoryDetails />} />
                    <Route path="login" element={<LoginSignup />} />
                </Routes>
            </main>
        </div>
    )
}


