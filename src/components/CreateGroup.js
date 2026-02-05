import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/UserContext";

const CreateGroup = ({ isOpen, onClose, userId }) => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const users = await res.json();
      setAvailableUsers(users);
    })();
  }, [userId]);

  const toggleUser = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleCreateGroup = async () => {
    const res = await fetch(`http://localhost:5000/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userIds: selectedUserIds,
        groupName,
      }),
    });

    if (res.ok) {
        onClose();
    }
  };
  const isCreateDisabled =
    !groupName.trim().length || selectedUserIds.length === 0;

  return (
    isOpen && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 24,
        }}
        onClick={() => onClose()}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 style={{ margin: 0 }}>新しいチャット</h2>

          <input
            type="text"
            placeholder="チャット名"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              outline: "none",
            }}
          />

          <div style={{ flex: 1, overflow: "auto" }}>
            <p style={{ marginTop: 0 }}>ユーザー選択:</p>
            {availableUsers.map((u) => (
              <label
                key={u.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(u.id)}
                  onChange={() => toggleUser(u.id)}
                />
                <span>{u.name}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCreateGroup}
            disabled={isCreateDisabled}
            style={{
              alignSelf: "flex-end",
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              background: isCreateDisabled ? "#bbb" : "#111",
              color: isCreateDisabled ? "#666" : "#fff",
              cursor: isCreateDisabled ? "not-allowed" : "pointer",
              opacity: isCreateDisabled ? 0.7 : 1,
            }}
          >
            作成
          </button>
        </div>
      </div>
    )
  );
};

export default CreateGroup;
