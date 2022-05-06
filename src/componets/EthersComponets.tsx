import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

const EthersComponets: React.FC = () => {
  const [walletAddress1, setWalletAddress1] = useState('');
  const [walletAddress2, setWalletAddress2] = useState('');
  const [walletAddress3, setWalletAddress3] = useState('');

  function fromMnemonic() {
    // 请先填入您的助记词
    let mnemonic = 'xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx';

    // m / purpose' / coin_type' / account' / change / address_index
    // purporse': 固定值44', 代表是BIP44
    // coin_type': 这个代表的是币种, 可以兼容很多种币, 比如BTC是0', ETH是60'
    // btc一般是 m/44'/0'/0'/0
    // eth一般是 m/44'/60'/0'/0

    let path = "m/44'/60'/0'/0/0";
    let mnemonicWallet1 = ethers.Wallet.fromMnemonic(mnemonic, path);

    path = "m/44'/60'/0'/0/1";
    let mnemonicWallet2 = ethers.Wallet.fromMnemonic(mnemonic, path);

    path = "m/44'/60'/0'/0/2";
    let mnemonicWallet3 = ethers.Wallet.fromMnemonic(mnemonic, path);
    console.info(mnemonicWallet1);
    console.info(mnemonicWallet2);
    console.info(mnemonicWallet3);
    setWalletAddress1(mnemonicWallet1.address);
    setWalletAddress2(mnemonicWallet2.address);
    setWalletAddress3(mnemonicWallet3.address);
  }

  return (
    <div className="Web3js">
      <header className="Web3js-header">
        <h3>***请先自行在代码中修改助记词***</h3>
        <button onClick={fromMnemonic}>创建三个账户</button>
        <h3>Wallet Address1: {walletAddress1}</h3>
        <h3>Wallet Address2: {walletAddress2}</h3>
        <h3>Wallet Address3: {walletAddress3}</h3>

        <a href="https://learnblockchain.cn/docs/ethers.js" target={'_blank'}>
          Api: https://learnblockchain.cn/docs/ethers.js
        </a>
      </header>
    </div>
  );
};

export default EthersComponets;
