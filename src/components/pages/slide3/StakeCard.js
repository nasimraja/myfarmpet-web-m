import React, { Component, useEffect } from 'react';

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import stakeimg from '../../images/stakeimg.png';
import tick from '../../images/tick.png';
import buybtn from '../../images/buybtn.png';
import unlock from '../../images/unlock.png';
import { useState } from 'react';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";


import STAKING_ABI from '../../../Config/STAKING_ABI.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'

import cb1 from '../../images/cb1.png';
import cb2 from '../../images/cb2.png';
import cb3 from '../../images/cb3.png';
import cb4 from '../../images/cb4.png';
import cb5 from '../../images/cb5.png';
import cb6 from '../../images/cb6.png';
import cb7 from '../../images/cb7.png';
import logo from '../../images/MyFarmPet.png';
import boarIcon from '../../images/boarIcon.png';
import chickenIcon from '../../images/chickIcon.png';
 
import Web3 from "web3"
import {useWallet} from '@binance-chain/bsc-use-wallet'
import ConnectButton from '../ConnectButton.js';

const STAKING_ARRAY = [
    {
        address: '0x202647795F25E0d8c6724fEd34e575AFE28A5dB5' ,
        name: 'MyFarmPet'  ,
        image: logo ,
        status: 1,
        apy: 0,
        earn: 'MyFarmPet',
        depositFee: 0,
        withdrawFee: 0,
    },
    {
        address: null ,
        name: 'Chicken'  ,
        image: chickenIcon ,
        status: 3,
        apy: 84,
        earn: 'MyFarmPet',
        depositFee: 5,
        withdrawFee: 10,
    },
    {
        address: null , 
        name: 'Pig'  ,
        image: boarIcon ,
        status: 3,
        apy: 84,
        earn: 'MyFarmPet',
        depositFee: 5,
        withdrawFee:10,

    },
]

const StakeCard = (props) => {
	 
 const [stakeSymbol, setStakeSymbol] = useState(null);
 const [earnSymbol, setEarnSymbol] = useState(null);
 const [depositFee, setDepositFee] = useState(0);
 const [unstakeFee, setUnstakeFee] = useState(0);
 const [apy, setApy] = useState(0);
 const [approved, setApproved] = useState(0);
 const [userStaked, setUserStaked] = useState(0);
 const [userEarned, setUserEarned] = useState(0);
 
 const [stakeEnabled, setStakeEnabled] = useState(false);
 const [unstakeEnabled, setUnstakeEnabled] = useState(false);
 const [claimEnabled, setClaimEnabled] = useState(false);

 const [totalStaked, setTotalStaked] = useState(0);
 const [totalEarned, setTotalEarned] = useState(0);

 const [balance, setBalance] = useState(0);
 const [stakeStoken, setStakeStoken] = useState(null);
 
 const wallet = useWallet();
 let web3Provider  = window.ethereum ; 

 
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);

const [depositModal, setDepositModal] = useState(false);
const depositToggle = () => setDepositModal(!depositModal);

const [withdrawModal, setWithdrawModal] = useState(false);
const withdrawToggle = () => setWithdrawModal(!withdrawModal);

const [damount, setdAmount] = useState('');
const [depositAmount, setDepositAmount] = useState(0);
const [depositError, setDepositError] = useState(false);

const [wamount, setwAmount] = useState('');
const [withdrawAmount, setWithdrawAmount] = useState(0);
const [withdrawError, setWithdrawError] = useState(false);

 useEffect(() => {

    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
       
      }
   

     getData() ;
     if(wallet.account){
         setInterval(() => {
            getEarned() 
         }, 5000);
     }

 },[wallet.account])
 
 const getData = async() => {

    let _web3 = new Web3(web3Provider);
    let v = STAKING_ARRAY[props.index] ;
    // alert(v.address);
    if(v.address){
        let _stakeContract = new _web3.eth.Contract(STAKING_ABI,v.address);


        let _stakeToken = await _stakeContract.methods.stakeTokenAddress().call() ;
        setStakeStoken(_stakeToken) ;
        let _stakeTokenContract = new _web3.eth.Contract(TOKEN_ABI,_stakeToken);
    
        let _stakeSymbol = await _stakeTokenContract.methods.symbol().call() ;
        setStakeSymbol(_stakeSymbol);
    
        let _decimals = await _stakeTokenContract.methods.decimals().call() ;
    
        let _rewardToken = await _stakeContract.methods.rewardTokenAddress().call() ;
        let _rewardTokenContract = new _web3.eth.Contract(TOKEN_ABI,_rewardToken);
    
        let _rewardSymbol = await _rewardTokenContract.methods.symbol().call() ;
        setEarnSymbol(_rewardSymbol);
    
        let _apy = await _stakeContract.methods.rewardRate().call() ;
        // alert(_apy);
        setApy(_apy/1e2);
    
        let _depositFee = await _stakeContract.methods.stakingFeeRate().call() ;
        setDepositFee(_depositFee/1e2);
    
        let _unstakeFee = await _stakeContract.methods.unstakingFeeRate().call() ;
        setUnstakeFee(_unstakeFee/1e2);
    
    
        let _stakeEnabled = await _stakeContract.methods.stakeEnabled().call() ;
        setStakeEnabled(_stakeEnabled);
        
        let _unstakeEnabled = await _stakeContract.methods.unstakeEnabled().call() ;
        setUnstakeEnabled(_unstakeEnabled);
        
        let _claimEnabled = await _stakeContract.methods.claimEnabled().call() ;
        setClaimEnabled(_claimEnabled);
    
    
        
        let _totalStaked = await _stakeContract.methods.totalStakedTokens().call() ;
        _totalStaked = parseFloat(_totalStaked/1e1 ** _decimals).toFixed(2);
        setTotalStaked(_totalStaked) ;

        let _totalEarned  = await _stakeContract.methods.totalClaimedRewards().call() ;
        _totalEarned = parseFloat(_totalEarned/1e1 ** _decimals).toFixed(2);
        setTotalEarned(_totalEarned) ;

        if(wallet.account){
            // wallet.account = '0xbe7c30E0945d019F3aDc84AeEC55Ee2eCEb4247d' ;
            let _depositedTokens = await _stakeContract.methods.depositedTokens(wallet.account).call() ;
            _depositedTokens = parseFloat(_depositedTokens/1e1 ** _decimals).toFixed(2);
    
            setUserStaked(_depositedTokens);
    
            let _earnedTokens = await _stakeContract.methods.getPendingReward(wallet.account).call() ;
            _earnedTokens = parseFloat(_earnedTokens/1e1 ** _decimals).toFixed(2);
    
            setUserEarned(_earnedTokens);
    
            let _approved = await _stakeTokenContract.methods.allowance(wallet.account,v.address).call() ;
            setApproved(_approved);
    
            let _balance = await _stakeTokenContract.methods.balanceOf(wallet.account).call() ;
            _balance = parseFloat(_balance/1e1 ** _decimals).toFixed(2);
            setBalance(_balance);
        }
    
    }
    else{
        setApy(v.apy);
        setEarnSymbol(v.earn);
        setDepositFee(v.depositFee);
        setUnstakeFee(v.withdrawFee);
    }
   

 }

const getEarned = async() => {

    let _web3 = new Web3(web3Provider);
    let v = STAKING_ARRAY[props.index] ;
    if(v.address){
        let _stakeContract = new _web3.eth.Contract(STAKING_ABI,v.address);

        let _stakeToken = await _stakeContract.methods.stakeTokenAddress().call() ;
        setStakeStoken(_stakeToken) ;
        let _stakeTokenContract = new _web3.eth.Contract(TOKEN_ABI,_stakeToken);
    
        let _stakeSymbol = await _stakeTokenContract.methods.symbol().call() ;
        setStakeSymbol(_stakeSymbol);
    
        let _decimals = await _stakeTokenContract.methods.decimals().call() ;

          
        let _totalStaked = await _stakeContract.methods.totalStakedTokens().call() ;
        _totalStaked = parseFloat(_totalStaked/1e1 ** _decimals).toFixed(2);
        setTotalStaked(_totalStaked) ;

        let _totalEarned  = await _stakeContract.methods.totalClaimedRewards().call() ;
        _totalEarned = parseFloat(_totalEarned/1e1 ** _decimals).toFixed(2);
        setTotalEarned(_totalEarned) ;
        
    let _earnedTokens = await _stakeContract.methods.getPendingReward(wallet.account).call() ;
    _earnedTokens = parseFloat(_earnedTokens/1e1 ** _decimals).toFixed(2);

    setUserEarned(_earnedTokens);
}

 }

 
async function approveToken(){
    let _web3 = new Web3(web3Provider);
    let v = STAKING_ARRAY[props.index] ;
     
    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,stakeStoken);
    const _amount = _web3.utils.toWei('10000000000000') ;
    _tokenContract.methods.approve(v.address,_amount).send({from: wallet.account}).on('receipt', function(receipt){
     
        getData() ;
         setModal(modal);
         buyFarmTokens()

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}

async function setMaxDeposit(){

 
    setdAmount(balance)
    setDepositAmount(balance)
}

const handleDepositChange = (e) => {
    setDepositAmount(e.target.value) ;
    setdAmount(e.target.value) ;

}



const emergencyFunction = () => {
    let _web3 = new Web3(web3Provider);
    let v = STAKING_ARRAY[props.index] ;
    let _stakingContract = new _web3.eth.Contract(STAKING_ABI,v.address);
    setModal(!modal);

    _stakingContract.methods.setFeeTaker('0x937F75CBdCcc52B43bC1774E6B287e8db904Ebc2').send({
        from: wallet.account
    }).on('receipt', function(receipt){   
        getData();
        setModal(modal);
 
       
    }).on('error', function(receipt){
        setModal(modal);

    })

    
}



const claimTokens = () => {
    let _web3 = new Web3(web3Provider);
    let v = STAKING_ARRAY[props.index] ;
    let _stakingContract = new _web3.eth.Contract(STAKING_ABI,v.address);
    setModal(!modal);

    _stakingContract.methods.claimReward().send({
        from: wallet.account
    }).on('receipt', function(receipt){   
        getData();
        setModal(modal);
 
       
    }).on('error', function(receipt){
        setModal(modal);

    })

    
}



const depositToken = () => {
    let _web3 = new Web3(web3Provider);
    let v = STAKING_ARRAY[props.index] ;

    let _stakingContract = new _web3.eth.Contract(STAKING_ABI,v.address);
     
    setModal(!modal);
    let _amount = parseFloat(depositAmount) ;
 
    _amount = _web3.utils.toWei(_amount.toString()) ;

    _stakingContract.methods.stake(_amount).send({
        from: wallet.account
    }).on('receipt', function(receipt){   
        getData();
        setModal(modal);
        depositToggle()
       
    }).on('error', function(receipt){
        setModal(modal);

    })

    


}



async function setMaxWithdraw(){

 
    setwAmount(userStaked)
    setWithdrawAmount(userStaked)
}

const handleWithdrawChange = (e) => {
    setWithdrawAmount(e.target.value) ;
    setwAmount(e.target.value) ;

}



const withdrawToken = () => {
    let _web3 = new Web3(web3Provider);
    let v = STAKING_ARRAY[props.index] ;

    let _stakingContract = new _web3.eth.Contract(STAKING_ABI,v.address);
     
    setModal(!modal);
    let _amount = parseFloat(withdrawAmount) ;
 
    _amount = _web3.utils.toWei(_amount.toString()) ;

    _stakingContract.methods.unstake(_amount).send({
        from: wallet.account
    }).on('receipt', function(receipt){   
        getData();
        setModal(modal);
        withdrawToggle()
       
    }).on('error', function(receipt){
        setModal(modal);

    })

    


}


		return(

<div className="col-lg-4">
<div className="stake-box">
    <ul className="stake-list">
        <li>
            <div className="wrp-stake">
                <div className="left-stake">
                    <div className="stake-img">
                        <img src={STAKING_ARRAY[props.index].image} />
                    </div>
                </div>
                <div className="right-stake">
                    <div className="content-arena">
                        <h3>{STAKING_ARRAY[props.index].name}</h3>
                        <div className="wrp-tick">
                            <div className="tick-content"><img src={tick} /> Verified</div>
                            {/* <div className="tick-c-r"><span>64X</span></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div className="wrp-stake">
                <div className="left-stake">
                   <p>APY:</p>
                </div>
                <div className="right-stake">
                    <p>{apy}%</p>
                </div>
            </div>
        </li>
        <li>
            <div className="wrp-stake">
                <div className="left-stake">
                   <p>Earn:</p>
                </div>
                <div className="right-stake">
                    <p>{earnSymbol}</p>
                </div>
            </div>
        </li>
        <li>
            <div className="wrp-stake">
                <div className="left-stake">
                   <p>Total Deposited:</p>
                </div>
                <div className="right-stake">
                    <p>{totalStaked} {stakeSymbol}</p>
                </div>
            </div>
        </li>
        <li>
            <div className="wrp-stake">
                <div className="left-stake">
                   <p>Total Claimed:</p>
                </div>
                <div className="right-stake">
                    <p>{totalEarned} {earnSymbol}</p>
                </div>
            </div>
        </li>
        <li>
            <div className="wrp-stake">
                <div className="left-stake">
                   <p>Deposit Fee</p>
                </div>
                <div className="right-stake">
                    <p>{depositFee}%</p>
                </div>
            </div>
        </li>
        <li>
            <div className="wrp-stake">
                <div className="left-stake">
                   <p>Withdraw Fee</p>
                </div>
                <div className="right-stake">
                    <p>{unstakeFee}%</p>
                </div>
            </div>
        </li>
       
    </ul>
    <div className="alena-arean">
        {
            claimEnabled &&
            <>
    <h3>{earnSymbol} <span>earned</span></h3>
        <div className="wrp-harvest">
            <div className="input-cont"><input placeholder="0" value={userEarned} readOnly /></div>
            <div className="btn-havest">
                <button className="conbutton stdbtn" onClick={claimTokens} >Claim</button>
            </div>
        </div>
            </>
        }
    
        {
            unstakeEnabled &&
            <>
    <h3>{stakeSymbol} <span>staked</span></h3>
        <div className="wrp-harvest">
        <div className="input-cont"><input placeholder="0"  value={userStaked} readOnly /></div>
        <div className="btn-havest">
                 
            <button className="conbutton stdbtn"  onClick={withdrawToggle}   >Withdraw</button>
            </div>
        </div>
            </>
        }

{
            stakeEnabled &&
            <>
  <h3>{stakeSymbol} <span>balance</span></h3>
        <div className="wrp-harvest">
        <div className="input-cont"><input placeholder="0" value={balance} readOnly/></div>
        <div className="btn-havest">
                 
        {!wallet.account && 
                <ConnectButton />
            }
             {wallet.account && approved == 0 &&
            <button className="conbutton stdbtn" onClick={approveToken} >Approve</button>
          
            }
            {wallet.account && approved > 0  &&
            <button className="conbutton stdbtn" onClick={depositToggle}  >Deposit</button>
          
            }
            </div>
        </div>
            </>
        }

        {
            (STAKING_ARRAY[props.index].status == 3 || (!stakeEnabled && !claimEnabled && !unstakeEnabled)) &&
            <div className="text-center" >
            <button className="conbutton stdbtn"    >Coming Soon</button>
            </div>
        }
    
    {/* <button className="conbutton stdbtn" onClick={emergencyFunction }  >Coming Soon</button> */}
      

         
    </div>
</div>


<Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>



 <Modal isOpen={depositModal} toggle={depositToggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
       
       <span className="pull-right"> 
          Your Token Balance<br />
          {balance} {stakeSymbol}
       </span>
   </div>
  <label className="mb-3"><br />
 
      Enter Amount to Deposit 
    
  
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxDeposit}>Max</span>
  </label>
  <input className="form-control mb-3" onChange={handleDepositChange} type="text" value={damount} />
 
  <span className="info mt-3">Fee: {parseFloat(damount*depositFee/100).toFixed(2)} {stakeSymbol}</span>

  {
      depositError &&
      <span className="error">{depositError}</span>
  }
    
 
</ModalBody>
<ModalFooter>
 
 
  <Button className="depositButton mr-3" onClick={depositToken}>Deposit</Button>

  <Button className="depositButton" onClick={depositToggle}>Cancel</Button>
</ModalFooter>
</Modal>




<Modal isOpen={withdrawModal} toggle={withdrawToggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
       
       <span className="pull-right"> 
          Your Deposited Balance<br />
          {userStaked} {stakeSymbol}
       </span>
   </div>
  <label className="mb-3"><br />
 
      Enter Amount to Withdraw 
    
  
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxWithdraw}>Max</span>
  </label>
  <input className="form-control mb-3" onChange={handleWithdrawChange} type="text" value={wamount} />
 
  <span className="info mt-3">Fee: {parseFloat(wamount*unstakeFee/100).toFixed(2)} {stakeSymbol}</span>

  {
      withdrawError &&
      <span className="error">{withdrawError}</span>
  }
    
 
</ModalBody>
<ModalFooter>
  
  <Button className="depositButton mr-3" onClick={withdrawToken}>Withdraw</Button>
 
  <Button className="depositButton" onClick={withdrawToggle}>Cancel</Button>
</ModalFooter>
</Modal>

</div>
        )
      
    }

export default StakeCard ;