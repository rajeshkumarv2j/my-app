'use client';

import React, { type SubmitEvent,  useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useTitle } from "@/hooks/useTitle";
import { useDispatch } from "react-redux";

export default function Login() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const navigate = useNavigate();
    const usernameRef = React.useRef<HTMLInputElement>(null);

    console.log("Login redered");

    useEffect(() => {
        console.log("Login mounted");
        usernameRef.current?.focus();
        return () => {
            console.log("Login unmounted");
        }
    }, []);

    const dispatch = useDispatch();

    // useTitle("Login Page");
    // useEffect(() => {
    //     document.title = document.title + `Login Page`;
    // }, []);

    async function handleLogin(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (username !== "" && password !== "") {
            // call login API http://localhost:9000/login with POST method and body { name: username, password: password }
            // fetch("http://localhost:9000/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({ name: username, password: password })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.accessToken) {
            //         setMessage("Login successful");
            //     } else {
            //         setMessage("Invalid username or password");
            //     }
            // })
            // .catch(error => {
            //     console.error("Error:", error);
            //     setMessage("An error occurred while logging in");
            // });


            // axios.post("http://localhost:9000/login", { name: username, password: password })
            //     .then(response => {
            //         if (response.data.accessToken) {
            //             setMessage("Login successful");
            //         } else {
            //             setMessage("Invalid username or password");
            //         }
            //     })
            //     .catch(error => {
            //         console.error("Error:", error);
            //         setMessage("An error occurred while logging in");
            //     });

            //change to async await syntax
            try {
                const response = await axios.post("http://localhost:9000/login", { name: username, password: password });
                console.log("Login response", response);
                setMessage("");
                dispatch({ type: "login", payload: {
                    isAuthencated: true,
                    username,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                } });

                if (response.data.accessToken) {
                    setMessage("Login successful");
                    navigate("/");
                } else {
                    dispatch({ type: "logout", payload: {
                        isAuthencated: false,
                        username: "",
                        accessToken: "",
                        refreshToken: ""
                    } });
                    setMessage("Invalid username or password");
                }
            } catch (error) {
                console.error("Error:", error);
                setMessage("An error occurred while logging in");
            }



        } else {
            setMessage("Please enter both username and password");
        }

    }
    return (
        <div>
            <h1>Login</h1>
            {message ? <div className="alert alert-info">{message}</div> : null}


            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input
                     ref={usernameRef}
                     type="username" className="form-control" id="username" placeholder="User Id"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    );
}