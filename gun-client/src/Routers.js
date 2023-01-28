import { Route, Routes } from "react-router-dom";
import Home from "./views/HomePage.js";
import Chat from "./components/Chat/index.js";
import AuthRoute from "./components/auth/AuthRoute";



export default function Routers() {
    return(
    <Routes>
        <Route exact path="/" element={<Home />} />

        <Route element={<AuthRoute />} />
            <Route exact path="/chat" element={<Chat />} />
    </Routes>
    )
}
