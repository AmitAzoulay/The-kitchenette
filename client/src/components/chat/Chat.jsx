import React, {useEffect, useState } from 'react'
import io from 'socket.io-client';
import {Container, Card, Form, Button, CardBody } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
const socket = io('http://localhost:4000',{
  withCredentials: true
});


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {

    const fetchUserAndMessages = async () => {
      try {
        
     
          

          const messagesRes = await fetch("http://localhost:4000/chat/getMessages", {
            credentials: "include",
          })
          if(messagesRes.ok) {
            const userRes = await fetch("http://localhost:4000/user/current", {
              credentials: "include",
            })
            const data = await userRes.json()
            setUser(data)
          }
          else {
            navigate("/")
          }
          const messagesData = await messagesRes.json();
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
        email: user.email,
        sentAt: new Date()
      };
      socket.emit('chatMessage', chatMessage);
      setMessage('');
    }
  };
  
  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-dark text-white">
          <h5 className="mb-0">The Kitchenette</h5>
        </Card.Header>
        <CardBody style={{ height: '600px', overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ color: msg.admin ? "red" : "black" }} className="mb-2">
              <strong>{msg.username}{user.email === msg.email ? "(you)" : ""}:</strong> {msg.message}
              <div className="text-muted small">{new Date(msg.sentAt).toLocaleTimeString()}</div>
            </div>
          ))}
        </CardBody>
        <Card.Footer>
          <Form onSubmit={sendMessage} className="d-flex">
            <Form.Control
              type="text"
              className="me-2"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" variant="dark" className="btn btn-primary">Send</Button>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default Chat