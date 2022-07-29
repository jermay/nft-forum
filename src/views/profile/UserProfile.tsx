import React from "react";
import { useMoralis } from "react-moralis";
import { Avatar, ConnectButton, Row, Typography } from "web3uikit";
import { useLoginContext } from "../login/LoginContext";
import { NFTList } from "./NFTList";

export const UserProfile: React.FC = () => {
  const { user } = useLoginContext();
  const { isWeb3Enabled } = useMoralis();
  if (!user) return null;

  return (
    <Row.Col span={24}>
      <>
        <Typography variant="h2">{user.username}</Typography>
        <Avatar theme="image" isRounded={true} image={user.avatarUrl} size={100} />
        {user.avatarUrl ? null : (
          <>
            {isWeb3Enabled ? (
              <>
                <Typography variant="h4">
                  Select your forum avatar
                </Typography>
                <NFTList />
              </>
            ) : (
              <>
                <Typography>
                  Connect your wallet to set an NFT as your avatar
                </Typography>
                <ConnectButton moralisAuth={false} />
              </>
            )}
          </>
        )}
      </>
    </Row.Col>
  );
};
