import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ redirectPath = "/login", children }) => {
    const user = localStorage.getItem("user");
    if (!user) {
      console.log("user");
      return <Navigate to={redirectPath} replace />;
    }
    return children || <Outlet />;
  };
  
  export default AuthRoute;