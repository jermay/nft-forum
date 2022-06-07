import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "web3uikit";

export interface ButtonLinkProps extends ButtonProps {
  to: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ to, ...props }) => {
  const navigate = useNavigate();
  return <Button {...props} onClick={() => navigate(to)} />;
};
