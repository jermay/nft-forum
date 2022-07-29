import { useState } from "react";
import { useMoralis } from "react-moralis";

export interface SignatureDto {
  address: string;
  chainId: number;
  signature: string;
}

export const useWeb3Signature = () => {
  const [isSigning, setIsSigning] = useState(false);
  const [signData, setSignData] = useState<SignatureDto>();
  const { isWeb3Enabled, web3 } = useMoralis();

  const getSignature = async () => {
    if (!isWeb3Enabled || !web3 || isSigning) return;
    
    setIsSigning(true);
    const signer = web3.getSigner();
    const address = await signer.getAddress();
    const signature = await signer.signMessage("NFT Forum Authentication");
    const chainId = await signer.getChainId();
    const signDto: SignatureDto = { address, chainId, signature };
    setIsSigning(false);
    setSignData(signDto);
  }

  return {
    getSignature,
    isSigning,
    isWeb3Enabled,
    signData,
  }
}
