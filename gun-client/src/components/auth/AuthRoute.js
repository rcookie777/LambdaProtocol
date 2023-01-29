import { Navigate, Outlet } from "react-router-dom";
import { user } from "../../gun/user";

const AuthRoute = ({ redirectPath = "/login", children }) => {
    if (!user.is) {
      console.log("user");
      return <Navigate to={redirectPath} replace />;
    }
    return children || <Outlet />;
  };
  
  export default AuthRoute;