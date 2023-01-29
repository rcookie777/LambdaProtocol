// Private.tsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { user } from "../../gun/user";

function render(c) {
  return c;
}

const Private = (Component) => {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    (function () {
      const sessionStatus = user.is;

      setHasSession(Boolean(sessionStatus));
    })();
  }, [hasSession, Component]);


  return hasSession ? render(Component) : <Navigate to="/login" />;
};

export default Private;
