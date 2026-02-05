import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [userename, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        // ログイン処理のロジックをここに追加
        if (userename.trim() === "" || password.trim() === "") {
            setError("ユーザー名とパスワードを入力してください");
            return;
        }

        //　仮ログイン成功
        setError("");
        navigate('/chat');
    };


    return (
        <>
            <div>
                <h2>ログインページ</h2>

                <input
                    type="text"
                    placeholder="ユーザー名"
                    value={userename}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                    <button onClick={handleLogin}>ログイン</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>
        </>
    )
}

export default Login;