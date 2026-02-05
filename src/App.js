import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from "./routes/Login";
import Chat from './routes/Chat'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <Login />
        }>
        </Route>
        <Route path="/chat" element={
          <Chat />
        }>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
