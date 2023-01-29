import { Route, Routes } from "react-router-dom";
import Home from "./views/HomePage.js";
import Chat from "./components/Chat/index.js";
import Signup from "./views/SignUpPage.js";
import LoginPage from "./views/SignInPage.js";
import Private from "./components/auth/privateRoute.js";
import ChatRooms from "./views/ChatRooms.js";
import Profile from "./components/User/Profile.js";

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/chat" element={<ChatRooms />}>
                <Route path="" element={<h1 className="p-8">Click on a class name to open helproom</h1>} />
                <Route path=":chatId" element={<Chat />} />
            </Route>
            <Route path="/profile" element={<Profile/>} />
        </Routes>
    )
}
