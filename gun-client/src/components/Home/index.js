import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Log In to Chat</h1>
            <NavLink to="/chat">Chat</NavLink>
        </div>
    )
}