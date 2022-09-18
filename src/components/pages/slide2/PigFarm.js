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
import { PIG_FARMING , PIG_INCUBATOR, MARKETPLACE } from '../../../Config/index.js';
import PIG_FARMING_ABI from '../../../Config/PIG_FARMING_ABI.json' ;
import PIG_INCUBATOR_ABI from '../../../Config/PIG_INCUBATOR_ABI.json' ;
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json' ;
import NFT_ABI from '../../../Config/NFT_ABI.json' ;
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json' ;
import { func } from 'prop-types';
import gtm from '../../images/gtm.png';
import pigicon from '../../images/pigicon.png';
import pigicon2 from '../../images/pigicon2.png';
import pigicon3 from '../../images/pigicon3.png';


const  PigFarm = () => {
    
const [farmArea, setFarmArea] = useState(0);
const [farmCapacity, setFarmCapacity] = useState(0);
const [farmBalance, setFarmBalance] = useState(0);
const [farmSymbol, setFarmSymbol] = useState(null);
const [sowSymbol, setsowSymbol] = useState(null);
const [boarSymbol, setboarSymbol] = useState(null);
const [chickenEggSymbol, setChickenEggSymbol] = useState(null);
const [chickenFoodSymbol, setChickenFoodSymbol] = useState(null);
const [areadamount, setareadamount] = useState(0);
const [buyareadamount, setbuyareadamount] = useState(0);
const [eggDepositFee, setEggDepositFee] = useState(0);
const [chickenDepositFee, setChickenDepositFee] = useState(0);
const [chickenRemoveFee, setChickenRemoveFee] = useState(0);

const [depositedDay, setDepositedDay] = useState(0);

const [approvalProcessing, setApprovalProcessing] = useState(false);



const [farmLocked, setFarmLocked] = useState(false);
const [farmApprove, setFarmApprove] = useState(false);
const [farmTokenId, setFarmTokenId] = useState(null);
const [landIsfree, setLandIsfree] = useState(false);

const [farmPrice, setFarmPrice] = useState(0);




const [sowBalance , setSowBalance] = useState(0);
const [boarBalance , setBoarBalance] = useState(0);
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
const [sowDeposited , setSowDeposited] = useState(0);
const [boarDeposited , setboarDeposited] = useState(0);

const [chickenEggDeposited , setChickenEggDeposited] = useState(0);
const [eggsearned , setEggsearned] = useState(0);
const [hatched , setHatched] = useState(0);
const [adult , setAdult] = useState(0);
const [chickenEggApproved , setChickenEggApproved] = useState(0);
const [sowApproved , setSowApproved] = useState(0);
const [boarApproved , setBoarApproved] = useState(0);
const [chickenFoodApproved , setChickenFoodApproved] = useState(0);

const [sowToken , setsowToken] = useState(0);
const [boarToken , setboarToken] = useState(0);
const [requiredBoar , setRequiredBoar] = useState(0);

const [chickenpigletToken , setChickenpigletToken] = useState(0);
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
const [cdamount, setcdAmount] = useState(0);
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

const [sowModal, setChickenModal] = useState(false);
const sowtoggle = () => setChickenModal(!sowModal);

const [moreChickenModal, setMoreChickenModal] = useState(false);
const moreChickentoggle = () => setMoreChickenModal(!moreChickenModal);

const [areaModal, setareaModal] = useState(false);
const areaToggle = () => setareaModal(!areaModal);

const [processed, setProcessed] = useState(false);



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
    //   getEggData() ;
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
          
            // getEggTime() ;
        }, 1000);
  
      }

      if(eggHatchTime > 0){
        clearInterval(timeInterval3);
        timeInterval3 = setInterval(() => {
            // getEggHatchTime() ;
        
        }, 1000);
  
      }
     
    },[wallet.account, unlockTime ,layunlockTime, layEndTime, eggunlockTime , eggHatchTime])
    
    useEffect(() => {
        setProcessed(false)
    },[])
    
    
    const getData = async () => {
    //   setProcessed(false);
    setApprovalProcessing(true);
          
              let _web3 = new Web3(web3Provider);
              let _farmingContract = new _web3.eth.Contract(PIG_FARMING_ABI,PIG_FARMING);
              let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
              let _tokenPerfarm = await _marketContract.methods.getTokenPerFarmArea().call() ;
              setFarmPrice(parseFloat(_tokenPerfarm/1e18).toFixed(2));
              let _baseToken = await _marketContract.methods.baseToken().call() ;

              let _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI,_baseToken);
              setbaseToken(_baseToken) ;
              let farmToken = await _farmingContract.methods.farmLand().call() ;
              let _sowToken = await _farmingContract.methods.sowToken().call() ;
              let _boarToken = await _farmingContract.methods.boarToken().call() ;
              let _chickenFoodToken = await _farmingContract.methods.foodToken().call() ;
           
              setFarmToken(farmToken);

              let _depositFee = await _farmingContract.methods.getDepositFee(1).call() ;
              setChickenDepositFee(_depositFee);

              let _removeFee = await _farmingContract.methods.getRemoveFee(1).call() ;
              setChickenRemoveFee(_removeFee);
                setChickenFoodToken(_chickenFoodToken)
                setsowToken(_sowToken)
                setboarToken(_boarToken)
              let _nftContract = new _web3.eth.Contract(NFT_ABI,farmToken);
              let _sowContract = new _web3.eth.Contract(TOKEN_ABI,_sowToken);
              let _boarContract = new _web3.eth.Contract(TOKEN_ABI,_boarToken);
              
              let _chickenFoodContract = new _web3.eth.Contract(TOKEN_ABI,_chickenFoodToken);
              let _chickenFoodSymbol = await _chickenFoodContract.methods.symbol().call() ;
              setChickenFoodSymbol(_chickenFoodSymbol);
              let _symbol = await _nftContract.methods.symbol().call() ;
            //   alert(_symbol);
              setFarmSymbol(_symbol);
              let _sowSymbol = await _sowContract.methods.symbol().call() ;
              setsowSymbol(_sowSymbol);
              let _boarymbol = await _boarContract.methods.symbol().call() ;
              setboarSymbol(_boarymbol);
              let _baseSymbol = await _baseTokenContract.methods.symbol().call() ;
            //   alert(_baseSymbol);
              setBaseSymbol(_baseSymbol);
            
              if(wallet.account){
                // wallet.account = '0xbe7c30E0945d019F3aDc84AeEC55Ee2eCEb4247d' ;
                let _baseApproved = await _baseTokenContract.methods.allowance(wallet.account,MARKETPLACE).call() ;
                setBaseApproved(_baseApproved);
                let _baseApprovedFarm = await _baseTokenContract.methods.allowance(wallet.account,PIG_FARMING).call() ;
                setBaseApprovedFarm(_baseApprovedFarm);
                let _baseApprovedIncub = await _baseTokenContract.methods.allowance(wallet.account,PIG_INCUBATOR).call() ;
                // console.log('Incub Approved' , _baseApprovedIncub);    
                setBaseApprovedIncub(_baseApprovedIncub);
                let _baseBalance = await _baseTokenContract.methods.balanceOf(wallet.account).call() ;
             
                setBaseBalance(parseFloat(_baseBalance/1e18).toFixed(2));


                let _nftBalance = await _nftContract.methods.balanceOf(wallet.account).call() ;
                let _userInfo = await _farmingContract.methods.userInfo(wallet.account).call() ;
                let _userSow = await _farmingContract.methods.getUserSow(wallet.account).call() ;
                let _userBoar = await _farmingContract.methods.getUserBoar(wallet.account).call() ;
                setboarDeposited(parseFloat(_userBoar/1e18).toFixed())
                // if(_userInfo)
                // console.log(_userSow);
                setSowDeposited(parseFloat(_userSow/1e18).toFixed());
                if(_userInfo.sow > 0  ){
                    let _userEggs = await _farmingContract.methods.pendingPiglets(wallet.account).call() ;
                    // console.log(_userEggs);
                    setEggsearned( parseFloat(_userEggs/1e18).toFixed());
                }
             

                if(_userSow > 0){
                   

                    let _userChickenDie = await _farmingContract.methods.getUnlockTime(wallet.account).call() ;
                     
                    setUnlockTime(_userChickenDie) ;
                  
                    
                }
                // console.log(unlockTime);
                let _current = new Date().getTime()/1e3 ; 
                if(unlockTime > _current){
                   

                    let _userClaimTimes = await _farmingContract.methods.getNextClaim(wallet.account).call() ;
                    _userClaimTimes = Object.keys(_userClaimTimes).map((key) => _userClaimTimes[key]);
                    // console.log("claimeTimes",_userClaimTimes[1]);
                    setlayUnlockTime(_userClaimTimes[1]) ;
                    setlayEndTime(_userClaimTimes[0]) ;
                  
                    
                }


                let _chickenFoodBalance = await _chickenFoodContract.methods.balanceOf(wallet.account).call() ;
                _chickenFoodBalance = parseFloat(_chickenFoodBalance/1e18).toFixed() ;
                setChickenFoodBalance(_chickenFoodBalance);
                let _sowBalance = await _sowContract.methods.balanceOf(wallet.account).call() ;
                let _sowApproved = await _sowContract.methods.allowance(wallet.account,PIG_FARMING).call() ;
                setSowApproved(_sowApproved);


                let _chickenFoodApproved = await _chickenFoodContract.methods.allowance(wallet.account,PIG_FARMING).call() ;
                setChickenFoodApproved(_chickenFoodApproved);
                
                _sowBalance = parseFloat(_sowBalance/1e18).toFixed() ;
                setSowBalance(_sowBalance);
                let _boarBalance = await _boarContract.methods.balanceOf(wallet.account).call() ;
                _boarBalance = parseFloat(_boarBalance/1e18).toFixed() ;
                setBoarBalance(_boarBalance)
                let _boarApproved = await _boarContract.methods.allowance(wallet.account,PIG_FARMING).call() ;
                setBoarApproved(_boarApproved);


                // console.log(_userInfo);
                if(_nftBalance > 0 || _userInfo.landlocked     ){
                let _nftTokenId = await _nftContract.methods.ownerTokens(wallet.account).call() ;
                let _approved = await _nftContract.methods.getApproved(_nftTokenId).call() ;
                if(_approved == PIG_FARMING){
                    setFarmApprove(true);
                }
                    setFarmTokenId(_nftTokenId);
                    let _landIsfree = await _farmingContract.methods.landIsfree(_nftTokenId,wallet.account).call() ;
                    setLandIsfree(_landIsfree);
                    let _userInfo = await _farmingContract.methods.getUserToken(wallet.account).call() ;
                    setFarmLocked(_userInfo[4]);

                    //   console.log(_userInfo[4]);
                      if(_userInfo[4]){
                           setFarmTokenId(_userInfo[1]);

                              setFarmArea( parseFloat(_userInfo[2]/1e18).toFixed());
                              setFarmCapacity( parseFloat(_userInfo[3]/1e18).toFixed());
                     
                      }
                }
                  setFarmBalance(_nftBalance);  
              setProcessed(true);
              setApprovalProcessing(false);

              }
             



    }

    
    const getEggData = async () => {
        let _web3 = new Web3(web3Provider);
        let _incubatorContract = new _web3.eth.Contract(PIG_INCUBATOR_ABI ,PIG_INCUBATOR);
          let _chickenpigletToken = await _incubatorContract.methods.pigletToken().call() ;
            setChickenpigletToken(_chickenpigletToken);

            let _capacity = await _incubatorContract.methods.capacity().call() ;
            setIncubCapacity(_capacity/1e18);

            let _depositFee = await _incubatorContract.methods.getDepositFee(1).call() ;
            setEggDepositFee(_depositFee);
        let _chickenEggContract = new _web3.eth.Contract(TOKEN_ABI,_chickenpigletToken);
        
        let _chickenEggSymbol = await _chickenEggContract.methods.symbol().call() ;
        setChickenEggSymbol(_chickenEggSymbol);
        
        if(wallet.account){
       
          let _balance = await _chickenEggContract.methods.balanceOf(wallet.account).call() ;
          let _userInfo = await _incubatorContract.methods.userInfo(wallet.account).call() ;
          setChickenEggBalance(parseFloat(_balance/1e18).toFixed())
          setChickenEggDeposited(parseFloat(_userInfo[0]/1e18).toFixed());

          let _chickenEggApproved = await _chickenEggContract.methods.allowance(wallet.account,PIG_INCUBATOR).call() ;
          setChickenEggApproved(_chickenEggApproved);


          if(_userInfo[0] > 0){
              let _userItens = await _incubatorContract.methods.pendingItems(wallet.account).call() ;
            //   console.log(_userEggs);
              setHatched( parseFloat(_userItens[0]/1e18).toFixed());
              setAdult( parseFloat(_userItens[1]/1e18).toFixed());
              let _unlockItem = await _incubatorContract.methods.getUnlockTime(wallet.account).call() ;
              setEggUnlockTime(_unlockItem) ;  
              let _unlockItem2 = await _incubatorContract.methods.getHatchTime(wallet.account).call() ;
              setEggHatchTime(_unlockItem2) ;              
          }
 
        }


}


    async function lockNFT(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _farmingContract = new _web3.eth.Contract(PIG_FARMING_ABI,PIG_FARMING);
 
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
        // console.log(unlockTime);
    
        // console.log("Next Time" , layunlockTime )
        if(parseInt(_current) > parseInt(layEndTime) ){
            setlayTime(null);
    
        }
        else{
            if(parseInt(_current) > parseInt(layunlockTime) ){
                getData() ;
            }
            else{
                let remainingSecondsLay = layunlockTime - _current ;
                // console.log("Remaining Sec" , remainingSecondsLay);
            
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
    // console.log(unlockTime);
 
    if(parseInt(_current) > parseInt(unlockTime)){
        setendTime(null);
            // console.log('ended')
            // console.log('Current' , _current)
    }
    else{

        let remainingSeconds = unlockTime - _current ;
        // console.log("Remaining Sec" , remainingSeconds);
    
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
        // console.log(eggHatchTime);
        if(parseInt(_current) > parseInt(eggHatchTime)){
            seteggTime2(0);
                // console.log('ended')
                // console.log('Current' , _current)
        }
        else{
            let remainingSeconds = eggHatchTime - _current ;
            // console.log("Remaining Sec" , remainingSeconds);
        
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
        // console.log(eggunlockTime);
        if(parseInt(_current) > parseInt(eggunlockTime)){
            seteggTime(0);
                // console.log('ended')
                // console.log('Current' , _current)
        }
        else{
            let remainingSeconds = eggunlockTime - _current ;
            // console.log("Remaining Sec" , remainingSeconds);
        
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
         if(sowDeposited < crdamount ){
            setcrDepositError("Error: Insufficient deposited balance");
             return false;
         }
        
        else{
            
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _famringContract = new _web3.eth.Contract(PIG_FARMING_ABI,PIG_FARMING);
       
        let _camount = _web3.utils.toWei(crdamount.toString());
        // console.log(farmTokenId,_camount,dayamount);
        
        _famringContract.methods.removeSow(_camount).send({from: wallet.account}).on('receipt', function(receipt){
          
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
        if(parseInt(sowBalance) < parseInt(cdamount)){
            setcDepositError("Error: Insufficient Sow Balance");
            return false;
        }
       
        else if(parseInt(cdamount) > (parseInt(farmCapacity) - parseInt(parseInt(sowDeposited)+parseInt(boarDeposited))) ){
            setcDepositError("Error: Insufficient farm Land");
            return false;
        }
        else if(parseInt(chickenFoodBalance) < parseInt(parseInt(cdamount)*parseInt(depositedDay)*20) ){
            setcDepositError("Error: Insufficient food Balance");
            return false;
        }
        else{
            
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _famringContract = new _web3.eth.Contract(PIG_FARMING_ABI,PIG_FARMING);
        let _amount  = _web3.utils.toWei('5000000000000000000');
        let _camount = _web3.utils.toWei(cdamount.toString());
        // console.log(farmTokenId,_camount,dayamount);
        
        _famringContract.methods.depositMoreSow(_camount,farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
     
             setModal(modal);         
             moreChickentoggle();
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
        }
    }

    

    async function depositSow(){
        let _web3 = new Web3(web3Provider);
        setcDepositError(false)
        if(cdamount == '' || cdamount == 0 ){
            setcDepositError("Error: Invalid Sow Quantity");
            return false;
        }
        if(dayamount == '' || dayamount == 0 ){
            setcDepositError("Error: Invalid Day");
            return false;
        }
        
         if(chickenFoodBalance < cdamount*dayamount*7*20 ){
             setcDepositError("Error: Insufficient food Balance");
             return false;
         }
        else if(cdamount > (farmCapacity - sowDeposited) ){
            setcDepositError("Error: Insufficient farm Land");
            return false;
        }
        else if(parseInt(parseInt(cdamount) + parseInt(requiredBoar)) > (parseInt(farmCapacity) - parseInt(parseInt(sowDeposited) + parseInt(boarDeposited))) ){
            setcDepositError("Error: Insufficient farm Land");
            return false;
        }
        else{
            
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _famringContract = new _web3.eth.Contract(PIG_FARMING_ABI,PIG_FARMING);
        let _amount  = _web3.utils.toWei('5000000000000000000');
        let _camount = _web3.utils.toWei(cdamount.toString());
        let _boar = requiredBoar.toString() ;
        _boar = _web3.utils.toWei(_boar);
        // console.log(farmTokenId,_camount,dayamount);
        // console.log(farmTokenId,_camount,_boar,dayamount);
        let _dayamount = dayamount*7 ;
        _famringContract.methods.deposit(farmTokenId,_camount,_boar,_dayamount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getData() ;
     
             setModal(modal);         
             sowtoggle();
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
        }
    }

    
    
    async function approvebaseTokenFarm(){
        let _web3 = new Web3(web3Provider);
        setApprovalProcessing(true);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _baseTokenContract.methods.approve(PIG_FARMING,_amount).send({from: wallet.account}).on('receipt', function(receipt){
            getData() ;
            setModal(modal);
            setApprovalProcessing(false);
    
 
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
        setApprovalProcessing(false);
            
        });
           
    }

    async function approvebaseTokenIncub(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _baseTokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _baseTokenContract.methods.approve(PIG_INCUBATOR,_amount).send({from: wallet.account}).on('receipt', function(receipt){
          
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
        setApprovalProcessing(true);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _chickenFoodContract = new _web3.eth.Contract(TOKEN_ABI,chickenFoodToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _chickenFoodContract.methods.approve(PIG_FARMING,_amount).send({from: wallet.account}).on('receipt', function(receipt){
        setApprovalProcessing(false);
          
            getData() ;
            setModal(modal);

            // depositSow() ;
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
        setApprovalProcessing(false);
            
        });
           
    }

    

    
    async function claimChicken(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        const _incubatorContract = new _web3.eth.Contract(PIG_INCUBATOR_ABI ,PIG_INCUBATOR);
        _incubatorContract.methods.claimAdults().send({from: wallet.account}).on('receipt', function(receipt){
          
            getEggData() ;
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
    }
    async function claimEggs(){
        let _web3 = new Web3(web3Provider);
         
        setModal(!modal);
        const _farmingContract = new _web3.eth.Contract(PIG_FARMING_ABI,PIG_FARMING);
        _farmingContract.methods.claimPiglets().send({from: wallet.account}).on('receipt', function(receipt){
          
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
        const _chickenEggContract = new _web3.eth.Contract(TOKEN_ABI,chickenpigletToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _chickenEggContract.methods.approve(PIG_INCUBATOR,_amount).send({from: wallet.account}).on('receipt', function(receipt){
          
            getEggData() ;
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }

    
    async function approveBoarSow(){

        if(sowApproved == 0){
            approveSow() ;
        }

        if(boarApproved == 0){
            approveBoar() ;
        }
    }


    async function approveBoar(){
        let _web3 = new Web3(web3Provider);
        setApprovalProcessing(true);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _boarContract = new _web3.eth.Contract(TOKEN_ABI,boarToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _boarContract.methods.approve(PIG_FARMING,_amount).send({from: wallet.account}).on('receipt', function(receipt){
            setApprovalProcessing(false);
 
          
            getData() ;
            setModal(modal);

    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
        setApprovalProcessing(false);
            
        });
           
    }


    async function approveSow(){
        let _web3 = new Web3(web3Provider);
        setApprovalProcessing(true);
         
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _sowContract = new _web3.eth.Contract(TOKEN_ABI,sowToken);
        let _amount  = _web3.utils.toWei('5000000000000000000')
        _sowContract.methods.approve(PIG_FARMING,_amount).send({from: wallet.account}).on('receipt', function(receipt){
            setModal(modal);
            setApprovalProcessing(false);
 
            getData() ;
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
        setApprovalProcessing(false);
            
        });
           
    }

     


    async function addDays(){
        setaddDdepositError(false);
        let _maxamount = parseFloat(chickenFoodBalance)/parseFloat(20*parseFloat(parseFloat(sowDeposited)+parseFloat(boarDeposited)));
        console.log(chickenFoodBalance);
        console.log(sowDeposited);
        console.log(boarDeposited);
        console.log(_maxamount);
        console.log(addDayamount*7);
        if(parseInt(_maxamount) < parseInt(addDayamount*7) ){

            setaddDdepositError("Error: Insufficient Food Balance");
            return false;
        }
        
        else{
        let _web3 = new Web3(web3Provider);
           
       setModal(!modal);
       // document.getElementById("exampleModalCenter").modal('show')
       const _farmingContract = new _web3.eth.Contract(PIG_FARMING_ABI,PIG_FARMING);
        let _camount = parseInt(addDayamount*7) ;
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
       const _incubatorContract = new _web3.eth.Contract(PIG_INCUBATOR_ABI ,PIG_INCUBATOR);
        let _camount = _web3.utils.toWei(cedamount.toString());
    //    console.log(farmTokenId,_camount,dayamount);
       
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
            _marketContract.methods.sellFarmLandPigsty(farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
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
            _marketContract.methods.buyFarmLandPigsty(_area).send({from: wallet.account}).on('receipt', function(receipt){
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
            _marketContract.methods.addFarmLandAreaPigsty(_area,farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
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
 
        _nftContract.methods.approve(PIG_FARMING,farmTokenId).send({from: wallet.account}).on('receipt', function(receipt){
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
        let _damount = chickenFoodBalance/(20*(parseInt(boarDeposited)+parseInt(sowDeposited)));
         
        setaddDayamount(parseFloat(_damount))
         
    }


    async function setMaxcrDeposit(){
        let _damount = sowDeposited;
         
        setcrdAmount(parseFloat(_damount))
         
    }

    // async function setMaxArea(){
    //     let _damount = baseBalance;
         
    //     setareadamount(parseFloat(_damount))
         
    // }

    
    async function setMaxcDeposit(){
        let _damount = sowBalance
        if(sowBalance > farmCapacity){
            _damount = farmCapacity
        }
        setcdAmount(_damount)
        setcDepositAmount(_damount)
    }

    
    

    
    const handlecDepositChange = (e) => {
        setcDepositAmount(e.target.value) ;
        setcdAmount(e.target.value) ;    
        setRequiredBoar(Math.ceil(parseFloat(e.target.value/10).toFixed(2)))
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
                <section id="pigs-sec">
                    <div className="container">
						<div className="pig-head">
							<h3>BUY FARM LAND & PIG AND EARN PIGLET</h3>
							<div className="btn-gmt">
								<a href="/marketplace">
									<img src={gtm} />
								</a>
							</div>
						</div>
                        <div className="row">
                            <div className="col-lg-12">
								<div className="farm-land-box">
									<div className="farm-l-content">
										<div className="farm-l-c-chil1">
											<h3>Farm Land</h3>
										</div>
										<div className="farm-l-c-chil2">
											<img src={pigicon} className="pigicon" />
										</div>
									</div>
									<div className="line-stoke"></div>
									<div className="farm-blnc-wrp">
										<div className="farm-blnc-child1">
                                        <h3>{farmBalance} {farmSymbol}</h3>
											<p>Your Balance</p>
											
										</div>
										<div className="farm-blnc-child1">
											<h3>{farmArea} sq m</h3>
											<p>Your Locked Farm Area</p>
										</div>
										<div className="farm-blnc-child1">
											<h3>${farmArea*1}</h3>
											<p>Market Value</p>
										</div>
										<div className="farm-blnc-child1">
											<h3>{farmCapacity}</h3>
											<p>Pig Capacity</p>
										</div>
										
									</div>
									<div className="bfa-btn">
                                    {
                                               !farmLocked  && farmBalance > 0 && farmApprove && processed && 
                                                    <a href="javascript:void"  onClick={lockNFT} >Lock {farmSymbol} NFT</a>                                               
                                               }
                                                {
                                               farmBalance > 0 && !farmApprove && processed &&
                                                    <a href="javascript:void" onClick={approveNFT}>Approve & Lock {farmSymbol} NFT</a>                                               
                                               }
                                                {
                                               farmLocked && processed &&
                                                    <a href="javascript:void" className="mr-3" onClick={areaToggle}>Buy More Farm Area</a>                                               
                                               }
                                                {
                                               !farmLocked && farmBalance ==  0 && processed && 
                                                    <a href="javascript:void" onClick={buyAreaToggle}>Buy Farm Area</a>                                               
                                               }
                                                 {
                                                landIsfree  && processed &&
                                                    <a  href="javascript:void" onClick={() => sellfarm()}>Sell Farm Area</a>                                               
                                               }
												{/* <a href="#">Buy Farm Area</a> */}
									</div>
								</div>
							</div>
                        </div>
						<div className="row">
							<div className="col-lg-6">
								<div className="small-pigfarm-box">
									<div className="uses-box">
										<div className="uses-box-child1">
											<h3>Pig Farm</h3>
											<p>Uses Sow and Boar</p>
										</div>
										<div className="uses-box-child1">
											<div className="pig-icon2">
												<img src={pigicon2} />
											</div>
										</div>
									</div>
									<div class="line-stoke"></div>
									<div className="pig-value-wrp">
										<div className="pigvalue-child1">
											<h3>{sowDeposited} {sowSymbol}</h3>
											<p>Deposited</p>
										</div>
										<div className="pigvalue-child1 text-right">
                                        <h3>{boarDeposited} {boarSymbol}</h3>
											<p>Deposited</p>
										</div>
										 
										
									</div>
                                    <div className="pig-value-wrp">
                                    <div className="pigvalue-child1">
                                        <h3>{eggsearned} PIGLETS</h3>
											<p>Earned</p>
										</div>
										<div className="pigvalue-child1 text-right">
                                        <h3>${eggsearned*10}</h3>
											<p>Earned Value</p>
										</div>
										
									</div>
									<div className="pig-value-wrp">
										<div className="pigvalue-child1">
											<h3>{sowBalance} {sowSymbol}</h3>
											<p>Balance</p>
										</div>	
                                        <div className="pigvalue-child2 text-right">
											<h3>{boarBalance} {boarSymbol}</h3>
											<p>Balance</p>
										</div>	
									</div>
                                    <div className="pig-value-wrp">
										<div className="pigvalue-child1">
                                            {/* {layunlockTime}
                                            {layEndTime} */}
                                    {
                                                     sowDeposited > 0 && unlockTime > new Date().getTime()/1e3 &&  
                                                    <>
                                                    <h3 className="timer">{endTime}</h3>
                                                    <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for Pig Food to end.</span></p>
                                                    </>
                                                        }
                                                           {
                                                     sowDeposited > 0 && unlockTime < new Date().getTime()/1e3 &&  
                                                    <>
                                                    <h3 className="timer">Food Exhausted</h3>
                                                    {/* <p className="marquee"><span><i className="fa fa-warning yellow" ></i> Time remaining for Chicken feed to end.</span></p> */}
                                                    </>
                                                        }
	                                	</div>	
								 
										<div className="pigvalue-child1  text-right">
                                            {/* {layEndTime} */}
                                    {
                                                    sowDeposited > 0 && layEndTime > new Date().getTime()/1e3 &&   
                                                    <>
                                                    <h3><span>{layTime}</span></h3>
                                                    <p>Next Delivery Time</p>
                                                    </>
                                                }
                                                 {
                                                    sowDeposited > 0 && layEndTime < new Date().getTime()/1e3 &&   
                                                    <>
                                                    <h3 className=""><span>Not Breeding</span></h3>
                                                    
                                                    </>
                                                }
 	</div>	
									</div>


									<div className="btn-bp">
                                   
										<a href="/marketplace" className="bp">Buy Sow/Boar</a>
                                      
                                        {
                                                 eggsearned > 0 && 
                                             <a href="javacript:void" onClick={claimEggs} >Claim Piglets</a>
                                             }
                                             
                                              {
                                            boarBalance > 0 && sowBalance > 0 &&  sowDeposited == 0 &&
                                            <a href="javacript:void" onClick={sowtoggle} >Deposit Sow</a>
                                        }
                                              </div>

									 
									<div className="btn-bp">
                                    {  
                                                  sowDeposited > 0 && unlockTime > new Date().getTime()/1e3 &&
                                             <a href="javacript:void" onClick={() => setMoreChickenModal(!moreChickenModal) } >Put more Sow in Farm</a>
                                                }

                                             {
                                                 sowDeposited > 0 && unlockTime < new Date().getTime()/1e3 &&
                                                
                                                 <a  href="javacript:void" onClick={() => setremoveChickenModal(!removeChickenModal)}>Remove Sow From Farm</a>
                                                
                                            }
                                           
                                            {
                                                   sowDeposited > 0 &&
                                                 <a href="javacript:void" onClick={() => setaddDaysChickenModal(!addDaysChickenModal)}>Add Feed</a>
                                              
                                             }

									</div>


								</div>
							</div>
							<div className="col-lg-6">
								<div className="small-pigfarm-box">
									<div className="uses-box">
										<div className="uses-box-child1">
											<h3>Piglet Incubator (Coming Soon)</h3>
											<p>Uses Piglet</p>
										</div>
										<div className="uses-box-child1">
											<div className="pig-icon2">
												<img src={pigicon3} />
											</div>
										</div>
									</div>
									<div class="line-stoke"></div>
									<div className="pig-value-wrp">
										<div className="pigvalue-child1">
											<h3>0 Piglet</h3>
											<p>Balance</p>
										</div>
										<div className="pigvalue-child1">
											<h3>0 Piglet</h3>
											<p>Deposited</p>
										</div>
										<div className="pigvalue-child1">
											<h3>0 Pig</h3>
											<p>Earned</p>
										</div>
										<div className="pigvalue-child1">
										    <h3>$0.00</h3>
											<p>Earned Value</p>
										</div>
									</div>
									<div className="pig-value-wrp2">
										<div className="pigvalue-child2">
											<h3>1000</h3>
											<p>Available Slot</p>
										</div>	
									</div>
									<div className="btn-bp">
										<a href="/marketplace" className="bp">Buy Piglet</a>
                                       
									</div>
								</div>
							</div>
						</div>
                    </div>
                </section>
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

                
                <Modal isOpen={sowModal} toggle={sowtoggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
   <b>Your {sowSymbol} Balance</b><br />
          {sowBalance}  
       </span>       
       <span className="pull-right text-right"> 
          <b>Your available Capacity</b><br />   
           {parseFloat(farmCapacity) - (parseFloat(sowDeposited)+parseFloat(boarDeposited))} Pigs
       </span>  
   </div>
  <label className="mb-3"><br /><b>Enter Quantity to Farm</b> 
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxcDeposit}>Max</span>
 
  </label>
  <input className="form-control" onChange={handlecDepositChange} type="text" value={cdamount} />
  <span className="info"><b>Max:</b> {parseFloat(farmCapacity) - (parseFloat(sowDeposited)+parseFloat(boarDeposited))} Pigs @ (1 Sow/Boar per 10 sq. m.)</span>
  <span className="info"><b>Note:</b> 1 Boar is required for 10 Sow to breed. Boar is automatically dedcuted from your wallet and adjusted to remaining space and required food is dedcuted from your wallet</span>
  <span className="info mt-1"><b>Required Boar:</b> {requiredBoar} {boarSymbol} (@ 1 {boarSymbol} per 10 {sowSymbol} )</span>
 
  <label className=""><br /><b>Enter Weeks to Farm</b> 
  </label>

  <input className="form-control" onChange={handleDayChange} type="text" value={dayamount} />
  <span className="info"><b>Note:</b> It takes One week for each sow to deliver one piglet</span>
  <span className="info mt-1"><b>Est. Food:</b> {parseFloat(parseFloat(requiredBoar) + parseFloat(cdamount))*20*dayamount*7} {chickenFoodSymbol} @ (20 {chickenFoodSymbol} per Pig daily)</span>
  <span className="info mt-3"><b>Your Available Pig Food:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
  <span className="info mt-3"><b>Your Pig Food Cost for Total Pigs in Farm: </b> {parseFloat((parseFloat(sowDeposited)+parseFloat(cdamount) + parseFloat(requiredBoar) )*dayamount*7*20).toFixed(2)} {chickenFoodSymbol}</span>
  <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenDepositFee*cdamount).toFixed(2)} {baseSymbol} (@ {chickenDepositFee} per pig )</span>

  

  {
      cdepositError &&
      <span className="error">{cdepositError}</span>
  }
 
</ModalBody>
<ModalFooter>
    {
         (boarApproved == 0 || sowApproved == 0 || chickenFoodApproved == 0 ||   baseApprovedFarm == 0) &&
 
    <div className="container">
        <h5>Approve following in order to deposit</h5>
<ul className="progressbar mt-3">
        <li className={baseApprovedFarm > 0 ? "active" : "" }>{baseSymbol}</li>
        <li className={chickenFoodApproved > 0 ? "active" : "" }>{chickenFoodSymbol}</li>
        <li className={sowApproved > 0 ? "active" : "" }>{sowSymbol}</li>
        <li className={boarApproved > 0 ? "active" : "" }>{boarSymbol}</li> 
      </ul>
      </div>
         }
         {
             approvalProcessing && 
        <Button className="depositButton mr-3"  >Processing...</Button>

         }
    { 
        baseApprovedFarm == 0 && !approvalProcessing &&
        <Button className="depositButton mr-3" onClick={approvebaseTokenFarm}>Approve {baseSymbol}</Button>

    }

{
           chickenFoodApproved == 0 &&   baseApprovedFarm > 0 && !approvalProcessing &&
  <Button className="depositButton mr-3" onClick={approveChickenFood}>Approve {chickenFoodSymbol}</Button>
    }
     { 
        sowApproved == 0 && chickenFoodApproved > 0 &&   baseApprovedFarm > 0 && !approvalProcessing &&
        <Button className="depositButton mr-3" onClick={approveSow}>Approve {sowSymbol}</Button>

    }
        { 
        boarApproved == 0 && sowApproved > 0 && chickenFoodApproved > 0 &&   baseApprovedFarm > 0 && !approvalProcessing &&
        <Button className="depositButton mr-3" onClick={approveBoar}>Approve {boarSymbol}</Button>

    }
    {
        sowApproved > 0 && boarApproved > 0 &&  chickenFoodApproved > 0 &&   baseApprovedFarm > 0 && 
  <Button className="depositButton mr-3" onClick={depositSow}>Deposit</Button>
    }
  <Button className="depositButton" onClick={sowtoggle}>Cancel</Button>
</ModalFooter>
</Modal>



<Modal isOpen={moreChickenModal} toggle={moreChickentoggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {sowSymbol} Balance<br />
          {sowBalance}  
       </span>       
       <span className="pull-right text-right"> 
          Your available {farmSymbol} Capacity<br />
           {farmCapacity - (parseInt(sowDeposited) + parseInt(boarDeposited)) } 
       </span>  
   </div>
  <label className="mb-3"><br />Enter Quantity to add in Farm 
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxcDeposit}>Max</span>
 
  </label>

  <input className="form-control" onChange={handlecDepositChange} type="text" value={cdamount} />
  <span className="info">Max: {farmCapacity - (parseInt(sowDeposited) + parseInt(boarDeposited))} {sowSymbol} @ (1 {sowSymbol} per sq. m.)</span>
 
  
  <span className="info">Est. Food: {cdamount*20*depositedDay} {chickenFoodSymbol} @ (600 {chickenFoodSymbol} per {sowSymbol} daily)</span>
  <span className="info mt-3"><b>Your Available Pig Food:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
  <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenDepositFee*cdamount).toFixed(2)} {baseSymbol} (@ {chickenDepositFee} per pig )</span>

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
        sowApproved > 0 &&  chickenFoodApproved > 0 &&   baseApprovedFarm > 0 &&
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
           {farmCapacity - sowDeposited} sq m
       </span>        
        
   </div>
  <label className="mb-3"><br />Enter in Multiple of ten for Farm Area to Buy (sq m)
  {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}
 
  </label>
  <input className="form-control" onChange={handleBuyAreaChange} type="text" value={buyareadamount} />
  <span className="info mt-3"><b>Cost:</b> {buyareadamount*farmPrice*10} {baseSymbol}</span>
  <span className="info mt-1"><b>Area:</b> {buyareadamount*10} sq. m.</span>
  <span className="info mt-1"><b>Capacity:</b> {buyareadamount} Pig(s)</span>
  
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
           {farmCapacity - sowDeposited} sq m
       </span>        
        
   </div>
  <label className="mb-3"><br />Enter in Multiple of ten for Farm Area to add-on  (sq m)
  {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxArea}>Max</span> */}
 
  </label>
  <input className="form-control" onChange={handleAreaChange} type="text" value={areadamount} />
  <span className="info mt-3"><b>Cost:</b> {areadamount*farmPrice*10} {baseSymbol}</span>
  <span className="info mt-1"><b>Area:</b> {areadamount*10} sq. m.</span>
  <span className="info mt-1"><b>Capacity:</b> {areadamount} Pig(s)</span>
  
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
          Your Pig(s) Deposited<br />
          {sowDeposited} {sowSymbol} and {boarDeposited} {boarSymbol}   
       </span>       
       
   </div>
  <label className="mb-3"><br />Enter Weeks to add in Farming 
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxDayDeposit}>Max</span>
 
  </label>
  <input className="form-control" onChange={handleAddDayChange} type="text" value={addDayamount} />
  <span className="info mt-3"><b>Your Pig Food Cost for Total Pig in Farm:</b> {parseFloat((parseInt(sowDeposited)+parseInt(boarDeposited))*addDayamount*7*20).toFixed(2)} {chickenFoodSymbol}</span>
  <span className="info mt-3"><b>Your Available Pig Food:</b> {chickenFoodBalance} {chickenFoodSymbol}</span>
  
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
          Your {sowSymbol} Deposited<br />
          {sowDeposited}  
       </span>       
       
   </div>
  <label className="mb-3"><br />Enter Quantity to remove from Farm 
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxcrDeposit}>Max</span>
 
  </label>
  <input className="form-control" onChange={handlecrDepositChange} type="text" value={crdamount} />
  <span className="info mt-1"><b>Fee:</b> {parseFloat(chickenRemoveFee*crdamount).toFixed(2)} {baseSymbol} (@ {chickenRemoveFee} per sow )</span>
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
export default PigFarm;