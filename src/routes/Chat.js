
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

    //---Styles---
    const Styles = {
        container: {
            maxWidth: '400px',
            margin: '20px auto',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            fontFamily: 'sans-serif'
        },
        hesder: {
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
        useerName: {
            fontSize: '12px',
            color: '#666'
        }
    };

    return (
        <div style={{ padding: '20px', frontFamily: 'Arial' }}>
            ChatRoom

            {testDataMessages.map((msg, index) => {
                const user = testDataUsers.find(
                    (u) => u.id === msg.userid
                );

                return (
                    <div key={index}>
                        <strong>{user?.name}</strong> {msg.text}
                    </div>
                );
            })}
        </div>
    )
}

export default Chat;