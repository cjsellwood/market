import React, { ReactNode } from "react";
import useAppSelector from "../../hooks/useAppSelector";

const ShowToUnauthorized = ({ children }: { children: ReactNode }) => {
  const { userId } = useAppSelector((state) => state.auth);
  if (userId) {
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default ShowToUnauthorized;
