import React, { Component, useState, useEffect } from 'react';

import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";


// import VideoPlayer from 'react-video-js-player';
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from "jquery";

import Header from '../header.js';
import Footer from '../footer.js';
import lefticon from '../../images/left-icon.png';
import righticon from '../../images/right-icon.png';
import slide2 from '../../images/slide2.png';
import egga from '../../images/egga.gif';
import land from '../../images/land-01.png';

import childe from '../../images/childe.gif';
import stoke from '../../images/stoke.png';
import marketbtn from '../../images/marketbtn.png';
import farmingbtn from '../../images/farmingbtn.png';
import eggbtn from '../../images/eggbtn.png';
import chicken1 from '../../images/chicken10.png';
import chicken100 from '../../images/chicken100.png';
import chicken1000 from '../../images/chicken1000.png';
import eggs1 from '../../images/eggs1.png';
import eggs100 from '../../images/eggs100.png';
import eggs1000 from '../../images/eggs1000.png';
import Web3 from "web3"
import {useWallet} from '@binance-chain/bsc-use-wallet'
import { CHICKEN_FARMING , CHICKEN_INCUBATOR, MARKETPLACE } from '../../../Config/index.js';
import CHICKEN_FARMING_ABI from '../../../Config/CHICKEN_FARMING_ABI.json' ;
import CHICKEN_INCUBATOR_ABI from '../../../Config/CHICKEN_INCUBATOR_ABI.json' ;
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json' ;
import NFT_ABI from '../../../Config/NFT_ABI.json' ;
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json' ;
import { func } from 'prop-types';



const  ChickenFarm = () => {
    
const [farmArea, setFarmArea] = useState(0);
const [farmCapacity, setFarmCapacity] = useState(0);
const [farmBalance, setFarmBalance] = useState(0);
const [farmSymbol, setFarmSymbol] = useState(null);
const [chickenSymbol, setChickenSymbol] = useState(null);
const [chickenEggSymbol, setChickenEggSymbol] = useState(null);
const [chickenFoodSymbol, setChickenFoodSymbol] = useState(null);
const [areadamount, setareadamount] = useState(0);
const [buyareadamount, setbuyareadamount] = useState(0);
const [eggDepositFee, setEggDepositFee] = useState(0);
const [chickenClaimfee, setChickenClaimfee] = useState(0);
 

const [chickenDepositFee, setChickenDepositFee] = useState(0);
 
const [chickenRemoveFee, setChickenRemoveFee] = useState(0);

const [depositedDay, setDepositedDay] = useState(0);


const [farmLocked, setFarmLocked] = useState(false);
const [farmApprove, setFarmApprove] = useState(false);
const [farmTokenId, setFarmTokenId] = useState(null);
const [landIsfree, setLandIsfree] = useState(false);

const [farmPrice, setFarmPrice] = useState(0);




const [chickenBalance , setChickenBalance] = useState(0);
const [chickenEggBalance , setChickenEggBalance] = useState(0);
const [chickenFoodBalance , setChickenFoodBalance] = useState(0);
const [unlockTime , setUnlockTime] = useState(0);
const [layunlockTime , setlayUnlockTime] = useState(0);
const [layEndTime , setlayEndTime] = useState(0);


const [eggunlockTime , setEggUnlockTime] = useState(0);
const [eggHatchTime , setEggHatchTime] = useState(0);

const [baseBalance , setBaseBalance] = useState(0);
const [baseSymbol , setBaseSymbol] = useState(0);
const [baseApproved , setBaseApproved] = useState(0);
const [baseApprovedIncub , setBaseApprovedIncub] = useState(0);
const [baseApprovedFarm , setBaseApprovedFarm] = useState(0);

const [baseToken , setbaseToken] = useState();

const [endTime , setendTime] = useState(null);
const [layTime , setlayTime] = useState(null);

const [eggTime , seteggTime] = useState('70 days');
const [eggTime2 , seteggTime2] = useState('40 days');
const [areadepositError , setareadepositError] = useState(null);
const [buyareadepositError , setbuyareadepositError] = useState(null);


let timeInterval ;
let timeInterval1 ;
let timeInterval2 ;
let timeInterval3 ;
const [chickenDeposited , setChickenDeposited] = useState(0);
const [chickenEggDeposited , setChickenEggDeposited] = useState(0);
const [eggsearned , setEggsearned] = useState(0);
const [hatched , setHatched] = useState(0);
const [adult , setAdult] = useState(0);
const [chickenEggApproved , setChickenEggApproved] = useState(0);
const [chickenApproved , setChickenApproved] = useState(0);
const [chickenFoodApproved , setChickenFoodApproved] = useState(0);

const [chickenToken , setChickenToken] = useState(0);
const [chickenEggToken , setChickenEggToken] = useState(0);
const [chickenFoodToken , setChickenFoodToken] = useState(0);


const [cbalance, setcBalance] = useState(0);
const [cebalance, setceBalance] = useState(0);
const [csymbol, setcSymbol] = useState(0);
const [ebalance, seteBalance] = useState(0);
const [esymbol, seteSymbol] = useState(0);
const [farmToken, setFarmToken] = useState(null);
const [aseetBalance, setAseetBalance] = useState(0);
const [approved, setApproved] = useState(0);

const [dayamount, setDayamount] = useState(0);
const [decimals, setDecimals] = useState(0);
const [damount, setdAmount] = useState('');
const [cdamount, setcdAmount] = useState('');
const [cedamount, setcedAmount] = useState('');
const [crdamount, setcrdAmount] = useState('');
const [addDayamount, setaddDayamount] = useState('');

const [depositAmount, setDepositAmount] = useState(0);
const [cdepositAmount, setcDepositAmount] = useState(0);
const [cedepositAmount, setceDepositAmount] = useState(0);
const [incubCapacity, setIncubCapacity] = useState(0);

const [depositError, setDepositError] = useState(false);
const [cdepositError, setcDepositError] = useState(false);
const [crdepositError, setcrDepositError] = useState(false);
const [addDdepositError, setaddDdepositError] = useState(false);

const [cedepositError, setceDepositError] = useState(false);

const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);

const [chickenModal, setChickenModal] = useState(false);
const chickentoggle = () => setChickenModal(!chickenModal);

const [moreChickenModal, setMoreChickenModal] = useState(false);
const moreChickentoggle = () => setMoreChickenModal(!moreChickenModal);

const [areaModal, setareaModal] = useState(false);
const areaToggle = () => setareaModal(!areaModal);


const [buyAreaModal, setBuyAreaModal] = useState(false);
const buyAreaToggle = () => setBuyAreaModal(!buyAreaModal);

const [nosellAreaModal, setnoSellModal] = useState(false);
const nosellAreaToggle = () => setnoSellModal(!nosellAreaModal);



const [eggModal, setEggModal] = useState(false);
const eggtoggle = () => setEggModal(!eggModal);

const [removeChickenModal, setremoveChickenModal] = useState(false);
const removeChickentoggle = () => setremoveChickenModal(!removeChickenModal);

