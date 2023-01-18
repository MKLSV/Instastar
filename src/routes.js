import { StoryIndex } from './pages/story-index.jsx'
import { ProfilePage } from './pages/profile.jsx'
import { CreateStory } from './cmps/create.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <StoryIndex />,
        label: ' Home',
        icon: <i className="fa-solid fa-house"></i>
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
   
]

export default routes