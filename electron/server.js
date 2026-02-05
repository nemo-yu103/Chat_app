const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");
const cors = require("cors");

const pool = mysql.createPool({
  host: "172.16.2.26",
  port: 3306,
  user: "team1",
  password: "",
  database: "team1_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const login = async (username, password) => {
  const [rows] = await pool.execute(`
        SELECT name, id
        FROM users
        WHERE name = '${username}'
        AND password = '${password}'
    `);
  return rows;
};

const getMessagesFromGroup = async (groupId) => {
  const [rows] = await pool.execute(`
        SELECT * 
        FROM messages 
        WHERE messages.groupid = ${groupId}
    `);
  return rows;
};

const getGroups = async (userId) => {
  const [rows] = await pool.execute(`
        SELECT *
        FROM message_groups
        INNER JOIN users_to_groups
            ON users_to_groups.userid = ${userId}
    `);
  return rows;
};

const postMessage = async (userId, groupId, text) => {
  const [rows] = await pool.execute(`
        INSERT INTO messages (text, userid, created_at, groupid)
        VALUES ("${text}", ${userId}, now(), ${groupId})
    `);
  return rows;
};

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("test endpoint");
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await login(username, password);
    if (data.length) {
      const { name: username, id } = data[0];
      res.json({
        username,
        id,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.get("/messages/:groupId", async (req, res) => {
  try {
    const { groupId } = req.params;
    const rows = await getMessagesFromGroup(groupId);

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.get("/groups/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const rows = await getGroups(userId);

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/messages", async (req, res) => {
  try {
    const { text, groupId, userId } = req.body;
    await postMessage(userId, groupId, text);

    res.status(200);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

app.listen(5000, () => console.log("Running on 5000"));
