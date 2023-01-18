import { CarIndex, StoryIndex } from './pages/story-index.jsx'
import { ReviewIndex } from './pages/review-index.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { ProfilePage } from './pages/profile.jsx'
import { CreateStory } from './cmps/create.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <StoryIndex />,
        label: 'Home',
    },
    {
        path: 'create',
        component: <CreateStory />,
        label: 'Create'
    },
    {
        path: 'profile',
        component: <ProfilePage />,
        label: 'Profile'
    },
    // {
    //     path: '/cars',
    //     component: <CarIndex />,
    //     label: 'Cars'
    // },
    // {
    //     path: 'review',
    //     component: <ReviewIndex />,
    //     label: 'Reviews'
    // },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    // {
    //     path: 'about',
    //     component: <AboutUs />,
    //     label: 'About us'
    // },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // },
    // {
    //     path: 'chat',
    //     component: <MessagePage />,
    //     label: 'Chat'
    // }
]

export default routes