import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {UseWalletProvider} from '@binance-chain/bsc-use-wallet'
import Config from "./Config"

 
ReactDOM.render(<UseWalletProvider
    connectors={{
     walletconnect: {rpcUrl :"https://bsc-dataseed.binance.org/"}
    }}
   chainId={Config.CHAIN_ID}>
       <App />
       </UseWalletProvider>
       , document.getElementById('root'));
 