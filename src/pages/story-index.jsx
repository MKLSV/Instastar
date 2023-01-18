import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStories} from '../store/story.actions'
import { StoriesList } from '../cmps/stories-list.jsx'

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.carModule.cars)
    const user = useSelector(storeState => storeState.userModule.user)
    console.log(user)
    console.log(user)
    console.log(user)

    useEffect(() => {
        loadStories()
    }, [])

    return (
        <div className='contant'>
            <div className='stories-list'>
                <StoriesList stories={stories} />
            </div>
            <div className='suggestions'>
                <div className= 'user-photo'><img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/></div>
                <p>Demo User</p>
                suggestions for you:
                <ul>
                    <li> <div><img src="https://robohash.org/Deniska?set=set2" /></div>Lebron <span>Follow</span></li>
                    <li> <div><img src="https://robohash.org/tony?set=set2" /></div>chanel <span>Follow</span></li>
                    <li> <div><img src="https://robohash.org/boby?set=set2" /></div>lakers <span>Follow</span></li>
                    <li> <div><img src="https://robohash.org/dima?set=set2" /></div>bmwi <span>Follow</span></li>
                    <li> <div><img src="https://robohash.org/daniel?set=set2" /></div>nike <span>Follow</span></li>
                </ul>
            </div>
        </div>
    )
}