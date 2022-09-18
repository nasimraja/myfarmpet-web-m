import React, {  useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import Header from '../header.js';
import Footer from '../footer.js';
import stoke from '../../images/stoke.png';
import chicken1 from '../../images/chicken1.png';
import flower from '../../images/flower.png';   
import c3 from '../../images/c3.png';
import c4 from '../../images/c4.png';
import c5 from '../../images/c5.png';
import c6 from '../../images/c6.png';
import c7 from '../../images/c7.png';
import backbtn from '../../images/backbtn.png';
import { KINGGAME , TX_LINK} from '../../../Config/index.js';
import KINGGAME_ABI from '../../../Config/KINGGAME_ABI.json';

import Web3 from "web3"
import {useWallet} from '@binance-chain/bsc-use-wallet'

import TOKEN_ABI from "../../../Config/TOKEN_ABI.json"

const KingGame = () =>{
    const wallet = useWallet()
	const [connectModal, setconnectModal] = useState(null);

	const [showPlay, setShowPlay] = useState(false);
	

	const [modal, setModal] = useState(false);
	
	const [timer, setTimer] = useState(null);
	const [lastBidder, setlastBidder] = useState(null);
	const [winner, setWinner] = useState(false);
	const [waiting, setWaiting] = useState(false);
	const [nextTime, setnextTime] = useState(0);
	const [lastBidTime, setlastBidTime] = useState(0);
	const [endDelay, setendDelay] = useState(0);
	
	const [gameOn, setGameon] = useState(false);
	const [approved, setApproved] = useState(0);
	const [tokenBalance, setTokenbalance] = useState(0);
	const [bidAmount, setBidAmount] = useState(0);
	const [totalBid, settotalBid] = useState(0);
	const [potBalance, setpotBalance] = useState(0);
	
	const [remainingSeconds, setremainingSeconds] = useState(0);
	
	const [tokenSymbol, setTokenSymbol] = useState(null);
	const [tokenDecimals, settokenDecimals] = useState(18);
	
	const [events, setEvents] = useState([]);
	
	var timerInterval ; 
	var timerInterval2 ; 
 
	const modalToggle = () => setModal(!modal); 
	const togglePlay = () => setShowPlay(!showPlay); 
	
	let web3Provider  = window.ethereum ; 

    
	  const getOtherInforPer = async () => {
		let _web3 = new Web3(web3Provider);
		console.log("GA", KINGGAME)
		console.log("WA", wallet.account)
		const _gameContract = new _web3.eth.Contract(KINGGAME_ABI,KINGGAME);
		let _token = await _gameContract.methods.token().call() ;
		const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_token);
		let _decimals = await _tokenContract.methods.decimals().call() ;
		console.log("Getting Events")
		if(wallet.account){
			console.log("Getting Events Inside")
			let _currentBlockck = await _web3.eth.getBlockNumber() ;
			
			_gameContract.getPastEvents(
				"OnBid",
				{
				  filter: {
					author: wallet.account,
				  },
				  fromBlock: _currentBlockck - 5000,
				  toBlock: _currentBlockck
				},
				(error, events) => {
				  if (!error) {
					var obj = JSON.parse(JSON.stringify(events));
					// var array = Object.keys(obj)
					setEvents(obj.reverse())
					console.log("Events" , obj);
				  } else {
					console.log("Events Error" ,error);
				  }
				}
			  );
 

			let _tokenbalance = await _tokenContract.methods.balanceOf(wallet.account).call() ;
			
			_tokenbalance = parseFloat(_tokenbalance / 1e1**_decimals).toFixed(2) ; 
			
			setTokenbalance(_tokenbalance) ;
	 
		}

	  }

	  
	  const getOtherInfor = async () => {

		let _web3 = new Web3(web3Provider);
	  
		const _gameContract = new _web3.eth.Contract(KINGGAME_ABI,KINGGAME);
		let _token = await _gameContract.methods.token().call() ;
		const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_token);
		let _bidAmount = await _gameContract.methods.bidAmount().call() ;
		let totalBid = await _gameContract.methods.totalBid().call() ;
		let _tokenSymbol = await _tokenContract.methods.symbol().call() ;
			let _decimals = await _tokenContract.methods.decimals().call() ;
			let _potBalance = await _tokenContract.methods.balanceOf(KINGGAME).call() ;
			_potBalance = parseFloat(_potBalance / 1e1**_decimals).toFixed(4) ; 
			_bidAmount = parseFloat(_bidAmount / 1e1**_decimals).toFixed(4) ; 
			totalBid = parseFloat(totalBid / 1e1**_decimals).toFixed(4) ; 
			let _lastBidder = await _gameContract.methods.lastBidder().call() ;

	   
			setlastBidder(_lastBidder)
			setpotBalance(_potBalance)
			settotalBid(totalBid) ;
			setBidAmount(_bidAmount) ;
			setTokenSymbol(_tokenSymbol) ;
			settokenDecimals(_decimals);
	 

	  }
	  const getApproved = async () => {

		let _web3 = new Web3(web3Provider);
		console.log("GA", KINGGAME)
		console.log("WA", wallet.account)
		if(wallet.account){
			const _gameContract = new _web3.eth.Contract(KINGGAME_ABI,KINGGAME);
			let _token = await _gameContract.methods.token().call() ;
			const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_token);
			let _approve = await _tokenContract.methods.allowance(wallet.account,KINGGAME).call() ;
			setApproved(_approve) ;
	 
		}

	  }

	  
	  const claim = () => {
		setModal(!modal);	

		let _web3 = new Web3(web3Provider);
		const _gameContract = new _web3.eth.Contract(KINGGAME_ABI,KINGGAME);
		const _amount = _web3.utils.toWei('1') ;
		_gameContract.methods.restartAndClaim().send({from: wallet.account}).on('receipt', function(receip){					getApproved() ;
			getLastBidder() ;
			// getTimer();
			getOtherInforPer();
			setModal(modal);	
		})	  
		.on('error', function(error, receipt) {
			setModal(modal);
			
		});
	  }

	  const bidNow = () => {
		setModal(!modal);	
		console.log("here");

		let _web3 = new Web3(web3Provider);
		const _gameContract = new _web3.eth.Contract(KINGGAME_ABI,KINGGAME);
 
		_gameContract.methods.participate().send({from: wallet.account}).on('receipt', function(receip){			getApproved() ;
			getLastBidder() ;
			getOtherInforPer();
			// getTimer();

			setModal(modal);	
		})	  
		.on('error', function(error, receipt) {
			setModal(modal);
			
		});
	  }

	  const approveNow = async () => {
		setModal(!modal);	

		let _web3 = new Web3(web3Provider);
		const _gameContract = new _web3.eth.Contract(KINGGAME_ABI,KINGGAME);
		let _token = await _gameContract.methods.token().call() ;
		const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_token);
		const _amount = _web3.utils.toWei('100000000') ;
		_tokenContract.methods.approve(KINGGAME,_amount).send({from: wallet.account}).on('receipt', function(receipt){			 
			getApproved();
			setModal(modal);	
		})	  
		.on('error', function(error, receipt) {
			setModal(modal);
			
		});
	  }


	  const getLastBidder = async () => {
		
		let _web3 = new Web3(web3Provider);
		// console.log(Config);
	   const _gameContract = new _web3.eth.Contract(KINGGAME_ABI,KINGGAME);
	   let _lastBidder = await _gameContract.methods.lastBidder().call() ;
	   
	   setlastBidder(_lastBidder)
	  }
 

	  useEffect(()=>{
		if(window.ethereum){
			web3Provider  = window.ethereum;
		  }
		  else{
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
		   
		  }
		if(wallet.account){
			// getdata()
			getTimer()
			clearInterval(timerInterval);
			timerInterval = setInterval(() => {
				getTimer()
				
			}, 1000);
				
	
			getOtherInforPer() ;
	 

			
			getApproved() 

		}
		getOtherInfor() ;
		clearInterval(timerInterval2);
		 
		timerInterval2 = setInterval(() => {
			getOtherInfor() ;

			
		}, 5000);	
		
		// getLastBidder() ;
	  
	  },[wallet.account])

      const getTimer = async () => {
	 
		let _web3 = new Web3(web3Provider);
		//  console.log(Config);
		const _gameContract = new _web3.eth.Contract(KINGGAME_ABI,KINGGAME);
		
		// let _nextTime = await _gameContract.methods.nextStartTime().call() ;
		let _nextTime = await _gameContract.methods.nextStartTime().call() ;
		let _lastBidTime = await _gameContract.methods.lastBidTime().call() ;
		let _endDelay = await _gameContract.methods.endDelay().call() ;
		let hasWinner = await _gameContract.methods.hasWinner().call() ;
		setWinner(hasWinner);

		console.log('nextStart2', _nextTime)

		let _currentTime = new Date().getTime() /1000 ;
	 
		let endTime; 
		let _remainingSeconds ;
		console.log(_currentTime);
		
		setWaiting(false);
		
		if(_nextTime == 0 && _lastBidTime == 0 ){
				setWaiting(true);
		    	setGameon(true);
		}
		else if(_lastBidTime >  0 && !hasWinner ){
			setGameon(true);
			_remainingSeconds =   _currentTime  - _lastBidTime;
			_remainingSeconds = _endDelay - _remainingSeconds ;
			
		}
		else if(_lastBidTime >  0 && hasWinner ){
			 setGameon(false);
			// _remainingSeconds =   _currentTime  - _lastBidTime;
			// _remainingSeconds = _endDelay - _remainingSeconds ;
		}
	 
		else if(_nextTime > 0 && _nextTime > _currentTime ){
			  _remainingSeconds = _nextTime  - _currentTime ;

		}
		else if(_nextTime > 0 && _nextTime < _currentTime ){
			    setWaiting(true);
		    	setGameon(true);
			
		}
			 
			 if(_remainingSeconds < 0){
				_remainingSeconds = 0 ;
			 }
        
			let remainingDay = Math.floor(
				_remainingSeconds / (60 * 60 * 24)
			  );
			  let remainingHour = Math.floor(
				(_remainingSeconds % (60 * 60 * 24)) / (60 * 60)
			  );
			  let remainingMinutes = Math.floor(
				(_remainingSeconds % (60 * 60)) / 60
			  );
			  let remainingSec = Math.floor(_remainingSeconds % 60);
			  if(remainingDay > 0){
				  endTime = remainingDay+"d : "+remainingHour+"h : "+remainingMinutes+"m";
				  setTimer(endTime);
		  
			  }
			  else{
				  endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s" ;
				  setTimer(endTime);
		  
			  }	 
	  }

	  

		return(
			<div>
             <Header />
                    <section id="finance-banner">
                        <div className="banner-finace">
                            <div className="container">
                                <div className="finance-bnr-c">
                                    <h3>The Chicken King</h3>
                                    <h4>Compete against other farmers to battle the pest and strike the killing blow to be Crowned the Chicken king.</h4>
                                    <p>Win 70% of the pest castle, next pest castle 20%, and 10% Goes to charity.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="round-sec">
                        <div className="container">
                            <div className="roundbg-img">
                                <div className="round-content">
                                {
									!gameOn && !winner && 
									<h3>Next Round in</h3>
								}
								{
									gameOn && !winner && !waiting &&
									<h3>Game Started. Ends in</h3>
								}
								{
									gameOn && !winner && waiting &&
									<h3>Game Started. Waiting for Bids</h3>
								}
								 
								{
								!winner && !waiting && 							
								<h4>{timer}</h4>
								}
								 { 
									!gameOn  && !winner && 
									<p>Prepare for battle!</p>
								}
								{
									gameOn && !winner && 
									<p>Participate Now!</p>
								}
								{
									winner && 
									<>
									<h3>Round Over.</h3>
									<p className="choose-w">Winner Choosen!</p>
									</>
								}
								 
								 
								<p>Bug Treasure: {potBalance} {tokenSymbol}</p>
							 
 
								{ gameOn && 
								<>
								<p>Total Bids: {totalBid} {tokenSymbol}</p>
								</>

								}
                                     
                                </div>
                            </div>
                            <div className="row mrt-bid">
                                <div className="col-lg-6">
                                    <div className="bid-box">
                                       <div className="bit-c-img">
                                        <h3>Bid Now!</h3>
                                            <div className="bid-smallbox">
                                                <p>{bidAmount} {tokenSymbol}</p>
                                                <p>Your Balance {tokenBalance} {tokenSymbol}</p>

                                                {  wallet.status === "connected" && approved == 0 &&

									<button   onClick={() => {
										approveNow() 
									}} className="mt-1 conbutton" >Approve</button>									
									}
									{  wallet.status === "connected" && approved > 0 && !winner && gameOn &&
									<button className="mt-1 conbutton" onClick={() => bidNow()} >Bid Now</button>									
									}
									{  wallet.status === "connected" && winner  && lastBidder == wallet.account &&
									<button className="mt-1 conbutton" onClick={() => claim()} >Claim & Restart</button>									
									}
									{  wallet.status === "connected" && winner  && lastBidder != wallet.account &&
									<button className="mt-1 conbutton" onClick={() => claim()} >Restart</button>									
									}

                                            </div>
                                       </div>

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bid-box2">
                                        <div className="bit-c-img2">
                                            <img src={flower} />
                                            <h3>Current King</h3>
                                            {
                                                lastBidder != null &&
                                                <p>Last bidder: <span>{lastBidder.substring(0, 6)+"...."+lastBidder.substring(lastBidder.length - 6)}</span></p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="event-g">
                                        <div className="events-box">
                                            <h3 >Bid History</h3>
                                           
							<table className="mt-3 eventTable">
							{
							events.length == 0 && 
								<p>No Events</p>
							}						
							{events.length > 0 && events.map((value, index) => {
								if(index < 5){
								return (
							 <tr>
								 <td width="65%"><a href={TX_LINK+value.transactionHash} target="_blank">Tx: {value.transactionHash}</a></td>
								 <td width="20%">
									 { value.event == "OnWin" &&
										<span>Restart</span> 
									}
									{ value.event == "OnBid" &&
									 <span>Bid</span> 
									}
									{ value.event != "OnBid" && value.event != "OnWin" &&
									 <span>{value.event}</span> 
									}
									 
									</td>
								 <td className="text-right" width="15%">
								{value.returnValues.amount  && 
								 value.returnValues.amount/1e1**tokenDecimals
								 }
								 {!value.returnValues.amount && 
								 <span>NA</span>
								 }</td>
							 </tr>	
								)
								}
						}
							)}
							</table>

                                        </div>
                                    </div>
                                </div>
                            </div>
							<div className="btnrow">
								<button className="conbutton" onClick={togglePlay}>How to Play?</button>
							</div>
							{
								showPlay && 
								
                            <div className="row" >
                                <div className="col-lg-12">
                                    <div className="dex-box-g">
                                        <div className="den-box">
                                            <h3>The Chicken King</h3>
                                            <p>Compete against other farmers to battle the pest and strike the killing blow to be Crowned the Chicken king.</p>
                                            <h4>How to Play?</h4>
                                            <p>The chicken king has a 90 seconds countdown timer which resets on each bid.</p>
                                            <p>Use your chickens to place a bid that goes into the Pest Treasure balance, allowing you to become eligible to be crowned the chicken king for 24hours.</p>
                                            <p>When the timer reaches zero, the last bid wins the game along with the chicken loot that comes with it.</p>
                                            <p>Anyone can restart or the winner can claim and restart.</p>
                                            <h4>Winning’s distribution?</h4>
                                            <p>The contract resets after claim and sets the countdown before a new round begins.</p>
                                            <h4>Chicken Loot distribution?</h4>
                                            <p>The pest treasure balance will be distributed as follows:</p>
                                            <p>-70% credited instantly to the winners address</p>
                                            <p>-20% carried over to the next round</p>
                                            <p>-10% distributed to charity.</p>
                                            <p>Note:</p>
											<p>-Winners are crowned Chicken King for 24hours before a new battle.</p>
											<p>-Anyone can bid but the last bidder wins the game.</p>
											<p>-All bids are final. Your chickens cannot be returned after bids.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
							
						}
                        </div>
                    </section>
                    
                <Footer/>
                
 <Modal isOpen={modal} toggle={modalToggle} className="connect-box"  centered={true}>
 
 <ModalBody>
 <div className="mt-3 mb-3 text-center">
                <p className="txfont">Transaction is Processing...</p>           
              
     </div>        
 </ModalBody>
  
</Modal>

            </div>
		);
	}
 
export default KingGame;