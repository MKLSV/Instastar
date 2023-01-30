import { useNavigate } from "react-router-dom"


export function Notifications({ activityNotif, setSearchModal, searchModal, full, setFull, notificationsModal, notifications }) {

    console.log('ACTIV FROM NOTIF', activityNotif)
    const navigate = useNavigate()

    function goToPost(storyId) {
        navigate(`/post/${storyId}`)
    }

    return <div className={!full && !searchModal && notifications ? "notifications-modal" : "notifications-modal hide"}>
        <header><span>Notifications</span></header>
        <section className="notification-list">
            {activityNotif.map((notif, idx) =>
                <div className="user-info" key={idx} onClick={() => goToPost(notif.storyId)}>
                    <div>
                        <img src={notif.notifBy.imgUrl} />
                        <section>
                            <span className="username new">{notif.notifBy.username} </span>
                            <span>{notif.notif}</span>
                            {/* <span className="username">Mashka</span> */}
                            <div className="message"><span className="time">•</span><span className="time">1h</span></div>
                        </section>
                    </div>
                    <img src={notif.imgUrl} />

                </div>
            )}
        </section>
    </div>
}