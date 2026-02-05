import React, { useState } from 'react';
import styles from './Chat.css';

const Chat = () => {
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
            text: 'msg1',
            userid: 1,
        },
        {
            text: 'msg2',
            userid: 2,
        },
        {
            text: 'msg3',
            userid: 1,
        },
    ]

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

    return (
        <div className="chat-screen">
            <div className="chat-window">
                <div className="message-list">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-wrapper ${msg.userid === 1 ? 'own' : 'other'}`}>
                            <div className="message-bubble">
                                <div className="user-name">
                                    {testDataUsers.find(u => u.id === msg.userid)?.name}
                                </div>
                                {msg.text}
                            </div>
                        </div>
                    ))}
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
        </div>
    );
};

export default Chat;