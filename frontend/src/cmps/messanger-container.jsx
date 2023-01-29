import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { messageService } from "../services/message.service"
import { socketService, SOCKET_SEND_MSG, SOCKET_SET_CHAT } from "../services/socket.service"
import { userService } from "../services/user.service"
import { loadUser } from "../store/user.actions"
import { MsgForm } from "./msg-form"

// export function MessangerContainer({ currChat, onAddMessage }) {
export function MessangerContainer({ chatWithId, currChat, onAddMessage }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState({ txt: '' })
    const watchedUser = useSelector(storeState => storeState.userModule.watchedUser)

    const [shouldRenderEmojiPicker, setShouldRenderEmojiPicker] = useState(false)
    const divRef = useRef(null);
    const navigate = useNavigate()



    useEffect(() => {
        loadUser(chatWithId)
    }, [chatWithId])


    useEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight
    }, [messages])

    var objDiv = document.getElementsByClassName("messages-list");
    objDiv.scrollTop = objDiv.scrollHeight;


    const onReciveMessage = (msg) => {
        console.log(msg)
        setMessages(prevMessages => [...prevMessages, msg])
    }
    useEffect(() => {
        // socketService.on('message-to-you', console.log('hello2'))
        socketService.on('message-to-user', onReciveMessage)

        return () => {
            // socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off('message-to-user', onReciveMessage)
            // botTimeout && clearTimeout(botTimeout)
        }
    }, [])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // if (!currChat.withUserId) return
                const messages = await messageService.query({ userId: watchedUser._id })
                setMessages(messages)
            } catch (err) {
                console.log(err)
            }
        }
        fetchMessages()
    }, [watchedUser])


    const onEmojiClick = (emojiObject) => {
        setMessage({ txt: message.txt + emojiObject.emoji })
        setShouldRenderEmojiPicker(false)
    }


    async function addMessage(ev) {
        ev.preventDefault()

        setMessage({ txt: '' })
        const messageToSend = {
            txt: message.txt,
            byUserId: user._id,
            toUserId: watchedUser._id,
        }
        try {
            await messageService.add(messageToSend)
            setMessages(prevMessages => [...prevMessages, messageToSend])
            onAddMessage({ ...messageToSend, toUser: watchedUser.username })
            socketService.emit('message-to-user', messageToSend)
        } catch (err) {
            console.log(err)
        }
    }

    function goToUser() {
        navigate(`../${watchedUser.username}`)
    }

    // if (!watchedUser) return
    return <section className="messanger-container">
        {watchedUser ?
            <header>
                <div className="user-info" onClick={goToUser}>
                    <img src={watchedUser.imgUrl} />
                    <span className="username">{watchedUser.username}</span>
                </div>
                <div className="msg-btns">
                    <svg aria-label="Audio call" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path></svg>
                    <svg aria-label="Video call" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><rect fill="none" height="18" rx="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="16.999" x="1" y="3"></rect><path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    <svg aria-label="View Thread Details" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                </div>
            </header>
            : null}

        <div className="messages-list" ref={divRef}>
            {!!messages.length && messages.map(message => {
                const isMyMessage = (message.toUserId === user._id)
                return <section className={"user-message" + (!isMyMessage ? ' logged-user' : '')} key={message._id}>
                    {isMyMessage && <img src={watchedUser.imgUrl} />}
                    <span>{message.txt}</span>
                </section>
            })}
        </div>

        <div className="picker-container">
            {shouldRenderEmojiPicker && <EmojiPicker
                pickerStyle={{ width: '100%' }}
                onEmojiClick={onEmojiClick} />}
        </div>
        <div className="input-section">
            {/* <EmojiPicker height={200} width={200} /> */}
            <span onClick={() => setShouldRenderEmojiPicker(!shouldRenderEmojiPicker)}><i className="fa-regular fa-face-smile"></i></span>
            <MsgForm comment={message} setComment={setMessage} addStoryComment={addMessage} />
            <a className={message.txt ? 'active' : 'none'} onClick={addMessage}>Send</a>
        </div>
    </section>
}



{/* <div className="messages-list">
<section className="user-message">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXTuSVHaQFZsgKCMpz65dfAkv9y2ph3j5I7jsc8NdtgEebwOYms1P-JD7dkhmhjpnSSJc&usqp=CAU0" />
    <span>Hello come see my bags!!</span>
</section>
<section className="user-message logged-user">
    <span>Comming!!</span>
</section>

</div>
<div className="picker-container">
{showPicker && <EmojiPicker
    pickerStyle={{ width: '100%' }}
    onEmojiClick={onEmojiClick} />}
</div>
<div className="input-section">
{/* <EmojiPicker  height={200} width={200} /> */}
{/* <span onClick={() => setShowPicker(val => !val)}><i className="fa-regular fa-face-smile"></i></span>
<MsgForm comment={message} setComment={setMessage} addStoryComment={addMessage} />
<a className={message.txt ? 'active' : 'none'} onClick={addMessage}>Send</a>
</div> */}