const [addDaysChickenModal, setaddDaysChickenModal] = useState(false);
const addDaysChickentoggle = () => setaddDaysChickenModal(!addDaysChickenModal);


const [buyModal, setBuyModal] = useState(false);
const buyToggle = () => setBuyModal(!buyModal);

const wallet = useWallet();
let web3Provider  = window.ethereum ; 

useEffect(() => {
    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
       
      }
      getEggData() ;
      getData() ;
      if(unlockTime > 0){
        clearInterval(timeInterval);
        timeInterval = setInterval(() => {
            getTime() ;
           
        }, 1000);
  
      }

      if(layEndTime > 0){
        clearInterval(timeInterval1);
        timeInterval1 = setInterval(() => {
            getlayTime() ;
           
        }, 1000);
  
      }

      if(eggunlockTime > 0){
        clearInterval(timeInterval2);
        timeInterval2 = setInterval(() => {
          
            getEggTime() ;
        }, 1000);
  
      }

      if(eggHatchTime > 0){
        clearInterval(timeInterval3);
        timeInterval3 = setInterval(() => {
            // getEggHatchTime() ;
        
        }, 1000);
  
      }
     
    },[wallet.account, unlockTime ,layunlockTime, layEndTime, eggunlockTime , eggHatchTime])

    const getData = async () => {
              let _web3 = new Web3(web3Provider);
              let _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
              let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
              let _tokenPerfarm = await _marketContract.methods.getTokenPerFarmArea().call() ;
              setFarmPrice(parseFloat(_tokenPerfarm/1e18).toFixed(2));
              let _baseToken = await _marketContract.methods.baseToken().call() ;

              let _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI,_baseToken);
              setbaseToken(_baseToken) ;
              let farmToken = await _farmingContract.methods.farmLand().call() ;
              let _chickenToken = await _farmingContract.methods.chickenToken().call() ;
              let _chickenFoodToken = await _farmingContract.methods.foodToken().call() ;
           
              setFarmToken(farmToken);

              let _depositFee = await _farmingContract.methods.getDepositFee(1).call() ;
              setChickenDepositFee(_depositFee);

              let _removeFee = await _farmingContract.methods.getRemoveFee(1).call() ;
              setChickenRemoveFee(_removeFee);
                setChickenFoodToken(_chickenFoodToken)
                setChickenToken(_chickenToken)
              let _nftContract = new _web3.eth.Contract(NFT_ABI,farmToken);
              let _chickenContract = new _web3.eth.Contract(TOKEN_ABI,_chickenToken);
              let _chickenFoodContract = new _web3.eth.Contract(TOKEN_ABI,_chickenFoodToken);
              let _chickenFoodSymbol = await _chickenFoodContract.methods.symbol().call() ;
              setChickenFoodSymbol(_chickenFoodSymbol);
              let _symbol = await _nftContract.methods.symbol().call() ;
              setFarmSymbol(_symbol);
              let _chickenSymbol = await _chickenContract.methods.symbol().call() ;
              setChickenSymbol(_chickenSymbol);
              let _baseSymbol = await _baseTokenContract.methods.symbol().call() ;
            //   alert(_baseSymbol);
              setBaseSymbol(_baseSymbol);
            
              if(wallet.account){
                // wallet.account = '0xef519A99b4921aC70387A3e1Fb6cCDeB853C0aB2' ;
                let _baseApproved = await _baseTokenContract.methods.allowance(wallet.account,MARKETPLACE).call() ;
                setBaseApproved(_baseApproved);
                let _baseApprovedFarm = await _baseTokenContract.methods.allowance(wallet.account,CHICKEN_FARMING).call() ;
                setBaseApprovedFarm(_baseApprovedFarm);
                let _baseApprovedIncub = await _baseTokenContract.methods.allowance(wallet.account,CHICKEN_INCUBATOR).call() ;
                console.log('Incub Approved' , _baseApprovedIncub);    
                setBaseApprovedIncub(_baseApprovedIncub);
                let _baseBalance = await _baseTokenContract.methods.balanceOf(wallet.account).call() ;
             
                setBaseBalance(parseFloat(_baseBalance/1e18).toFixed(2));


                let _nftBalance = await _nftContract.methods.balanceOf(wallet.account).call() ;
                let _userInfo = await _farmingContract.methods.userInfo(wallet.account).call() ;
                let _userChickens = await _farmingContract.methods.getUserChickens(wallet.account).call() ;
                // if(_userInfo)
                // console.log(_userChickens);
                setChickenDeposited(parseFloat(_userChickens/1e18).toFixed());
                if(_userInfo.chickens > 0  ){
                    let _userEggs = await _farmingContract.methods.pendingEggs(wallet.account).call() ;
                    console.log(_userEggs);
                    setEggsearned( parseFloat(_userEggs/1e18).toFixed());
                }
             

                if(_userChickens > 0){
                   

                    let _userChickenDie = await _farmingContract.methods.getUnlockTime(wallet.account).call() ;
                     
                    setUnlockTime(_userChickenDie) ;
                  
                    
                }

                if(_userChickens > 0){
                   

                    let _userClaimTimes = await _farmingContract.methods.getNextClaim(wallet.account).call() ;
                    _userClaimTimes = Object.keys(_userClaimTimes).map((key) => _userClaimTimes[key]);
                    console.log("claimeTimes",_userClaimTimes[1]);
                    setlayUnlockTime(_userClaimTimes[1]) ;
                    setlayEndTime(_userClaimTimes[0]) ;
                  
                    
                }


                let _chickenFoodBalance = await _chickenFoodContract.methods.balanceOf(wallet.account).call() ;
                _chickenFoodBalance = parseFloat(_chickenFoodBalance/1e18).toFixed() ;
                setChickenFoodBalance(_chickenFoodBalance);
                let _chickenBalance = await _chickenContract.methods.balanceOf(wallet.account).call() ;
                let _chickenApproved = await _chickenContract.methods.allowance(wallet.account,CHICKEN_FARMING).call() ;
                setChickenApproved(_chickenApproved);
                let _chickenFoodApproved = await _chickenFoodContract.methods.allowance(wallet.account,CHICKEN_FARMING).call() ;
                setChickenFoodApproved(_chickenFoodApproved);
                
                _chickenBalance = parseFloat(_chickenBalance/1e18).toFixed() ;
                setChickenBalance(_chickenBalance);
                console.log(_userInfo);
                if(_nftBalance > 0 || _userInfo.landlocked     ){
                let _nftTokenId = await _nftContract.methods.ownerTokens(wallet.account).call() ;
                let _approved = await _nftContract.methods.getApproved(_nftTokenId).call() ;
                if(_approved == CHICKEN_FARMING){
                    setFarmApprove(true);
                }
                    setFarmTokenId(_nftTokenId);
                    let _landIsfree = await _farmingContract.methods.landIsfree(_nftTokenId,wallet.account).call() ;
                    setLandIsfree(_landIsfree);
                    let _userInfo = await _farmingContract.methods.getUserToken(wallet.account).call() ;
                    setFarmLocked(_userInfo[4]);

                      console.log(_userInfo[4]);
                      if(_userInfo[4]){
                           setFarmTokenId(_userInfo[1]);

                              setFarmArea( parseFloat(_userInfo[2]/1e18).toFixed());
                              setFarmCapacity( parseFloat(_userInfo[3]/1e18).toFixed());
                     
                      }
                }
                  setFarmBalance(_nftBalance);  
              }


    }

    
    const getEggData = async () => {
        let _web3 = new Web3(web3Provider);
        let _incubatorContract = new _web3.eth.Contract(CHICKEN_INCUBATOR_ABI,CHICKEN_INCUBATOR);
          let _chickenEggToken = await _incubatorContract.methods.eggToken().call() ;
            setChickenEggToken(_chickenEggToken);

            let _capacity = await _incubatorContract.methods.capacity().call() ;
            setIncubCapacity(_capacity/1e18);

            let _depositFee = await _incubatorContract.methods.getDepositFee(1).call() ;
            setEggDepositFee(_depositFee);

             
 
        let _chickenEggContract = new _web3.eth.Contract(TOKEN_ABI,_chickenEggToken);
        
        let _chickenEggSymbol = await _chickenEggContract.methods.symbol().call() ;
        setChickenEggSymbol(_chickenEggSymbol);
        
        if(wallet.account){
            // wallet.account = '0xef519A99b4921aC70387A3e1Fb6cCDeB853C0aB2' ;
       
          let _balance = await _chickenEggContract.methods.balanceOf(wallet.account).call() ;
          let _userInfo = await _incubatorContract.methods.userInfo(wallet.account).call() ;
          setChickenEggBalance(parseFloat(_balance/1e18).toFixed())
          setChickenEggDeposited(parseFloat(_userInfo[0]/1e18).toFixed());

          let _chickenEggApproved = await _chickenEggContract.methods.allowance(wallet.account,CHICKEN_INCUBATOR).call() ;
          setChickenEggApproved(_chickenEggApproved);


          if(_userInfo[0] > 0){
              let _userItens = await _incubatorContract.methods.pendingItems(wallet.account).call() ;
            //   console.log(_userEggs);
              setHatched( parseFloat(_userItens[0]/1e18).toFixed());
              let _adults = parseFloat(_userItens[1]/1e18).toFixed() ; 
              setAdult( _adults);
              let _unlockItem = await _incubatorContract.methods.getUnlockTime(wallet.account).call() ;
              setEggUnlockTime(_unlockItem) ;  
              let _unlockItem2 = await _incubatorContract.methods.getHatchTime(wallet.account).call() ;
              setEggHatchTime(_unlockItem2) ;      
              let _amt = _web3.utils.toWei('1');
              let _claimChickenFee = await _incubatorContract.methods.getClaimFee(_amt).call() ;
              _claimChickenFee = parseFloat(_adults*_claimChickenFee/1e18).toFixed(2)
              setChickenClaimfee(_claimChickenFee);

               

          }
 
        }


}


    async function lockNFT(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
 
        _farmingContract.methods.checkAndTransferLand(wallet.account,farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
        
    }

    
    const getlayTime = async() => {
        let _current = new Date().getTime()/1e3 ;
        console.log(unlockTime);
    
        console.log("Next Time" , layunlockTime )
        if(parseInt(_current) > parseInt(layEndTime) ){
            setlayTime(null);
    
        }
        else{
            if(parseInt(_current) > parseInt(layunlockTime) ){
                getData() ;
            }
            else{
                let remainingSecondsLay = layunlockTime - _current ;
                console.log("Remaining Sec" , remainingSecondsLay);
            
                let remainingDayLay = Math.floor(
                    remainingSecondsLay / (60 * 60 * 24)
                );
        
               
        
                let remainingHourLay = Math.floor(
                  (remainingSecondsLay % (60 * 60 * 24)) / (60 * 60)
                );
                let remainingMinutesLay = Math.floor(
                  (remainingSecondsLay % (60 * 60)) / 60
                );
                let remainingSecLay = Math.floor(remainingSecondsLay % 60);
                let _endTimeLay ;
                if(remainingDayLay > 0){
                    _endTimeLay = remainingDayLay+"d : "+remainingHourLay+"h : "+remainingMinutesLay+"m";
                    setlayTime(_endTimeLay);
            
                }
                else{
                    _endTimeLay = remainingHourLay+"h : "+remainingMinutesLay+"m : "+remainingSecLay+"s" ;
                    setlayTime(_endTimeLay);
            
                }
            }
           
        }
    }    
        const getTime = async() => {
    let _current = new Date().getTime()/1e3 ;
    console.log(unlockTime);
 
    if(parseInt(_current) > parseInt(unlockTime)){
        setendTime(null);
            console.log('ended')
            console.log('Current' , _current)
    }
    else{

        let remainingSeconds = unlockTime - _current ;
        console.log("Remaining Sec" , remainingSeconds);
    
        let remainingDay = Math.floor(
          remainingSeconds / (60 * 60 * 24)
        );

        let _depositDay = Math.round(
            remainingSeconds / (60 * 60 * 24)
          );

        setDepositedDay(_depositDay)

        let remainingHour = Math.floor(
          (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
        );
        let remainingMinutes = Math.floor(
          (remainingSeconds % (60 * 60)) / 60
        );
        let remainingSec = Math.floor(remainingSeconds % 60);
        let _endTime ;
        if(remainingDay > 0){
            _endTime = remainingDay+"d : "+remainingHour+"h : "+remainingMinutes+"m";
            setendTime(_endTime);
    
        }
        else{
            _endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s" ;
            setendTime(_endTime);
    
        }
    }
  
    }
     
    
    
    const getEggHatchTime = async() => {
        let _current = new Date().getTime()/1e3 ;
        console.log(eggHatchTime);
        if(parseInt(_current) > parseInt(eggHatchTime)){
            seteggTime2(0);
                console.log('ended')
                console.log('Current' , _current)
        }
        else{
            let remainingSeconds = eggHatchTime - _current ;
            console.log("Remaining Sec" , remainingSeconds);
        
            let remainingDay = Math.floor(
              remainingSeconds / (60 * 60 * 24)
            );
            let remainingHour = Math.floor(
              (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
            );
            let remainingMinutes = Math.floor(
              (remainingSeconds % (60 * 60)) / 60
            );
            let remainingSec = Math.floor(remainingSeconds % 60);
            let _endTime ;
            if(remainingDay > 0){
                _endTime = remainingDay+"d : "+remainingHour+"h : "+remainingMinutes+"m";
                seteggTime2(_endTime);
        
            }
            else{
                _endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s" ;
                seteggTime2(_endTime);
        
            }
        }
      
        }
         

    const getEggTime = async() => {
        let _current = new Date().getTime()/1e3 ;
        console.log(eggunlockTime);
        if(parseInt(_current) > parseInt(eggunlockTime)){
            seteggTime(0);
                console.log('ended')
                console.log('Current' , _current)
        }
        else{
            let remainingSeconds = eggunlockTime - _current ;
            console.log("Remaining Sec" , remainingSeconds);
        
            let remainingDay = Math.floor(
              remainingSeconds / (60 * 60 * 24)
            );
            let remainingHour = Math.floor(
              (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
            );
            let remainingMinutes = Math.floor(
              (remainingSeconds % (60 * 60)) / 60
            );
            let remainingSec = Math.floor(remainingSeconds % 60);
            let _endTime ;
            if(remainingDay > 0){
                _endTime = remainingDay+"d : "+remainingHour+"h : "+remainingMinutes+"m";
                seteggTime(_endTime);
        
            }
            else{
                _endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s" ;
                seteggTime(_endTime);
        
            }
        }
      
        }
         
    
    async function removeChicken(){
        let _web3 = new Web3(web3Provider);
        setcrDepositError(false)
         if(chickenDeposited < crdamount ){
            setcrDepositError("Error: Insufficient deposited balance");
             return false;
         }
        
        else{
            
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _famringContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
       
        let _camount = _web3.utils.toWei(crdamount.toString());
        console.log(farmTokenId,_camount,dayamount);
        
        _famringContract.methods.removeChicken(_camount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
     
             setModal(modal);         
             setremoveChickenModal(!removeChickenModal
                );
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
        }
    }

    

    async function depositMoreChicken(){
        let _web3 = new Web3(web3Provider);
        setcDepositError(false)
         if(chickenFoodBalance < cdamount*dayamount*20 ){
             setcDepositError("Error: Insufficient food Balance");
             return false;
         }
        else if(cdamount > (farmCapacity - chickenDeposited) ){
            setcDepositError("Error: Insufficient farm Land");
            return false;
        }
        else{
            
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _famringContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
        let _amount  = _web3.utils.toWei('5000000000000000000');
        let _camount = _web3.utils.toWei(cdamount.toString());
        console.log(farmTokenId,_camount,dayamount);
        
        _famringContract.methods.depositMore(_camount,farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
     
             setModal(modal);         
             moreChickentoggle();
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
        }
    }

    

    async function depositChicken(){
        let _web3 = new Web3(web3Provider);
        setcDepositError(false)
         if(chickenFoodBalance < cdamount*dayamount*20 ){
             setcDepositError("Error: Insufficient food Balance");
             return false;
         }
        else if(cdamount > (farmCapacity - chickenDeposited) ){
            setcDepositError("Error: Insufficient farm Land");
            return false;
        }
        else{
            
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _famringContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
        let _amount  = _web3.utils.toWei('5000000000000000000');
        let _camount = _web3.utils.toWei(cdamount.toString());
        console.log(farmTokenId,_camount,dayamount);
        
        _famringContract.methods.deposit(farmTokenId,_camount,dayamount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
     
             setModal(modal);         
             chickentoggle();
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
        }
    }

    
    
    async function approvebaseTokenFarm(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _baseTokenContract.methods.approve(CHICKEN_FARMING,_amount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
            setModal(modal);
    
 
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }

    async function approvebaseTokenIncub(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _baseTokenContract.methods.approve(CHICKEN_INCUBATOR,_amount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getEggData() ;
            setModal(modal);
            depositEgg()
 
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }
    async function approvebaseToken(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _baseTokenContract.methods.approve(MARKETPLACE,_amount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
            setModal(modal);
            buyAreaNFT()
 
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }


    async function approveChickenFood(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _chickenFoodContract = new _web3.eth.Contract(TOKEN_ABI,chickenFoodToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _chickenFoodContract.methods.approve(CHICKEN_FARMING,_amount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
            setModal(modal);

            depositChicken() ;
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }

    

    
    async function claimChicken(){
        let _web3 = new Web3(web3Provider);
         if(parseFloat(chickenClaimfee) > parseFloat(baseBalance)){
             alert("You don't have sufficient MyFarmPet to Pay Claim fees. Required Fee: "+chickenClaimfee+" "+baseSymbol)
             return false
         }
         else{
            setModal(!modal);
            const _incubatorContract = new _web3.eth.Contract(CHICKEN_INCUBATOR_ABI,CHICKEN_INCUBATOR);
            _incubatorContract.methods.claimAdults().send({from: wallet.account}).on('receipt', function(receipt){
              
                getEggData() ;
                 setModal(modal);
        
            })
          
            .on('error', function(error, receipt) {
            setModal(modal);
                
            });

         }
       
    }
    async function claimEggs(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        const _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
        _farmingContract.methods.claimEggs().send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
    }

    
    async function approveChickenEgg(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _chickenEggContract = new _web3.eth.Contract(TOKEN_ABI,chickenEggToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _chickenEggContract.methods.approve(CHICKEN_INCUBATOR,_amount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getEggData() ;
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }
    async function approveChicken(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _chickenContract = new _web3.eth.Contract(TOKEN_ABI,chickenToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _chickenContract.methods.approve(CHICKEN_FARMING,_amount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }


     


    async function addDays(){
        setaddDdepositError(false);
        let _maxamount = chickenFoodBalance/(20*chickenDeposited);
        if(parseInt(_maxamount) < parseInt(addDayamount) ){
            setaddDdepositError("Error: Insufficient Food Balance");
            return false;
        }
        
        else{
        let _web3 = new Web3(web3Provider);
           
       setModal(!modal);
       // document.getElementById("exampleModalCenter").modal('show')
       const _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
        let _camount = parseInt(addDayamount) ;
    //    console.log(farmTokenId,_camount,dayamount);
       
       _farmingContract.methods.addMoreDays(_camount).send({from: wallet.account}).on('receipt', function(receipt){
         
            getData() ;    
            setModal(modal);         
            addDaysChickentoggle();         
   
       })
     
       .on('error', function(error, receipt) {
       setModal(modal);
           
       });
          
       }
    } 


    async function depositEgg(){
        setceDepositError(false)
        if(parseInt(chickenEggBalance) < parseInt(cedamount) ){
            setceDepositError("Error: Insufficient Egg Balance");
            return false;
        }
        
        else{
        let _web3 = new Web3(web3Provider);
           
       setModal(!modal);
       // document.getElementById("exampleModalCenter").modal('show')
       const _incubatorContract = new _web3.eth.Contract(CHICKEN_INCUBATOR_ABI,CHICKEN_INCUBATOR);
        let _camount = _web3.utils.toWei(cedamount.toString());
       console.log(farmTokenId,_camount,dayamount);
       
       _incubatorContract.methods.deposit(_camount).send({from: wallet.account}).on('receipt', function(receipt){
         
            getEggData() ;    
            setModal(modal);         
            eggtoggle();
   
       })
     
       .on('error', function(error, receipt) {
       setModal(modal);
           
       });
          
       }
    } 

   
    
    
    
    
    async function sellfarm(){
        let _web3 = new Web3(web3Provider);
   
            setModal(!modal);
            // document.getElementById("exampleModalCenter").modal('show')
            const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
            //   alert(farmTokenId);
            _marketContract.methods.sellFarmLand(farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
                setModal(modal);
                getData() ;
        
    
        
            })
          
            .on('error', function(error, receipt) {
            setModal(modal);
                
            });
               
      
        
    }


    async function buyAreaNFT(){
        let _web3 = new Web3(web3Provider);
        setbuyareadepositError(false);
        if(buyareadamount*farmPrice > baseBalance){
            setbuyareadepositError("Error: Insufficient Balance");

        }
        else{

            setModal(!modal);
            // document.getElementById("exampleModalCenter").modal('show')
            const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
                // let _area = _web3.utils.toWei(buyareadamount.toString()) ;
                let _area = buyareadamount.toString() ;
                // alert(farmTokenId);
            _marketContract.methods.buyFarmLand(_area).send({from: wallet.account}).on('receipt', function(receipt){
                setModal(modal);
                getData() ;
                buyAreaToggle() ;
    
        
            })
          
            .on('error', function(error, receipt) {
            setModal(modal);
                
            });
               
        }
        
    }


    async function addAreaNFT(){
        let _web3 = new Web3(web3Provider);
        setareadepositError(false);
        if(areadamount*farmPrice > baseBalance){
        setareadepositError("Error: Insufficient Balance");

        }
        else{

            setModal(!modal);
            // document.getElementById("exampleModalCenter").modal('show')
            const _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
                // let _area = _web3.utils.toWei(areadamount.toString()) ;
                let _area = areadamount.toString() ;
                // alert(farmTokenId);
            _marketContract.methods.addFarmLandArea(_area,farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
                setModal(modal);
                getData() ;
                areaToggle() ;
    
        
            })
          
            .on('error', function(error, receipt) {
            setModal(modal);
                
            });
               
        }
        
    }

    async function approveNFT(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _nftContract = new _web3.eth.Contract(NFT_ABI,farmToken);
 
        _nftContract.methods.approve(CHICKEN_FARMING,farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
            setModal(modal);

            getData() ;
            lockNFT();
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }

    async function setMaxceDeposit(){
        let _damount = chickenEggBalance;
         if(chickenEggBalance > 50){
             _damount = 50 ;
         }
        setcedAmount(parseFloat(_damount))
         
    }
    
    

    async function setMaxDayDeposit(){
        let _damount = chickenFoodBalance/(20*chickenDeposited);
         
        setaddDayamount(parseFloat(_damount))
         
    }


    async function setMaxcrDeposit(){
        let _damount = chickenDeposited;
         
        setcrdAmount(parseFloat(_damount))
         
    }

    // async function setMaxArea(){
    //     let _damount = baseBalance;
         
    //     setareadamount(parseFloat(_damount))
         
    // }

    
    async function setMaxcDeposit(){
        let _damount = chickenBalance
        if(chickenBalance > farmCapacity){
            _damount = farmCapacity
        }
        setcdAmount(_damount)
        setcDepositAmount(_damount)
    }

    
    

    
    const handlecDepositChange = (e) => {
        setcDepositAmount(e.target.value) ;
        setcdAmount(e.target.value) ;    
    }

    
    const handleAddDayChange = (e) => {
        setaddDayamount(parseFloat(e.target.value)) ;    
   }
    const handlecrDepositChange = (e) => {
         setcrdAmount(parseFloat(e.target.value)) ;    
    }

    
    const handleeDepositChange = (e) => {
        setcedAmount(e.target.value) ;    
    }
    const handleDayChange = (e) => {
        setDayamount(e.target.value) ;    
    }

    const handleBuyAreaChange = (e) => {
        setbuyareadamount(e.target.value) ;    
    }
    const handleAreaChange = (e) => {
        setareadamount(e.target.value) ;    
    }

    

    
 
		return(
			<div>
             <Header />
                <div className="slide-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="slide-heads">
                                    <h3>BUY FARM LAND & CHICKEN AND EARN EGGS.</h3>
                                </div>
                                {/* <div className="wrp-slide">
                                    <div className="slide-prev">
                                        <a href="/slide1" className="novisible"><img src={lefticon} /></a>
                                    </div>
                                    <div className="slide-imgs">
                                        <img src={slide2} />
                                    </div>
                                    <div className="slide-next">
                                        <a href="/slide3"><img src={righticon} /></a>
                                    </div>
                                </div> */}
                                <div className="bullet-list-wrp">
                                    <div className="market-btn">
                                        <a href="/marketplace"><img src={marketbtn} /></a>
                                        {/* <a href="/slide3"><img src={farmingbtn} /></a> */}
                                    </div>
                                </div>
                               
                                <div className="newpool-box mr-b bgfarmland" >
                                   <div className="alienpool-wrp mb-3">
                                       <div className="alienpool">
                                           <div className="alienpool-img">
                                               <img src={land} />
                                           </div>
                                           <div className="alienpool-content">
                                                <h3>Farm Land</h3>                                               
                                           </div>
                                       </div>
                                       {/* <div className="alienbal">
                                            <div class="balance"><h3>{0.0000}</h3><p>Balance</p></div>
                                            <div class="balance"><h3>0.0000</h3><p>Area</p></div>
                                       </div> */}
                                       <div className="alientime">                                          
                                           <div className="time-child1">
                                                <h3>{farmBalance} {farmSymbol}</h3>
                                                <p>Your Balance</p>
                                           </div>
                                           <div className="time-child1">
                                                <h3>{farmArea} sq m</h3>
                                                <p>Your Locked Farm Area</p>
                                           </div>
                                            <div className="time-child1">
                                                <h3>${farmArea*1}</h3>
                                                <p>Market Value</p>
                                           </div>
                                           <div className="time-child1">
                                                <h3>{farmCapacity}</h3>
                                                <p>Chicken Capacity</p>
                                           </div>
                                       </div>
                                       
                                   </div>
                                   <div className="alienbtns">
                                   {/* <div className="pool-btns">
                                   <p style={{color: '#fff'}}>Chicken Farming is being upgraded to a newer version with enhanced features between 8:30 hours UTC to 12:30 hours UTC. During this time you won't be able to perform any actions. </p>
                                   </div> */}
                         
                                           <div className="pool-btns" style={{justifyContent:'end'}}>
                                               {
                                               !farmLocked  && farmBalance > 0 && farmApprove &&
                                                    <a className="btn" onClick={lockNFT} >Lock {farmSymbol} NFT</a>                                               
                                               }
                                                {
                                               farmBalance > 0 && !farmApprove &&
                                                    <a className="btn" onClick={approveNFT}>Approve & Lock {farmSymbol} NFT</a>                                               
                                               }
                                                {
                                               farmLocked &&
                                                    <a className="btn" onClick={areaToggle}>Buy More Farm Area</a>                                               
                                               }
                                                {
                                               !farmLocked && farmBalance ==  0 &&
                                                    <a className="btn" onClick={buyAreaToggle}>Buy Farm Area</a>                                               
                                               }
                                                 {
                                                landIsfree  &&
                                                    <a className="btn ml-2" onClick={() => sellfarm()}>Sell Farm Area</a>                                               
                                               }
                                                
                                           </div>
                                       </div>
                               </div>
                                <div className="newpool-box mr-b bgchicken">
                                   <div className="alienpool-wrp mb-3">
                                       <div className="alienpool">
                                           <div className="alienpool-img">
                                               <img src={egga} />
                                           </div>
                                           <div className="alienpool-content">
                                                <h3>Chicken Farm</h3>
                                                <p>Uses Chicken</p>
                                               
                                           </div>
                                       </div>
                                       <div className="alienbal">
                                            <div class="balance"><h3>{chickenBalance} {chickenSymbol} 
                                            {
                                            chickenBalance > 0 && chickenBalance <=10 &&
                                            <img src={chicken1} width="60px" />
                                            }
                                            {
                                            chickenBalance > 10 && chickenBalance <=100 &&
                                            <img src={chicken100} width="60px" />
                                            }
                                            {
                                            chickenBalance > 100 && chickenBalance <=1000 &&
                                            <img src={chicken1000} width="60px" />
                                            }
                                            
                                            
                                            </h3><p>Balance</p></div>
                                            <div class="balance"><h3>{chickenDeposited} {chickenSymbol}
                                            
                                            {
                                            chickenDeposited > 0 && chickenDeposited <=10 &&
                                            <img src={chicken1} width="60px" />
                                            }
                                            {
                                            chickenDeposited > 10 && chickenDeposited <=100 &&
                                            <img src={chicken100} width="60px" />
                                            }
                                            {
                                            chickenDeposited > 100 && chickenDeposited <=1000 &&
                                            <img src={chicken1000} width="60px" />
                                            } 
                                            
                                            </h3><p>Deposited</p></div>
                                       </div>
                                       <div className="alientime">
                                           <div className="time-child1">
                                                <h3>
                                                    {parseFloat(eggsearned).toFixed()}
                                                    {
                                            eggsearned > 0 && eggsearned <=10 &&
                                            <img src={eggs1} className="ml-2" width="60px" />
                                            }
                                            {
                                            eggsearned > 10 && eggsearned <=100 &&
                                            <img src={eggs100}  className="ml-2" width="60px" />
                                            }
                                            {
                                            eggsearned > 100 && eggsearned <=1000 &&
                                            <img src={eggs1000}  className="ml-2" width="60px" />
                                            }
                                                    </h3>
                                                <p>Eggs Earned</p>
                                                {
                                                    chickenDeposited > 0 && layEndTime > new Date().getTime()/1e3 &&   
                                                    <>
                                                    <h3><span>{layTime}</span></h3>
                                                    <p>Next Laying Time</p>
                                                    </>
                                                }
                                                 {
                                                    chickenDeposited > 0 && layEndTime < new Date().getTime()/1e3 &&   
                                                    <>
                                                    <h3 className="marquee"><span>Not Laying Eggs</span></h3>
                                                    
                                                    </>
                                                }

                                                
                                           </div>
                                           <div className="time-child1">
                                                <h3>${parseFloat(eggsearned*0.12).toFixed(2)}</h3>
                                                <p>Earned Value</p>
                                           </div>
                                           <div className="time-child1">
                                           <h3>{chickenDeposited*365}</h3>
                                                <p>Eggs per Year</p>
                                                     {
                                                     chickenDeposited > 0 && unlockTime > new Date().getTime()/1e3 &&  
                                                    <>
                                                    <h3 className="timer">{endTime}</h3>
                                                    <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for Chicken feed to end.</span></p>
                                                    </>
                                                        }
                                                           {
                                                     chickenDeposited > 0 && unlockTime < new Date().getTime()/1e3 &&  
                                                    <>
                                                    <h3 className="timer">Feed Exhausted</h3>
                                                    {/* <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for Chicken feed to end.</span></p> */}
                                                    </>
                                                        }
                                                  
                                               
                                           </div>
                                       </div>
                                       
                                   </div>
                                   <div className="alienbtns">
                                           {/* <div className="pool-btns">
                                                        <p style={{color: '#fff'}}>Chicken Farming is being upgraded to a newer version with enhanced features between 8:30 hours UTC to 12:30 hours UTC. During this time you won't be able to perform any actions. </p>
                                               </div> */}

                                          <div className="pool-btns">
                                             <a className="btn" href="/buy/chicken">Buy Chicken</a>
                                             {
                                                 chickenApproved == 0 &&
                                             <a className="btn" onClick={approveChicken} >Approve Chicken for Farm</a>
                                             }
                                             
                                             {
                                                 chickenApproved > 0  &&  chickenDeposited == 0 && 
                                             <a className="btn" onClick={() => setChickenModal(!chickenModal) } >Put Chicken in Farm</a>
                                                }


                                               {  
                                                   chickenApproved > 0  &&  chickenDeposited > 0 && unlockTime > new Date().getTime()/1e3 &&
                                             <a className="btn" onClick={() => setMoreChickenModal(!moreChickenModal) } >Put more Chicken in Farm</a>
                                                }
                                              
                                              

                                             {
                                                 chickenDeposited > 0 && unlockTime < new Date().getTime()/1e3 &&
                                                
                                                 <a className="btn" onClick={() => setremoveChickenModal(!removeChickenModal)}>Remove Chicken From Farm</a>
                                                
                                            }
                                             {
                                                 eggsearned > 0 && 
                                             <a className="btn" onClick={claimEggs} >Claim Eggs</a>
                                             }
                                            {
                                                   chickenDeposited > 0 &&
                                                 <a className="btn" onClick={() => setaddDaysChickenModal(!addDaysChickenModal)}>Add Feed</a>
                                              
                                             }
                                            
                                           </div> 
                                       </div>
                               </div>
                               {/* <div className="col-lg-12">
                               <div className="slide-heads">
                                    <h3>PUT EEGS TO INCUBATORS AND EARN CHICKENS.</h3>
                                </div>
                                <div className="bullet-list-wrp">
                                    <div className="market-btn">
                                        <a href="/marketplace"><img src={marketbtn} /></a>
                                         <a href="/slide3"><img src={farmingbtn} /></a> 
                                    </div>
                                </div>
                               </div> */}
                               <div className="newpool-box bgegg" >
                                   <div className="alienpool-wrp mb-1">
                                       <div className="alienpool">
                                           <div className="alienpool-img">
                                               <img src={childe} />
                                           </div>
                                           <div className="alienpool-content">
                                                <h3>EGG Incubator</h3>
                                                <p>Uses EGG</p>
                                               
                                           </div>
                                       </div>
                                       <div className="alienbal">
                                            <div class="balance"><h3>{chickenEggBalance} {chickenEggSymbol}
                                            
                                            {
                                            chickenEggBalance > 0 && chickenEggBalance <=10 &&
                                            <img src={eggs1} className="ml-2" width="60px" />
                                            }
                                            {
                                            chickenEggBalance > 10 && chickenEggBalance <=100 &&
                                            <img src={eggs100}  className="ml-2" width="60px" />
                                            }
                                            {
                                            chickenEggBalance > 100 && chickenEggBalance <=1000 &&
                                            <img src={eggs1000}  className="ml-2" width="60px" />
                                            }
                                            </h3><p>Balance</p></div>
                                            <div class="balance"><h3>{chickenEggDeposited} {chickenEggSymbol}
                                            
                                            {
                                            chickenEggDeposited > 0 && chickenEggDeposited <=10 &&
                                            <img src={eggs1} className="ml-2" width="60px" />
                                            }
                                            {
                                            chickenEggDeposited > 10 && chickenEggDeposited <=100 &&
                                            <img src={eggs100} className="ml-2" width="60px" />
                                            }
                                            {
                                            chickenEggDeposited > 100 && chickenEggDeposited <=1000 &&
                                            <img src={eggs1000} className="ml-2" width="60px" />
                                            }
                                            
                                            </h3><p>Deposited</p></div>
                                       </div>
                                       <div className="alientime">
                                           {/* <div className="time-child1">
                                                <h3>{hatched} {chickenEggSymbol}</h3>
                                                <p>EGGs Hatched</p>
                                                <h3>{eggTime2}</h3>
                                                <p>Time to Hatch</p>
                                           </div> */}
                                           <div className="time-child1">
                                                <h3>
                                                    
                                                    {adult}  {chickenSymbol}
                                                    {
                                            adult > 0 && adult <=10 &&
                                            <img src={chicken1} width="60px" />
                                            }
                                            {
                                            adult > 10 && adult <=100 &&
                                            <img src={chicken100} width="60px" />
                                            }
                                            {
                                            adult > 100 && adult <=1000 &&
                                            <img src={chicken1000} width="60px" />
                                            } 
                                                    
                                                    </h3>
                                                <p>Adult Chickens</p>
                                                <h3 className="timer">{eggTime}</h3>
                                                <p>Time to Grow as Adult</p>
                                           </div>
                                           <div className="time-child1">
                                                <h3>${adult*10}</h3>
                                                <p>Market Value</p>
                                                <h3 className="timer">{incubCapacity}</h3>
                                                <p>Available Incubators</p>
                                           </div>
                                       </div>
                                     
                                      
                                   </div>
                                   <div className="alienbtns">
                                           <div className="pool-btns">
                                           <a className="btn" href="/buy/chickenegg">Buy Eggs</a>
                                           {
                                                 chickenEggApproved == 0 &&
                                             <a className="btn" onClick={approveChickenEgg} >Approve Eggs for Incubator</a>
                                             }
                                             {
                                                 chickenEggApproved > 0 && chickenEggDeposited == 0 &&
                                             <a className="btn" onClick={eggtoggle} >Put Eggs in Incubator</a>
                                             }
                                             
                                             {
                                                 adult > 0 &&  baseApprovedIncub > 0 &&
                                             <a className="btn" onClick={claimChicken} >Claim Chickens (Fee: {chickenClaimfee} {baseSymbol}) </a>
                                             }      

                                              {
                                                 adult > 0 &&  baseApprovedIncub == 0 &&
                                             <a className="btn" onClick={approvebaseTokenIncub} >Approve MyFarmPet to claim Chickens</a>
                                             }      
                                             
                                           </div>
                                       </div>
                               </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="stokes">
						<img src={stoke} />
					</div>
                </div>
                <Footer/>


                
                <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>

                
                <Modal isOpen={chickenModal} toggle={chickentoggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {chickenSymbol} Balance<br />
          {chickenBalance}  
       </span>       
       <span className="pull-right text-right"> 
          Your available {farmSymbol}<br />
           {farmCapacity - chickenDeposited} sq m
       </span>  
   </div>
  <label className="mb-3"><br />Enter Quantity to Farm 
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxcDeposit}>Max</span>
 
  </label>
  <input className="form-control" onChange={handlecDepositChange} type="text" value={cdamount} />
  <span className="info">Max: {farmCapacity - chickenDeposited} {chickenSymbol} @ (1 {chickenSymbol} per sq. m.)</span>
 
  <label className=""><br />Enter Days to Farm 
  </label>

  <input className="form-control" onChange={handleDayChange} type="text" value={dayamount} />
  <span className="info">Est. Food: {cdamount*20*dayamount} {chickenFoodSymbol} @ (600 {chickenFoodSymbol} per {chickenSymbol} daily)</span>
  <span className="info mt-3"><b>Your Available Chicken Food:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
  <span className="info mt-3"><b>Your Chicken Food Cost for Total Chicken in Farm:</b> {parseFloat((parseFloat(chickenDeposited)+parseFloat(cdamount))*dayamount*20).toFixed(2)} {chickenFoodSymbol}</span>
  <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenDepositFee*cdamount).toFixed(2)} {baseSymbol} (@ {chickenDepositFee} per chicken )</span>

  

  {
      cdepositError &&
      <span className="error">{cdepositError}</span>
  }
 
</ModalBody>
<ModalFooter>
    { 
        baseApprovedFarm == 0 &&
        <Button className="depositButton mr-3" onClick={approvebaseTokenFarm}>Approve {baseSymbol}</Button>

    }
{
           chickenFoodApproved == 0 &&   baseApprovedFarm > 0 &&
  <Button className="depositButton mr-3" onClick={approveChickenFood}>Approve {chickenFoodSymbol}</Button>
    }
    {
        chickenApproved > 0 &&  chickenFoodApproved > 0 &&   baseApprovedFarm > 0 &&
  <Button className="depositButton mr-3" onClick={depositChicken}>Deposit</Button>
    }
  <Button className="depositButton" onClick={chickentoggle}>Cancel</Button>
</ModalFooter>
</Modal>



<Modal isOpen={moreChickenModal} toggle={moreChickentoggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {chickenSymbol} Balance<br />
          {chickenBalance}  
       </span>       
       <span className="pull-right text-right"> 
          Your available {farmSymbol}<br />
           {farmCapacity - chickenDeposited} sq m
       </span>  
   </div>
  <label className="mb-3"><br />Enter Quantity to add in Farm 
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxcDeposit}>Max</span>
 
  </label>

  <input className="form-control" onChange={handlecDepositChange} type="text" value={cdamount} />
  <span className="info">Max: {farmCapacity - chickenDeposited} {chickenSymbol} @ (1 {chickenSymbol} per sq. m.)</span>
 
  
  <span className="info">Est. Food: {cdamount*20*depositedDay} {chickenFoodSymbol} @ (600 {chickenFoodSymbol} per {chickenSymbol} daily)</span>
  <span className="info mt-3"><b>Your Available Chicken Food:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
  <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenDepositFee*cdamount).toFixed(2)} {baseSymbol} (@ {chickenDepositFee} per chicken )</span>

  {
      cdepositError &&
      <span className="error">{cdepositError}</span>
  }
 
</ModalBody>
<ModalFooter>
    { 
        baseApprovedFarm == 0 &&
        <Button className="depositButton mr-3" onClick={approvebaseTokenFarm}>Approve {baseSymbol}</Button>

    }
{
           chickenFoodApproved == 0 &&   baseApprovedFarm > 0 &&
  <Button className="depositButton mr-3" onClick={approveChickenFood}>Approve {chickenFoodSymbol}</Button>
    }
    {
        chickenApproved > 0 &&  chickenFoodApproved > 0 &&   baseApprovedFarm > 0 &&
  <Button className="depositButton mr-3" onClick={depositMoreChicken}>Deposit</Button>
    }
  <Button className="depositButton" onClick={moreChickentoggle}>Cancel</Button>
</ModalFooter>
</Modal>






<Modal isOpen={buyAreaModal} toggle={buyAreaToggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {baseSymbol} Balance<br />
          {baseBalance}  
       </span>       
       <span className="pull-right text-right"> 
          Your available {farmSymbol}<br />
           {farmCapacity - chickenDeposited} sq m
       </span>        
        
   </div>
  <label className="mb-3"><br />Enter Farm Area to Buy (sq m)
  {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}
 
  </label>
  <input className="form-control" onChange={handleBuyAreaChange} type="text" value={buyareadamount} />
  <span className="info mt-3"><b>Cost:</b> {buyareadamount*farmPrice} {baseSymbol}</span>
  
  {
      buyareadepositError &&
      <span className="error">{buyareadepositError}</span>
  }
 
</ModalBody>
<ModalFooter>
{
        baseApproved == 0   && 
  <Button className="depositButton mr-3" onClick={approvebaseToken}>Approve {baseSymbol}</Button>
    }
    {
        baseApproved > 0   && 
  <Button className="depositButton mr-3" onClick={buyAreaNFT}>Buy</Button>
    }
  <Button className="depositButton" onClick={buyAreaToggle}>Cancel</Button>
</ModalFooter>
</Modal>



<Modal isOpen={areaModal} toggle={areaToggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {baseSymbol} Balance<br />
          {baseBalance}  
       </span>       
       <span className="pull-right text-right"> 
          Your available {farmSymbol}<br />
           {farmCapacity - chickenDeposited} sq m
       </span>        
        
   </div>
  <label className="mb-3"><br />Enter Farm Area to add-on  (sq m)
  {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}
 
  </label>
  <input className="form-control" onChange={handleAreaChange} type="text" value={areadamount} />
  <span className="info mt-3"><b>Cost:</b> {areadamount*farmPrice} {baseSymbol}</span>
  
  {
      areadepositError &&
      <span className="error">{areadepositError}</span>
  }
 
</ModalBody>
<ModalFooter>

{
        baseApproved == 0   && 
  <Button className="depositButton mr-3" onClick={approvebaseToken}>Approve {baseSymbol}</Button>
    }
    {
        baseApproved > 0   && 
  <Button className="depositButton mr-3" onClick={addAreaNFT}>Add</Button>
    }
  <Button className="depositButton" onClick={areaToggle}>Cancel</Button>
</ModalFooter>
</Modal>


<Modal isOpen={eggModal} toggle={eggtoggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {chickenEggSymbol} Balance<br />
          {chickenEggBalance}  
       </span>       
        
   </div>
  <label className="mb-3"><br />Enter Quantity to Incubate
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxceDeposit}>Max</span>
 
  </label>
  <input className="form-control" onChange={handleeDepositChange} type="text" value={cedamount} />
  <span className="info mt-3"><b>Fee:</b> {cedamount*eggDepositFee} {baseSymbol} (@{eggDepositFee} {baseSymbol} per Egg)</span><br />
  <span className="info"><b>Maximum Per User:</b> 50 Eggs</span> 
  
  

  {
      cedepositError &&
      <span className="error">{cedepositError}</span>
  }
 
</ModalBody>
<ModalFooter>

{
        baseApprovedIncub == 0  && 
  <Button className="depositButton mr-3" onClick={approvebaseTokenIncub}>Approve {baseSymbol}</Button>
    } 
    {
        chickenEggApproved > 0  && baseApprovedIncub > 0  && 
  <Button className="depositButton mr-3" onClick={depositEgg}>Deposit</Button>
    }
  <Button className="depositButton" onClick={eggtoggle}>Cancel</Button>
</ModalFooter>
</Modal>





<Modal isOpen={addDaysChickenModal} toggle={addDaysChickentoggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {chickenSymbol} Deposited<br />
          {chickenDeposited}  
       </span>       
       
   </div>
  <label className="mb-3"><br />Enter Days to add in Farming 
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxDayDeposit}>Max</span>
 
  </label>
  <input className="form-control" onChange={handleAddDayChange} type="text" value={addDayamount} />
  <span className="info mt-3"><b>Your Chicken Food Cost for Total Chicken in Farm:</b> {parseFloat(chickenDeposited*addDayamount*20).toFixed(2)} {chickenFoodSymbol}</span>
  <span className="info mt-3"><b>Your Available Chicken Food:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
  
  {
      addDdepositError &&
      <span className="error">{addDdepositError}</span>
  }
    
 
</ModalBody>
<ModalFooter> 
{
           chickenFoodApproved == 0 && 
  <Button className="depositButton mr-3" onClick={approveChickenFood}>Approve {chickenFoodSymbol}</Button>
    }
    {
        chickenFoodApproved > 0 && 
  <Button className="depositButton mr-3" onClick={addDays}>Add Days</Button>
    }
  <Button className="depositButton" onClick={addDaysChickentoggle}>Cancel</Button>
</ModalFooter>
</Modal>


<Modal isOpen={removeChickenModal} toggle={removeChickentoggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {chickenSymbol} Deposited<br />
          {chickenDeposited}  
       </span>       
       
   </div>
  <label className="mb-3"><br />Enter Quantity to remove from Farm 
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxcrDeposit}>Max</span>
 
  </label>
  <input className="form-control" onChange={handlecrDepositChange} type="text" value={crdamount} />
  <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenRemoveFee*crdamount).toFixed(2)} {baseSymbol} (@ {chickenRemoveFee} per chicken )</span>
  {
      crdepositError &&
      <span className="error">{crdepositError}</span>
  }
    
 
</ModalBody>
<ModalFooter> 
{ 
        baseApprovedFarm == 0 &&
        <Button className="depositButton mr-3" onClick={approvebaseTokenFarm}>Approve {baseSymbol}</Button>

    }

  <Button className="depositButton mr-3" onClick={removeChicken}>Remove</Button>
 
  <Button className="depositButton" onClick={removeChickentoggle}>Cancel</Button>
</ModalFooter>
</Modal>



            </div>
		);
 
}
export default ChickenFarm;