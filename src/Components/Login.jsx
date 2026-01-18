import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        console.log(username, password);
        if (username === "" || password === "") {
            alert("Blank Form are not Accepted");
        }
        else {
            let loginData = {
                username: username.trim(),
                password: password.trim(),
            }
            console.log(loginData);
            const res = await fetch("https://your-service-name.onrender.com/login")
            const data = await res.json();
            console.log(data);
            const result = data.filter(e => e.Username === username && e.Password === password);
            if (result.length !== 0) {
                navigate("/home");
            }
            else {
                alert("Invalid Credentials");
            }
        }
    }
    return (
        <>
            <div className="bg-midnight-purple text-white d-flex justify-content-center align-items-center" id='Main-div' style={{ minHeight: "100vh" }}>
                <h1 className="text-center margin-right">Times Square Academy</h1>
                <form className="w-20 fs-5 pt-3 pb-4 ps-4 pe-4" id="loginForm" method='POST' onSubmit={submit}>
                    <p id="lg" className="text-center fs-3">Login</p>
                    <div className="mb-4">
                        <label htmlFor="username" className="form-label w-100">Username</label>
                        <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} className="form-control hth" id="username" name="username" aria-describedby="Username" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputPassword1" className="form-label w-100">Password</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control hth" name="password" id="password" />
                    </div>
                    <button type="submit" className="mt-3 btn addButton fs-5">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
