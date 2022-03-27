import React, { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";

const RedirectLogin = ({ children }: { children: ReactNode }) => {
  const { userId, storageLoaded } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (storageLoaded && !userId) {
      navigate("/login", { replace: true, state: { from: location } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageLoaded]);

  if (userId) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return null;
  }
};

export default RedirectLogin;
