import React, { Component } from 'react';
import $ from "jquery";
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/egg-GIF.gif';
import cb1 from '../../images/cb1.png';
import cb2 from '../../images/cb2.png';
import cb3 from '../../images/cb3.png';
import cb4 from '../../images/cb4.png';
import cb5 from '../../images/cb5.png';
import cb6 from '../../images/cb6.png';
import cb7 from '../../images/cb7.png';
import backbtn from '../../images/backbtn.png';
import buybtn from '../../images/buybtn.png';
import cancel from '../../images/cancel.png';
import { useEffect , useState } from 'react';
import { MARKETPLACE } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json' ;
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json' ;
import Web3 from "web3"
import {useWallet} from '@binance-chain/bsc-use-wallet'
 
 


const ELEMENTS = {
    'chicken' : {
        'name' : 'CHICKEN',
        'price' : '10',
        'image' : cb1,
        'address' : '0x0a92bc06443E7D4cd38735ED01B5C5C3C74F6773'
    },
    'chickenegg' : {
        'name' : 'CHICKEN EGG',
        'price' : '0.12',
        'image' : cb5,
        'address' : '0x78AC3A5bC58455B41601189FDCF028F63e8c9ced'
    },
    'chickenfood' : {
        'name' : 'CHICKEN FOOD',
        'price' : '1',
        'image' : cb2,
        'address' : '0x50C0268e1D368420Ce99766BF89AbecEfCFC7644'

    },
    'boar' : {
        'name' : 'BOAR',
        'price' : '100',
        'image' : cb3,
        'address' : '0x486bfd5AE6bf094E403bCF8dae14b708b15B143E'

    },
    'sow' : {
        'name' : 'SOW',
        'price' : '100',
        'image' : cb4,
        'address' : '0x26B00Fb006Cb64c1f5D4ed407c6aBdF902F1c595'

    },
    'piglet' : {
        'name' : 'PIGLET',
        'price' : '10',
        'image' : cb6,
        'address' : '0x7f7936Bf782F327bF549809bC6469dbE52280867'

    },
    'pigfood' : {
        'name' : 'PIG FOOD',
        'price' : '5',
        'image' : cb7,
        'address' : '0xea049FB6D789deEb85630c16576cC0CEB75555F7'

    }
}


