// Frontend:
useEffect(() => {
    socketService.on('message-to-user', onReciveMessage)

    return () => {
        socketService.off('message-to-user', onReciveMessage)
    }
}, [])

async function onAddMessage(ev) {
    ev.preventDefault()
    const message = {
        text,
        byUserId: user._id,
        toUserId: watchedUser._id,
    }

    try {
        setMessages(prevMessages => [...prevMessages, message])
        await messageService.add(message)
        // Aא messageService: 
        await httpService.post(`message`, message)
    } catch (err) {
        const messages = messages.slice().pop()
        setMessages(messages)
        console.log(err)
    } finally {
        setMessage('')
    }
}

// Backend:
async function addMessage(req, res) {
    try {
        const message = req.body
        const addedMessage = await messageService.add(message)
        socketService.emitToUser({ type: 'message-to-user', data: message, userId: message.toUserId })
        res.json(addedMessage)
    } catch (err) {
        logger.error('Failed to add message', err)
        res.status(500).send({ err: 'Failed to add message' })
    }
}

// Frontend:
const onReciveMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message])
}