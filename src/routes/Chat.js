import { useEffect, useState } from "react";
import CreateGroup from "../components/CreateGroup";
import "./Chat.css";

const Chat = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [user, setUser] = useState({ userId: null, username: "" });
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const getMessages = async (userId) => {
    const res = await fetch(`http://localhost:5000/messages/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  };

  const sendMessage = async (userId) => {
    const res = await fetch(`http://localhost:5000/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText, groupId: 1, userId: userId })
    });
    const json = await res.json();
    return json;
  };

  const deleteMessage = async (msgId) => {
    const res = await fetch(`http://localhost:5000/messages/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msgId })
    });
    const json = await res.json();
    return json;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    await sendMessage(user.userId);
    const updatedMessages = await getMessages(user.userId);
    setInputText("");
    setMessages(updatedMessages);
  };

  const handleDeleteMessage = async (msgId) => {
    await deleteMessage(msgId);
    const updatedMessages = await getMessages(user.userId);
    setMessages(updatedMessages);
  };

  const getMessageStyle = (userId, currentUserId) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: userId === currentUserId ? "flex-end" : "flex-start",
    marginBottom: "10px"
  });

  useEffect(() => {
    if (!user.userId) return;
    console.log("adasd");

    (async () => {
      const messages = await getMessages(user.userId);
      setMessages(messages);
    })();
  }, [user]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const parsed = JSON.parse(userData);
    setUser({ userId: parsed.userId, username: parsed.username });
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
        <button onClick={() => setIsCreateModalOpen(true)} >新しいチャット</button>
        <h2 style={styles.header}>Chat Room</h2>
        <div style={{ marginTop: "20px" }}>
          {messages.map((msg, index) => {
            const isMe = msg.userid === user.userId;
            return (
              <div key={index} style={getMessageStyle(msg.userid, user.userId)}>
                <span
                  style={{
                    ...styles.userName,
                    textAlign: isMe ? "right" : "left",
                    display: "block"
                  }}
                >
                  {msg.username} <br />
                  {new Date(msg.created_at).toLocaleDateString("en-CA")}
                </span>

                <span style={styles.bubble(isMe)}>
                  <div style={styles.messagesText}>{msg.text}</div>

                  <div style={styles.time}>
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                </span>

                {msg.userid === user.userId && (
                  <button onClick={() => handleDeleteMessage(msg.id)}>
                    削除
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="input-section">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="メッセージを入力して..."
          />
          <button onClick={handleSendMessage}>送信</button>
        </div>
      </div>

      <CreateGroup
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        userId={user.userId}
      />
    </>
  );
};

export default Chat;
