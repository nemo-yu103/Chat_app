import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
    const currentUserId = 1;

    const testDataUsers = [
        {
            id: 1,
            name: "nemoto",
        },
        {
            id: 2,
            name: "itou",
        },
    ]

    const testDataMessages = [
        {
            text: "msg1",
            userid: 1,
        },
        {
            text: "msg2",
            userid: 2,
        },
        {
            text: "msg3",
            userid: 1,
        },
    ];

    const [messages, setMessages] = useState(testDataMessages);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            text: inputText,
            userid: 1, // This represents you
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };


    const getUserName = (userId) => {
        const user = testDataUsers.find(u => u.id === userId);
        return user ? user.name : "Unknown";
    };

    const getMessageStyle = (userId, currentUserId) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: userId === currentUserId ? 'flex-end' : 'flex-start',
        marginBottom: '10px'
    });

    const getMessages = async () => {
        const asd = await fetch("http://localhost:5000/messages/1", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log(asd);
    };

    //---Styles---
    const styles = {
        container: {
            maxWidth: 'auto',
            margin: '20px auto',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            fontFamily: 'sans-serif'
        },
        header: {
            textAlign: 'center',
            color: '#333',
            borderBottom: '2px solid #eee',
            paddingBottom: '10px'
        },
        bubble: (isMe) => ({
            backgroundColor: isMe ? '#0084ff' : '#e4e6eb',
            color: isMe ? 'white' : 'black',
            padding: '8px 12px',
            borderRadius: '15px',
            maxWidth: '80%',
            marginTop: '4px'
        }),
        userName: {
            fontSize: '12px',
            color: '#666'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Chat Room</h2>
            <div style={{ marginTop: '20px' }}>
                {testDataMessages.map((msg, index) => {
                    const isMe = msg.userid === currentUserId;
                    return (
                        <div key={index} style={getMessageStyle(msg.userid, currentUserId)}>
                            <span style={styles.userName}>
                                {getUserName(msg.userid)}
                            </span>
                            <div style={styles.bubble(isMe)}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="input-section">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}


export default Chat;
