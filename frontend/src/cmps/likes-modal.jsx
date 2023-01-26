
export function LikesModal({ likesIsOpen, likes }) {
    console.log(likes)
    return <div className="likes-modal">
        <div className="likes-container">
            <header>
                <span>Likes</span>
                <a onClick={() => likesIsOpen([])}><i className="fa-solid fa-x"></i></a>
            </header>
            <div className="likes-list">
                {likes.map(like => <div key={like._id} className="like-info">
                    <div>
                        <img src={like.imgUrl} />
                        <section className="user-info">
                            <a>{like.username}</a>
                            <span>{like.fullname}</span>
                        </section>
                    </div>
                    <button>Follow</button>
                </div>)}
            </div>
        </div>
    </div>
}