const elements = (props) => {
const [balance, setBalance] = useState(0);
const [symbol, setSymbol] = useState(0);
const [baseToken, setBaseToken] = useState(null);
const [aseetBalance, setAseetBalance] = useState(0);
const [aseetApproval, setAseetApproval] = useState(0);

const [approved, setApproved] = useState(0);
const [tokenPrice, setTokenPrice] = useState(0);
const [available, setAvailable] = useState(0);

const [decimals, setDecimals] = useState(0);
  const [damount, setdAmount] = useState('');
  const [samount, setsamount] = useState('');
  
  const [depositAmount, setDepositAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  
const [depositError, setDepositError] = useState(false);
const [sellError, setSellError] = useState(false);
const [sellFee, setSellfee] = useState(0);



const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);

const [buyModal, setBuyModal] = useState(false);
const buyToggle = () => setBuyModal(!buyModal);

const [sellModal, setSellModal] = useState(false);
const sellToggle = () => setSellModal(!sellModal);



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
          getPrice() ;
        },[wallet.account])

        const getPrice = async () => {
            let _web3 = new Web3(web3Provider);
            let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
            if(props.match.params.key == 'chicken'){
                let _getPrice = await _marketContract.methods.getTokenPerChicken().call() ;
                _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
                setTokenPrice(_getPrice);
 
            }
            else  if(props.match.params.key == 'chickenegg'){
                let _getPrice = await _marketContract.methods.getTokenPerEgg().call() ;
                _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
                setTokenPrice(_getPrice);
 
            }
            else  if(props.match.params.key == 'chickenfood'){
                let _getPrice = await _marketContract.methods.getTokenPerChickenFood().call() ;
                _getPrice = parseFloat(_getPrice*600/1e18).toFixed(2) 
                setTokenPrice(_getPrice);
 
            }
            else  if(props.match.params.key == 'boar'){
                let _getPrice = await _marketContract.methods.getTokenPerBoar().call() ;
                _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
                setTokenPrice(_getPrice);
 
            }
            else  if(props.match.params.key == 'sow'){
                let _getPrice = await _marketContract.methods.getTokenPerSow().call() ;
                _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
                setTokenPrice(_getPrice);
 
            }
            else  if(props.match.params.key == 'piglet'){
                let _getPrice = await _marketContract.methods.getTokenPerPiglet().call() ;
                _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
                setTokenPrice(_getPrice);
 
            }
            else  if(props.match.params.key == 'pigfood'){
                let _getPrice = await _marketContract.methods.getTokenPerPigfood().call() ;
                _getPrice = parseFloat(_getPrice*600/1e18).toFixed(2) 
                setTokenPrice(_getPrice);
 
            }

            let _getFee = await _marketContract.methods.sellFee().call() ;
            _getFee = parseFloat(_getFee/1000).toFixed(4);
            setSellfee(_getFee);
        }


        const getData = async () => {
                  let _web3 = new Web3(web3Provider);
                  let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
                  let baseToken = await _marketContract.methods.baseToken().call() ;
                  setBaseToken(baseToken);
                  let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
                  let _symbol = await _tokenContract.methods.symbol().call() ;
                  let _decimals = await _tokenContract.methods.decimals().call() ;
                  setDecimals(_decimals)
                  setSymbol(_symbol);

                  let _atoken = ELEMENTS[props.match.params.key].address ;
                  let _atokenContract = new _web3.eth.Contract(TOKEN_ABI,_atoken);
                  let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call() ;
                  setAvailable(parseFloat(_available/1e18).toFixed());
                  
            
                  
                  if(wallet.account){
                      let _balance = await _tokenContract.methods.balanceOf(wallet.account).call() ;
                      _balance = parseFloat(_balance/1e1**_decimals).toFixed(2);
                      let _assetAdd  = ELEMENTS[props.match.params.key].address ;
                      let _assetContract = new _web3.eth.Contract(TOKEN_ABI,_assetAdd);
                      let _assetBalance = await _assetContract.methods.balanceOf(wallet.account).call() ;
                      let _assetDecimals = await _assetContract.methods.decimals().call() ;
                      let _assetApproval = await _assetContract.methods.allowance(wallet.account,MARKETPLACE).call() ;
                      let _approval = await _tokenContract.methods.allowance(wallet.account,MARKETPLACE).call() ;

                      _assetBalance = parseFloat(_assetBalance/1e1**_assetDecimals).toFixed(2);
                      _assetApproval = parseFloat(_assetApproval/1e1**_assetDecimals).toFixed(2);
                    //   alert(_assetApproval);
                      setAseetApproval(_assetApproval)
                      setAseetBalance(_assetBalance)
                      setApproved(_approval)

                      setBalance(_balance);
                  }

        }

        
        const sellFarmTokens = () => {
            let _web3 = new Web3(web3Provider);
            let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
            setSellError(false)
            let _tokenAdd  = ELEMENTS[props.match.params.key].address ;
            setModal(!modal);
            let _amount = parseFloat(sellAmount) ;
            if(props.match.params.key == 'chickenfood' || props.match.params.key == 'pigfood'){
                _amount = _amount*600 ;
            }
            if(_amount > aseetBalance ){
                setSellError("Error: Insufficient Balance");
                return false;
            }
            else{
               
                _amount = _web3.utils.toWei(_amount.toString()) ;
    
                _marketContract.methods.sellFarmTokens(_tokenAdd,_amount).send({
                    from: wallet.account
                }).on('receipt', function(receipt){
                    getPrice() ;
                    getData();
                    setModal(modal);
                    sellToggle()
                   
                }).on('error', function(receipt){
                    setModal(modal);
            
                })
    
            }
          
        


        }
        
        const buyFarmTokens = () => {
            let _web3 = new Web3(web3Provider);
            let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
            
            let _tokenAdd  = ELEMENTS[props.match.params.key].address ;
            setModal(!modal);
            let _amount = parseFloat(depositAmount) ;

            if(props.match.params.key == 'chickenfood' || props.match.params.key == 'pigfood'){
                _amount = _amount*600 ;
            }
            _amount = _web3.utils.toWei(_amount.toString()) ;

            _marketContract.methods.buyfarmTokens(_tokenAdd,_amount).send({
                from: wallet.account
            }).on('receipt', function(receipt){
                getPrice() ;
                getData();
                setModal(modal);
                setBuyModal(!buyModal)
               
            }).on('error', function(receipt){
                setModal(modal);
        
            })

            let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);



        }

        const handleDepositChange = (e) => {
            setDepositAmount(e.target.value) ;
            setdAmount(e.target.value) ;
        
        }

        const handleSellChange = (e) => {
            setSellAmount(parseFloat(e.target.value)) ;
            setsamount(e.target.value) ;
        
        }

       
        
        
        
