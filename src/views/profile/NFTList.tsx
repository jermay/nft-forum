import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Badge, Button, Card, ConnectButton, Loading, NFT } from "web3uikit";
import { NftDto } from "../../api/swagger";
import { useApi } from "../../api/useApi";
import { usePageinatedQuery } from "../../utils/usePaginatedQuery";
import { useToast } from "../../utils/useToast";
import { useWeb3Signature } from "../../utils/useWeb3Signature";
import { useLoginContext } from "../login/LoginContext";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`;
const CardWrapper = styled.div`
  width: auto;
  margin-right: 15px;
  margin-bottom: 15px;
`;

export const NFTList: React.FC = () => {
  const [selectedNft, setSelectedNft] = useState<NftDto | undefined>(undefined);
  const { setUser, setAuthToken } = useLoginContext();
  const { getUserNfts, setUserAvatar } = useApi();
  const { getSignature, isWeb3Enabled, signData } = useWeb3Signature();
  const queryOptions = useMemo(() => ({ skip: !signData }), [signData]);
  const {
    goToNextPage,
    goToPrevPage,
    hasNextPage,
    hasPrevPage,
    loading,
    page,
    refresh,
  } = usePageinatedQuery(signData, getUserNfts, queryOptions);
  const { toastError, toastSuccess } = useToast();

  const onNftClick = async (nft: NftDto) => {
    if (!signData) return;

    setSelectedNft(nft);
    const avatarUrl =
      nft.metadata?.animation_url ||
      nft.metadata?.image ||
      nft.metadata?.image_url;
    if (!avatarUrl) {
      toastError({
        message: "NFT metadata does not have a valid image property",
      });
      return;
    }
    const response = await setUserAvatar({
      ...signData,
      tokenAddress: nft.token_address,
      tokenId: nft.token_id,
      avatarUrl,
    });
    setUser(response.user);
    setAuthToken(response.accessToken);
    toastSuccess({ message: "Avatar updated!" });
  };

  if (loading) {
    return <Loading text="Fetching NFTs" spinnerType="wave" />;
  }

  return (
    <>
      <Wrapper>
        <ConnectButton moralisAuth={false} />
        {isWeb3Enabled && !signData && (
          <Button text="Get NFTs" theme="primary" onClick={getSignature} />
        )}
      </Wrapper>
      {page && (
        <>
          <Wrapper>
            {page.data.map((nft) => (
              <CardWrapper key={`${nft.token_address}-${nft.token_id}`}>
                <Card
                  onClick={() => onNftClick(nft)}
                  isSelected={nft === selectedNft}
                >
                  <NFT
                    address={nft.token_address}
                    chain="0x1"
                    tokenId={nft.token_id}
                    metadata={nft.metadata}
                  />
                </Card>
              </CardWrapper>
            ))}
          </Wrapper>
          <Wrapper>
            <Button
              text="Prev"
              theme="primary"
              onClick={goToPrevPage}
              disabled={!hasPrevPage}
            />
            <Badge state="success" text={`${page?.num || 1}`} />
            <Button
              text="Next"
              theme="primary"
              onClick={goToNextPage}
              disabled={!hasNextPage}
            />
            <Button text="Refresh" onClick={refresh} />
          </Wrapper>
        </>
      )}
    </>
  );
};
