import { Row, Typography } from "web3uikit";
import { ButtonLink } from "../../components/ButtonLink";
import styled from "styled-components";
import { LoginButton } from "../login/LoginButton";
import { ShowOnLogin } from "../../components/ShowOnLogin";

const HeaderWrapper = styled(Row)`
  margin-bottom: 15px;
  margin-right: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

export const Header: React.FC = () => {
  return (
    <HeaderWrapper alignItems="center" justifyItems="space-between">
      <Typography variant="h1">NFT Forum</Typography>
      <Typography variant="body16">
        Demo app that will support NFT avatars and login using NFTs
      </Typography>
      <ButtonWrapper>
        <LoginButton />
        <ShowOnLogin>
          <ButtonLink to="/thread/new" text="New Thread" theme="primary" />
        </ShowOnLogin>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};
