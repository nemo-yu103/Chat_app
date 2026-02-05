import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Login.css";

const Login = () => {
    const [userename, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        // ログイン処理のロジックをここに追加
        if (userename.trim() === "" || password.trim() === "") {
            setError("ユーザー名とパスワードを入力してください");
            return;
        }

        try {
            // サーバーにログインリクエストを送信
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: userename, password: password })
            });

            // 404や500などのエラーステータスの場合
            if (!res.ok) {
                setError("ユーザー名またはパスワードが正しくありません");
                return;
            }

            const data = await res.json();

            // チャット画面へ遷移
            localStorage.setItem("user", JSON.stringify({
                userId: data.id,
                username: data.username
            }));
            navigate("/chat");
        }
        catch (err) {
            setError("サーバーに接続できませんでした");
        }

    };


    return (
        <>
            <div className="login-page">
                <div className="login-box">
                    <h2 className="title">ログインページ</h2>

                    <input className="imput"
                        type="text"
                        placeholder="ユーザー名"
                        value={userename}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <input className="imput"
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="button-Login">
                        <button onClick={handleLogin}>ログイン</button>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                </div>
            </div>
        </>
    )
}

export default Login;
