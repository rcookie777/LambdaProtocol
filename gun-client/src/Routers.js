import { Route, Routes } from "react-router-dom";
import Home from "./views/HomePage.js";
import Chat from "./components/Chat/index.js";
import Signup from "./views/SignUpPage.js";
import LoginPage from "./views/SignInPage.js";
import Private from "./components/auth/privateRoute.js";

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/chat" element={Private(<Chat />)} />
        </Routes>
    )
}
