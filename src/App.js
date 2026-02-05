import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Chat from "./routes/Chat";
import { UserContext } from "./context/UserContext";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState({ id: "", name: "" });

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
