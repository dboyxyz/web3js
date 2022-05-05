import React, {useContext, useEffect, useState} from 'react';

const MetamaskWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [connectInfo, setConnectInfo] = useState(false);
  const [chainId, setChainId] = useState(0)

  interface ConnectInfo {
    chainId: string;
  }

  function handleConnect(connectInfo: ConnectInfo) {
    console.log(connectInfo);
    if (window.ethereum) {
      // 此处才能获取到是否连接，一般能进入此处回调
      // setConnectInfo(window.ethereum.isConnected())
      setChainId(connectInfo.chainId)
      console.log(window.ethereum.isConnected())
    }
  }

  function handleDisconnect() {
    console.log('wallet disconnected.');
  }

  function handleAccountsChanged(accounts: Array<string>) {
    console.log(accounts);
    if (accounts.length === 0) {
      setWalletAddress("");
      setConnectInfo(false);
    } else {
      setWalletAddress(accounts[0]);
      setConnectInfo(true);
    }
  }

  function handleChainChanged(chainid) {
    setChainId(chainid);
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // 下面两个回调不准确，待查
    window.ethereum.on('connect', handleConnect);
    window.ethereum.on('disconnect', handleDisconnect);

    console.log("init!")
  }, [])

  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log('detected');

      window.ethereum.request({
        method: "eth_requestAccounts",
      }).then((result) => {
        // The result varies by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
        setWalletAddress(result[0]);
        setConnectInfo(true);
      }).catch((error) => {
        // If the request fails, the Promise will reject with an error.
        console.log(error);
      });
    } else {
      alert('Meta Mask not detected');
    }
  }

// Create a provider to interact with a smart contract
  function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      requestAccount();
    }
  }

  return (
    <div className="Metamask">
      <header className="Metamask-header">
        <button onClick={connectWallet}>
          Connect Wallet
        </button>

        <h3>Wallet Address: {walletAddress}</h3>
        <h3>Connect status: {String(connectInfo)}</h3>
        <h3>ChainId: {String(chainId)}</h3>
        <a href='https://docs.metamask.io/guide/#why-metamask'
           target={"_blank"}>
          Api: https://docs.metamask.io/guide/#why-metamask
        </a>
      </header>
    </div>
  );
};

export default MetamaskWallet;
