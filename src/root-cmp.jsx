import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { SideBar } from './cmps/side-bar'
import { UserDetails } from './pages/user-details'

export function RootCmp() {

    return (
        <div className='app-container'>
            <SideBar />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
        </div>
    )
}


