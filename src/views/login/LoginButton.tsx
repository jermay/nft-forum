import React from "react";
import { Button } from "web3uikit";
import { ButtonLink } from "../../components/ButtonLink";
import { useLoginContext } from "./LoginContext";

export const LoginButton: React.FC = () => {
  const { isLoggedIn, logout } = useLoginContext();

  return (
    <>
      {isLoggedIn ? (
        <Button text="Sign Out" theme="secondary" onClick={logout} />
      ) : (
        <ButtonLink to="/login" text="Sign In" theme="primary" />
      )}
    </>
  );
};
