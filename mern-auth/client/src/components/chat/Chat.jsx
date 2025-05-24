import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io('http://localhost:4000');


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/user/current", {
          credentials: "include",
        })
        if (!res.ok) throw new Error("Unauthorized")
        const data = await res.json()
        console.log(data)
        setUser(data)
      } catch (err) {
        navigate("/")
      }
    }
    fetchUser()
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
        text: message,
        timestamp: new Date().toISOString(),
        user: user?.displayName || "Anonymous",
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
            <div key={index} className="mb-2">
              <strong>{msg.user}:</strong> {msg.text}
              <div className="text-muted small">{new Date(msg.timestamp).toLocaleTimeString()}</div>
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
