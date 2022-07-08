import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Form, Typography } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { ButtonLink } from "../../components/ButtonLink";
import { getFormKeyValues } from "../../utils";
import { useLoginContext } from "../login/LoginContext";

export const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useLoginContext();
  const navigate = useNavigate();

  const onSubmit = async (data: FormDataReturned) => {
    setLoading(true);
    try {
      const vals = getFormKeyValues(data);
      await register({
        username: vals.REGISTER_USER,
        password: vals.REGISTER_PASSWORD,
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        id="register-local"
        buttonConfig={{
          isLoading: loading,
          loadingText: "Registering",
          text: "Register",
          theme: "primary",
        }}
        data={[
          {
            key: "REGISTER_USER",
            name: "User Name",
            type: "text",
            validation: {
              required: true,
            },
            value: "",
          },
          {
            key: "REGISTER_PASSWORD",
            name: "Password",
            type: "password",
            validation: {
              required: true,
            },
            value: "",
          },
        ]}
        onSubmit={onSubmit}
        title="Sign Up"
      />
      <Typography>Already have an account?</Typography>
      <ButtonLink text="Login" to="/login" />
    </div>
  );
};
