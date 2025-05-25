import React, {useEffect, useState } from 'react'
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io('http://localhost:4000');


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {

    const fetchUserAndMessages = async () => {
      try {
        const userRes = await fetch("http://localhost:4000/user/current", {
          credentials: "include",
        })
        if (!userRes.ok) navigate("/")
        const data = await userRes.json()
        setUser(data)

        const messagesRes = await fetch("http://localhost:4000/chat/getMessages", {
          credentials: "include",
        })
        const messagesData = await messagesRes.json();
        console.log(messagesData)
        setMessages(messagesData);
      } catch (err) {
        console.log(err)
      }
    }
    fetchUserAndMessages()
    
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, [navigate]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const chatMessage = {
        message: message,
        username: user.displayName,
        admin: user.isAdmin,
        sentAt: new Date()
      };
      socket.emit('chatMessage', chatMessage);
      setMessage('');
    }
  };
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Chat Room</h5>
        </div>
        <div className="card-body" style={{ height: '300px', overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ color: msg.admin ? "red" : "black" }} className="mb-2">
              <strong>{msg.username}:</strong> {msg.message}
              <div className="text-muted small">{new Date(msg.sentAt).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
        <div className="card-footer">
          <form onSubmit={sendMessage} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat