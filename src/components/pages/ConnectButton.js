import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import React, { useEffect, useState } from "react";
import { withStorage } from 'react-browser-storage';
 
import binanceChain from "../images/icons/binanceChain.png";
import coin98 from "../images/icons/coin98.png";
import mathwallet from "../images/icons/mathwallet.png";
import metamask from "../images/icons/metamask.png";
import safepal from "../images/icons/safepal.png";
import tokenpocket from "../images/icons/tokenpocket.png";
import Trustwallet from "../images/icons/Trustwallet.png";
import walletConnect from "../images/icons/walletConnect.png";
import {useWallet} from '@binance-chain/bsc-use-wallet' 
import { TOKEN } from '../../Config';
import TOKEN_ABI from '../../Config/TOKEN_ABI.json'
import Web3 from "web3"


const ConnectButton = ({ provider }) => {
  const [showOption, setOption]= useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setSubmenu]= useState(false)
  const wallet = useWallet()
  const [connectModal, setconnectModal] = useState(null);
  const [balance, setBalance] = useState(0);
  const [symbol, setSymbol] = useState(null);
  
  const [disconnectModal, setdisconnectModal] = useState(false);
 
  let web3Provider = window.ethereum ;
  const connectModalToggle = () => setconnectModal(!connectModal);
  const disconnectModalToggle = () => setdisconnectModal(!disconnectModal);
  const [ providerId, setProvider, clearProvider ] = provider;

  const isWalletConnected=()=>{
    return wallet.status === "connected" 
  }

  const connectWallet = (_p) => {
    if(_p == "injected"){
      wallet.connect();
    }
    else{
      wallet.connect(_p);
    }

    setProvider(_p);
    setconnectModal(!connectModal)
  } 

  const logout = () => {
    wallet.reset() ;
    setProvider(null);
    setdisconnectModal(!disconnectModal)
 
  } 
    
  const getBalance = async () => {
    let _web3 = new Web3(web3Provider);
    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,TOKEN);
    let _symbol = await _tokenContract.methods.symbol().call() ;
    // alert(_symbol);

    setSymbol(_symbol);

    if(wallet.account){
      let _tokenBalance = await _tokenContract.methods.balanceOf(wallet.account).call() ;

      _tokenBalance = parseFloat(_tokenBalance/1e18).toFixed(2) ;
      setBalance(_tokenBalance);
    }

  }
  const getTrimmedWallet = () => {
    let walletAddress = wallet.account;
    console.log("walletAddress", walletAddress)

    if(walletAddress){
      walletAddress = walletAddress.substring(0, 6)+"...."+walletAddress.substring(walletAddress.length - 6)
    }
    return walletAddress

  }
  useEffect(()=>{
    getBalance() ;

  },[wallet.account])

  useEffect(()=>{
    if(window.ethereum){
      web3Provider  = window.ethereum;
    }
    else{
      web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
     
    }

    if(providerId == "injected"){
      wallet.connect();
    }
    else{
      wallet.connect(providerId)
    }

  
 
   
      

  },[])
  return (
          <>
          {wallet.account && 
            <button className="conbutton" onClick={disconnectModalToggle}>{wallet.account.substring(0, 6)+"...."+wallet.account.substring(wallet.account.length - 6)}</button>
          
          }
          {!wallet.account && 
            <button className="conbutton" onClick={connectModalToggle}>Unlock Wallet</button>          
        }
               

      
            
 <Modal isOpen={disconnectModal} toggle={disconnectModalToggle} className="disconnect-box"   centered={true}>
 <ModalHeader toggle={disconnectModalToggle}><span className="roititle font-weight-bold">Your Wallet</span></ModalHeader>
   <ModalBody>
   <div className="mt-3 text-center">
                   
   <div className="moveRight text-left mb-3">
   <span className="pull-left"> 
          Your Balance<br />
          {balance} {symbol}  
       </span>       
       
   </div>

                <p className="walletText mt-3">{wallet.account}</p>
                
                <p className="mt-2 mb-3 text-center">
                View on BscScan? <a href={"https://bscscan.com/address/"+wallet.account} target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>
                  </p>
                 <button className="connectbtn mb-3" onClick={() => logout()}>Logout</button>                 

       </div>        
   </ModalBody>
    
 </Modal>

 <Modal isOpen={connectModal} toggle={connectModalToggle} className="connect-box"  centered={true}>
 <ModalHeader toggle={connectModalToggle}><span className="ml-1 roititle font-weight-bold">Connect Wallet</span></ModalHeader>
   <ModalBody>
   <div className="mt-2">
           
                 <div className="connectbtn mb-2" onClick={() => connectWallet('injected')}><span className="float-left">MetaMask</span> <img className="float-right" src={metamask} /> </div>                 
                 <div className="connectbtn mb-2" onClick={() => connectWallet('injected')}><span className="float-left">TrustWallet</span> <img className="float-right" src={Trustwallet} /> </div>                 
                 <div className="connectbtn mb-2" onClick={() => connectWallet('injected')}><span className="float-left">MathWallet</span> <img className="float-right" src={mathwallet} /> </div>                 
                 <div className="connectbtn mb-2" onClick={() => connectWallet('injected')}><span className="float-left">TokenPocket</span> <img className="float-right" src={tokenpocket} /> </div>                 
                 <div className="connectbtn mb-2" onClick={() => connectWallet('walletconnect')}><span className="float-left">Wallet Connect</span> <img className="float-right" src={walletConnect} /> </div>                 
                 <div className="connectbtn mb-2" onClick={() => connectWallet('bsc')}><span className="float-left">Binance Smart Chain Wallet</span> <img className="float-right" src={binanceChain} /> </div>                 
                 <div className="connectbtn mb-2" onClick={() => connectWallet('injected')}><span className="float-left">Safepal Wallet</span> <img className="float-right" src={safepal} /> </div>                 
                 <div className="connectbtn mb-2" onClick={() => connectWallet('injected')}><span className="float-left">Coin98 Wallet</span> <img className="float-right" src={coin98} /> </div>                 
{/*                                               
                <p className="bottomtext"><a href="https://docs.pancakeswap.finance/get-started/connection-guide" target="_blank">Learn how to connect? <i class="fa fa-question-circle-o" aria-hidden="true"></i>   </a></p> */}
       </div>        
   </ModalBody>
    
 </Modal>

    </>
  );
};
export default withStorage(['provider'])(ConnectButton);

