import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Typography } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { ButtonLink } from "../../components/ButtonLink";
import { getFormKeyValues } from "../../utils";
import { useLoginContext } from "./LoginContext";

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useLoginContext();
  const navigate = useNavigate();

  const onSubmit = async (data: FormDataReturned) => {
    setLoading(true);
    try {
      const vals = getFormKeyValues(data);
      await login({
        username: vals.LOGIN_USER,
        password: vals.LOGIN_PASSWORD,
      });
      navigate("/");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        id="login-local"
        buttonConfig={{
          isLoading: loading,
          loadingText: "Logging in",
          text: "Login",
          theme: "primary",
        }}
        data={[
          {
            key: "LOGIN_USER",
            name: "User Name",
            type: "text",
            validation: {
              required: true,
            },
            value: "",
          },
          {
            key: "LOGIN_PASSWORD",
            name: "Password",
            type: "password",
            validation: {
              required: true,
            },
            value: "",
          },
        ]}
        onSubmit={onSubmit}
        title="Login"
      />
      <Typography>Don't have an account yet?</Typography>
      <ButtonLink text="Sign Up!" to="/register" />
    </div>
  );
};
