import React, { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";

const RedirectLogin = ({ children }: { children: ReactNode }) => {
  const { userId } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true, state: { from: location } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default RedirectLogin;
