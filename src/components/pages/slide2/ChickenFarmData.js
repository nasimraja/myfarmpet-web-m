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
import { OLD_CHICKEN_FARMING , CHICKEN_FARMING , CHICKEN_INCUBATOR, MARKETPLACE } from '../../../Config/index.js';
import CHICKEN_FARMING_ABI from '../../../Config/CHICKEN_FARMING_ABI.json' ;
import CHICKEN_INCUBATOR_ABI from '../../../Config/CHICKEN_INCUBATOR_ABI.json' ;
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json' ;
import NFT_ABI from '../../../Config/NFT_ABI.json' ;
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json' ;
import { func } from 'prop-types';



const  NewChickenFarm = () => {
    
const [chickens, setChickens] = useState(0);
const [food, setFood] = useState(0);
const [farmId, setFarmId] = useState(0);
const [depositTime, setDepositTime] = useState(null);
const [claimTime, setClaimTime] = useState(null);
const [lockDays, setLockdays] = useState(null);
const [landlocked, setLandLocked] = useState(null);

const [chickens1, setChickens1] = useState(0);
const [food1, setFood1] = useState(0);
const [farmId1, setFarmId1] = useState(0);
const [depositTime1, setDepositTime1] = useState(null);
const [claimTime1, setClaimTime1] = useState(null);
const [lockDays1, setLockdays1] = useState(null);
const [landlocked1, setLandLocked1] = useState(null);


const [address, setAddress] = useState(null);


const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
 
const wallet = useWallet();
let web3Provider  = window.ethereum ; 

useEffect(() => {
    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
       
      }
     
      getData() ;

    },[address])

    const getData = async () => {
              let _web3 = new Web3(web3Provider);
              let _farmingContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,OLD_CHICKEN_FARMING);
              let _farmingContractnew = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
              
              if(address){
             
                let _result = await _farmingContract.methods.userInfo(address).call() ;
                let _resultNew = await _farmingContractnew.methods.userInfo(address).call() ;
                setChickens(_result[0]);
                setFood(_result[1]);
                setFarmId(_result[2]);
                setDepositTime(_result[3]);
                setClaimTime(_result[4]);
                setLockdays(_result[5]);
                setLandLocked(_result[6]);

                setChickens1(_resultNew[0]);
                setFood1(_resultNew[1]);
                setFarmId1(_resultNew[2]);
                setDepositTime1(_resultNew[3]);
                setClaimTime1(_resultNew[4]);
                setLockdays1(_resultNew[5]);
                setLandLocked1(_resultNew[6]);
             
              }     
               
    }

           

    async function addData(){
        let _web3 = new Web3(web3Provider);
       
            
        setModal(!modal);
        // document.getElementById("exampleModalCenter").modal('show')
        const _famringContract = new _web3.eth.Contract(CHICKEN_FARMING_ABI,CHICKEN_FARMING);
        
        
        _famringContract.methods.addData(chickens,food,farmId,depositTime,claimTime,lockDays,landlocked,address).send({from: wallet.account}).on('receipt', function(receipt){

             setModal(modal);       
            //  setAddress(null);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
      
    }
 

    
    const handleAddressChange = (e) => {
        setAddress(e.target.value) ;
        
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
                                
                                <div className="bullet-list-wrp">
                                    <div className="market-btn">
                                    <a href="/marketplace"><img src={marketbtn} /></a>                                        
                                    </div>
                                </div>
                               
                                <div className="newpool-box mr-b bgfarmland" >
                                    <input type="text" onChange={handleAddressChange} />
                                    <button onClick={getData} >Fetch Data</button>
                                    {/* <button onClick={addData} >Add Data</button> */}
                                   <div className="mb-3">
                                       <div className="alienpool">
                                           <div className="alienpool-img">
                                               <img src={land} />
                                           </div>
                                           <div className="alienpool-content">
                                                <h3>Farm Land</h3>                                               
                                           </div>
                                       </div>
                                      
                                       <div className="">                                          
                                       <li  >

                                                <h3>{chickens}</h3>
                                                <h3>{chickens1}</h3>
                                                <p>chickens</p>
                                           </li>
                                           <li  >

                                                <h3>{food}</h3>
                                                <h3>{food1}</h3>
                                                <p>Food</p>
                                           </li>
                                           <li  >

                                                <h3>{farmId}</h3>
                                                <h3>{farmId1}</h3>
                                                <p>farmId</p>
                                           </li>
                                           <li  >

                                                <h3>{depositTime}</h3>
                                                <h3>{depositTime1}</h3>
                                                <p>depositTime</p>
                                           </li>
                                           <li  >

                                                <h3>{claimTime}</h3>
                                                <h3>{claimTime1}</h3>
                                                <p>claimTime</p>
                                           </li>
                                           <li  >

                                                <h3>{lockDays}</h3>
                                                <h3>{lockDays1}</h3>
                                                <p>lockDays</p>
                                           </li>
                                           <li  >
                                                <h3>{landlocked}</h3>
                                                <h3>{landlocked1}</h3>
                                                <p>landlocked</p>
                                           </li>
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

                  

            </div>
		);
 
}
export default NewChickenFarm;