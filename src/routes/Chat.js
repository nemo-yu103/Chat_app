import { useEffect, useState } from "react";

const Chat = () => {
    const currentUserId = 1;
    const [messages, setMessages] = useState([]);

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
        return asd;
    };

    useEffect(() => {
        (async () => {
            const res = await getMessages();
            const data = await res.json();
            setMessages(data);
            console.log(data)
        })()
    }, [])

    //---Styles---
    const styles = {
        container: {
            maxWidth: '400px auto',
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
            marginTop: '4px',
            display: 'flex',
            flexDirection: 'column',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
        }),
        userName: {
            fontSize: '12px',
            color: '#666'
        },
        time: {
            fontSize: '11px',
            opacity: 0.7
        },
        messagesText: {
            marginBottom: '4px'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Chat Room</h2>
            <div style={{ marginTop: '20px' }}>
                {messages.map((msg, index) => {
                    const isMe = msg.userid === currentUserId;
                    return (
                        <div key={index} style={getMessageStyle(msg.userid, currentUserId)}>

                         

                                <span style={{
                                    ...styles.userName,
                                    textAlign: isMe ? 'right' : 'left',
                                    display: 'block'
                                }}>
                                    {msg.username} <br />{new Date(msg.created_at).toLocaleDateString("en-CA")}
                                </span>

                                <span style={styles.bubble(isMe)}>
                                    <div style={styles.messagesText}>
                                        {msg.text}
                                    </div>
                            
                                <div style={styles.time}>
                                    {new Date(msg.created_at).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                                </span>
                            </div>
                       
                    );
                })}
            </div>
        </div>
    );
}


export default Chat;
