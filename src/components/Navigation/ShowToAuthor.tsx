import React, { ReactNode } from "react";
import useAppSelector from "../../hooks/useAppSelector";

const ShowToAuthor = ({
  children,
  authorId,
}: {
  children: ReactNode;
  authorId: number;
}) => {
  const { userId } = useAppSelector((state) => state.auth);
  if (userId === authorId) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return null;
  }
};

export default ShowToAuthor;