async function approveAsset(){
    let _web3 = new Web3(web3Provider);
     
    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    const asset = ELEMENTS[props.match.params.key].address ;
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,asset);
    const _amount = _web3.utils.toWei('10000000000000') ;
    _tokenContract.methods.approve(MARKETPLACE,_amount).send({from: wallet.account}).on('receipt', function(receipt){
        getPrice() ;
        getData() ;
         setModal(modal);
         sellFarmTokens()

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}
        
async function approveToken(){
    let _web3 = new Web3(web3Provider);
     
    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
    const _amount = _web3.utils.toWei('10000000000000') ;
    _tokenContract.methods.approve(MARKETPLACE,_amount).send({from: wallet.account}).on('receipt', function(receipt){
        getPrice() ;      
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

        
        async function setMaxSell(){
            let _amt = parseFloat(aseetBalance)
            if(props.match.params.key === 'chickenfood' || props.match.params.key === 'pigfood'){
                _amt = parseFloat(_amt/600).toFixed()
            }

 
            setsamount(_amt)
            setSellAmount(_amt)
        }
        
        const openbuymodal = () => {
            setBuyModal(!buyModal)
        }

		return(
			<div>
             <Header />
                <div className="bg-chicken">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="chicken-content-wrp">
                                    <div className="chicken-c-img">
                                        <img src={ELEMENTS[props.match.params.key].image} />
                                    </div>
                                    <div className="c-price"><h3>${ELEMENTS[props.match.params.key].price} ~ {tokenPrice}</h3></div>
                                </div>
                                <div className="wrp-btn-back">
                                    {
                                        available  == 0 ?
                                    <a href="javascript:void" className="buysellbtn conbutton" >Sold Out</a>
                                    :
                                    <a href="javascript:void" className="buysellbtn conbutton" onClick={buyToggle} >BUY</a>
                                    }
                                    <a href="javascript:void" className="buysellbtn conbutton"  onClick={sellToggle} >SELL</a>
                                  
                                </div>
                                    <div className="wrp-btn-back">
                                    <a href="/marketplace" className="buysellbtn conbutton">MARKETPLACE</a>
                                    <a href="/choose" className="buysellbtn conbutton">FARMING</a>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Modal isOpen={buyModal} toggle={buyToggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {ELEMENTS[props.match.params.key].name} Balance<br />
          {aseetBalance}  
       </span>       
       <span className="pull-right"> 
          Your Token Balance<br />
          {balance} {symbol}
       </span>
   </div>
  <label className="mb-3"><br />
  {
           (props.match.params.key === 'chickenfood' || props.match.params.key === 'pigfood') && 

      <>
      Enter number in multiple of 600 gms to Buy 
      </>
  }
  {
      props.match.params.key != 'chickenfood' && props.match.params.key != 'pigfood' && 
      <>
      Enter Quantity to Buy 
      </>
  }
  
  {/* <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxDeposit}>Max</span> */}
  </label>
  <input className="form-control mb-3" onChange={handleDepositChange} type="text" value={damount} />
  {
          (props.match.params.key === 'chickenfood' || props.match.params.key === 'pigfood') && 

      <span className="info mt-3">Weight: {parseFloat(damount*600).toFixed(2)} grams ({ELEMENTS[props.match.params.key].name})</span>

  }
  <span className="info mt-3">Cost: {parseFloat(damount*tokenPrice).toFixed(2)} {symbol}</span>

  {
      depositError &&
      <span className="error">{depositError}</span>
  }
    
 
</ModalBody>
<ModalFooter>
    {
        approved == 0 && 
  <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button>
    }

    {
        approved > 0 && 
  <Button className="depositButton mr-3" onClick={buyFarmTokens}>Buy</Button>
    }
  <Button className="depositButton" onClick={buyToggle}>Cancel</Button>
</ModalFooter>
</Modal>

<Modal isOpen={sellModal} toggle={sellToggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
   <span className="pull-left"> 
          Your {ELEMENTS[props.match.params.key].name} Balance<br />
          {aseetBalance}  
       </span>       
       <span className="pull-right"> 
          Your Token Balance<br />
          {balance} {symbol}
       </span>
   </div>
  <label className="mb-3"><br />
  {/* {props.match.params.key} */}
  {
      (props.match.params.key === 'chickenfood' || props.match.params.key === 'pigfood') && 
      <>
      Enter number in multiple of 600 gms to Sell 
      </>
  }
  {
      (props.match.params.key != 'chickenfood' && props.match.params.key != 'pigfood') && 
      <>
      Enter Quantity to Sell 
      </>
  }
  
  <span className="depositButton maxbtn ml-2 p-2" onClick={setMaxSell}>Max</span>
  </label>
  <input className="form-control mb-3" onChange={handleSellChange} type="text" value={samount} />
  {
      (props.match.params.key === 'chickenfood' || props.match.params.key === 'pigfood') && 
      <span className="info mt-3">Weight: {parseFloat(samount*600).toFixed(2)} grams ({ELEMENTS[props.match.params.key].name})</span>

  }
  <span className="info mt-3">Price: {parseFloat(samount*tokenPrice).toFixed(2)} {symbol}</span>
  <span className="info mt-3">Fee: {parseFloat(samount*tokenPrice*sellFee).toFixed(2)} {symbol}</span>

  {
      sellError &&
      <span className="error">{sellError}</span>
  }
    
 
</ModalBody>
<ModalFooter>
    {
        aseetApproval < sellAmount && 
  <Button className="depositButton mr-3" onClick={approveAsset}>Approve {ELEMENTS[props.match.params.key].name}</Button>
    }

    {
         aseetApproval >= sellAmount  && 
  <Button className="depositButton mr-3" onClick={sellFarmTokens}>Sell</Button>
    }
  <Button className="depositButton" onClick={sellToggle}>Cancel</Button>
</ModalFooter>
</Modal>


                
<Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>
                </div> 
                <div className="stokes">
						<img src={stoke} />
					</div>
                <Footer/>
            </div>
		);
	 

}
export default elements;