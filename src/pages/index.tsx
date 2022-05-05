import styles from './index.less';
import {Divider, Menu} from 'antd';
import MetamaskWallet from "@/componets/MetamaskWallet";
import Web3jsComponets from "@/componets/Web3jsComponets";

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Learn Web3</h1>
      <Divider/>
      <div>
        <h2>一，Wallet:</h2>
        <h3>1，Metamask:</h3>
        <li>
          <MetamaskWallet/>
        </li>
      </div>

      <Divider/>

      <div>
        <h2>二，web3js:</h2>
        <li>
          <Web3jsComponets/>
        </li>
      </div>

      <Divider/>

      <div>
        <h2>三，HD wallet:</h2>
        <li>
          <Web3jsComponets/>
        </li>
      </div>

      <Divider/>
    </div>
  );
}

