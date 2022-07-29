import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../views/login/LoginContext";

export interface ShowOnLoginProps {
  children: React.ReactNode;
  redirect?: boolean;
}

export const ShowOnLogin: React.FC<ShowOnLoginProps> = ({
  children,
  redirect = false,
}) => {
  const { isLoggedIn } = useLoginContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && redirect) navigate("/login");
  }, [isLoggedIn, redirect]);

  if (!isLoggedIn) return null;

  return <>{children}</>;
};
