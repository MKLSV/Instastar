import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MessangerContainer } from '../cmps/messanger-container'
import { messageService } from '../services/message.service'
import { socketService } from '../services/socket.service'

export function Messanger() {
  const [chatMap, setChatMap] = useState({})
  const [currChat, setCurrChat] = useState({})
  const loggedInUser = useSelector(storeState => storeState.userModule.user)

  const user = useSelector(storeState => storeState.userModule.user)


  useEffect(() => {
    const fetchChats = async () => {
      try {
        let chats = await messageService.getAvailableChats()
        chats = chats.reduce((acc, value) => {
          const chatWith = (value.byUser.username === loggedInUser.username) ? value.toUser : value.byUser
          acc[chatWith.username] = {
            username: chatWith.username,
            imgUrl: chatWith.imgUrl,
            txt: value.txt,
            lastSentMessage: value.createdAt,
            withUserId: chatWith._id
          }
          return acc
        }, {})
        setChatMap(chats)
      } catch (err) {
        console.log(err)
      }
    }
    fetchChats()
  }, [])

  const onAddMessage = newMessage => {
    const chatMapCopy = structuredClone(chatMap)
    chatMapCopy[newMessage.toUser].txt = newMessage.txt
    setChatMap(chatMapCopy)
  }



  return <div className="messages-page">

    <div className="message-container">

      <section className="message-users">
        <header>
          <span>{user.username}</span>
          <a><svg aria-label="New message" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg></a>
        </header>

        <div className="users-container" >
          {!!Object.keys(chatMap).length && Object.keys(chatMap).map(chatWith => {
            return <div className="user-info" key={chatWith} onClick={() => setCurrChat(chatMap[chatWith])}>
              <img src={chatMap[chatWith].imgUrl} />
              <section className="new">
                <span className="username">{chatMap[chatWith].username}</span>
                <div className="message"><span>{chatMap[chatWith].txt}</span><span className="time">•</span><span className="time">Just now</span></div>
              </section>
            </div>
          })}
        </div>

      </section>
      {Object.keys(currChat).length === 0 ?
        <div className="messanger-container">
          <svg aria-label="Direct" class="_ab6-" color="#262626" fill="#262626" height="96" role="img" viewBox="0 0 96 96" width="96"><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="69.286" x2="41.447" y1="33.21" y2="48.804"></line><polygon fill="none" points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
          <span>Your Messages</span>
          <p>Send private photos and messages to a friend or group.</p>
          <button>Send Message</button>
        </div>
        :
        <MessangerContainer currChat={currChat} onAddMessage={onAddMessage} />
      }

    </div>

  </div>
}
