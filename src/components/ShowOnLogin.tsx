import React from "react";
import { useLoginContext } from "../views/login/LoginContext";

export const ShowOnLogin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useLoginContext();
  if (!isLoggedIn) return null;

  return <>{children}</>;
};
