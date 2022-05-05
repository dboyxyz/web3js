import React, {useContext, useEffect, useState} from 'react';
import Web3 from 'Web3';

var web3js: Web3;
const Web3jsComponets: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [connectInfo, setConnectInfo] = useState(false);
  const [chainId, setChainId] = useState(0);
  const [gasPrice, setGasPrice] = useState("");
  const [balance, setBalance] = useState("");


  useEffect(() => {
    if (window.ethereum) {
      web3js = new Web3(window.ethereum)

      web3js.eth.getChainId().then((value) => {
        setChainId(value);
      });
      console.log("init!")
    }
  }, [])

  function getAccount() {
    web3js.eth.getAccounts(function (error, result) {
      if (!error) {
        if (result.length === 0) {
          setWalletAddress("");
          setConnectInfo(false);
        } else {
          setWalletAddress(result[0]);
          setConnectInfo(true);
        }
      }
    });
  }

  function requestAccount() {
    web3js.eth.requestAccounts().then((result) => {
      if (result.length === 0) {
        setWalletAddress("");
        setConnectInfo(false);
      } else {
        setWalletAddress(result[0]);
        setConnectInfo(true);
      }
    }).catch((reason) => {
      console.info(reason)
    });
  }

  function getChainId() {
    web3js.eth.getChainId().then((result) => {
      setChainId(result);
    });
  }

  function getGasPrice() {
    web3js.eth.getGasPrice().then((result) => {
      let gasPriceTemp = 'wei:' + result + ',ether:' + web3js.utils.fromWei(result, 'ether')
      setGasPrice(gasPriceTemp);
    });
  }

  function getBalance() {
    if (walletAddress) {
      web3js.eth.getBalance(walletAddress).then((balance) => {
        let balanceTemp = 'wei:' + balance + ',ether:' + web3js.utils.fromWei(balance, 'ether')
        setBalance(balanceTemp)
      })
    }
  }

  function sendTransaction() {
    if (walletAddress) {
      web3js.eth.sendTransaction({
        from: walletAddress,
        to: '0x9F3628f07a80E788B96067E1402318D398467A87',
        value: '100000000000000'
      }, function (error, hash) {
        console.log("sendTransaction hashcode:" + hash)
      });
    } else {
      alert("wallet address is empty!")
    }
  }

  return (
    <div className="Web3js">
      <header className="Web3js-header">
        <button onClick={requestAccount}>
          连接钱包
        </button>

        <button onClick={getAccount}>
          查询钱包地址
        </button>
        <h3>Wallet Address: {walletAddress}</h3>
        <button onClick={getAccount}>
          查询连接信息
        </button>
        <h3>Connect status: {String(connectInfo)}</h3>

        <button onClick={getChainId}>
          查询链ID
        </button>
        <h3>ChainId: {String(chainId)}</h3>

        <button onClick={getGasPrice}>
          查询Gas费用
        </button>
        <h3>Gas Price: {String(gasPrice)}</h3>

        <button onClick={getBalance}>
          查询余额
        </button>
        <h3>Balance: {String(balance)}</h3>

        <button onClick={sendTransaction}>
          Metamask转账交易
        </button>
        <h3></h3>

        <a href='https://learnblockchain.cn/docs/web3.js/getting-started.html'
           target={"_blank"}>
          Api: https://learnblockchain.cn/docs/web3.js/getting-started.html
        </a>
      </header>
    </div>
  );
};

export default Web3jsComponets;
