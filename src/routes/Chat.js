import { useEffect, useState } from "react";
import CreateGroup from "../components/CreateGroup";
import "./Chat.css";

const Chat = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const currentUserId = 1;

  const testDataUsers = [
    {
      id: 1,
      name: "nemoto"
    },
    {
      id: 2,
      name: "itou"
    }
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      text: inputText,
      userid: 1 // This represents you
    };

    setInputText("");
  };

  const getUserName = (userId) => {
    const user = testDataUsers.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const getMessageStyle = (userId, currentUserId) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: userId === currentUserId ? "flex-end" : "flex-start",
    marginBottom: "10px"
  });

  const getMessages = async () => {
    const asd = await fetch("http://localhost:5000/messages/1", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return asd;
  };

  useEffect(() => {
    (async () => {
      const res = await getMessages();
      const data = await res.json();
      setMessages(data);
      console.log(data);
    })();
  }, []);

  const styles = {
    container: {
      maxWidth: "400px auto",
      margin: "20px auto",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      fontFamily: "sans-serif"
    },
    header: {
      textAlign: "center",
      color: "#333",
      borderBottom: "2px solid #eee",
      paddingBottom: "10px"
    },
    bubble: (isMe) => ({
      backgroundColor: isMe ? "#0084ff" : "#e4e6eb",
      color: isMe ? "white" : "black",
      padding: "8px 12px",
      borderRadius: "15px",
      maxWidth: "80%",
      marginTop: "4px",
      display: "flex",
      flexDirection: "column",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word"
    }),
    userName: {
      fontSize: "12px",
      color: "#666"
    },
    time: {
      fontSize: "11px",
      opacity: 0.7
    },
    messagesText: {
      marginBottom: "4px"
    }
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.header}>Chat Room</h2>
        <div style={{ marginTop: "20px" }}>
          {messages.map((msg, index) => {
            const isMe = msg.userid === currentUserId;
            return (
              <div
                key={index}
                style={getMessageStyle(msg.userid, currentUserId)}
              >
                <span style={styles.userName}>{getUserName(msg.userid)}</span>
                <div style={styles.bubble(isMe)}>{msg.text}</div>
              </div>
            );
          })}
        </div>
      </div>

      <CreateGroup
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default Chat;
