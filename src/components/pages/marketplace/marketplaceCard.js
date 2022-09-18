import React, { Component } from 'react';

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import stoke from '../../images/stoke.png';
import chicken1 from '../../images/chicken1.png';
 
import buybtn from '../../images/BUY_SELL.png';
import c4 from '../../images/c4.png';
import c5 from '../../images/c5.png';
import c6 from '../../images/c6.png';
import c7 from '../../images/c7.png';
import backbtn from '../../images/backbtn.png';
 
import { MARKETPLACE, ROUTER } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json' ;
import ROUTER_ABI from '../../../Config/ROUTER_ABI.json' ;

import TOKEN_ABI from '../../../Config/TOKEN_ABI.json' ;
  
import cb1 from '../../images/noborder/cb1.png';
import cb2 from '../../images/noborder/cb2.png';
import cb3 from '../../images/noborder/cb3.png';
import cb4 from '../../images/noborder/cb4.png';
import cb5 from '../../images/noborder/cb5.png';
import cb6 from '../../images/noborder/cb6.png';
import cb7 from '../../images/noborder/cb7.png';
import { useEffect } from 'react';
import { useState } from 'react';
import Web3 from "web3"
import {useWallet} from '@binance-chain/bsc-use-wallet'

const ELEMENTS = [
    {
        'slug' : 'chicken' ,
        'name' : 'CHICKEN',
        'price' : '10',
        'image' : cb1,
        'address' : '0x0a92bc06443E7D4cd38735ED01B5C5C3C74F6773'
    },
    { 
        'slug' : 'chickenegg' ,
        'name' : 'CHICKEN EGG',
        'price' : '0.12',
        'image' : cb5,
        'address' : '0x78AC3A5bC58455B41601189FDCF028F63e8c9ced'
    },
    {
        'slug' : 'chickenfood' ,
        'name' : 'CHICKEN FOOD',
        'price' : '1',
        'image' : cb2,
        'address' : '0x50C0268e1D368420Ce99766BF89AbecEfCFC7644'

    },
    {
        'slug' : 'boar',
        'name' : 'BOAR',
        'price' : '100',
        'image' : cb3,
        'address' : '0x486bfd5AE6bf094E403bCF8dae14b708b15B143E'

    },
    {
        'slug' : 'sow',
        'name' : 'SOW',
        'price' : '100',
        'image' : cb4,
        'address' : '0x26B00Fb006Cb64c1f5D4ed407c6aBdF902F1c595'

    },
    {   'slug' : 'piglet',
        'name' : 'PIGLET',
        'price' : '10',
        'image' : cb6,
        'address' : '0x7f7936Bf782F327bF549809bC6469dbE52280867'

    },
    {
        'slug' : 'pigfood',
        'name' : 'PIG FOOD',
        'price' : '5',
        'image' : cb7,
        'address' : '0xea049FB6D789deEb85630c16576cC0CEB75555F7'

    }
];




const  MarketplaceCard = (props) => {

    // const [fa, setFa] = useState(0)
     const [boxArray ,setBoxArray] = useState([]) ; 
     const [tokenPrice, setTokenPrice] = useState(0);
     const [sold, setSold] = useState(0);
     const [soldValue, setSoldValue] = useState(0);
     const [available, setAvailable] = useState(0);
     const [symbol, setSymbol] = useState(null);
     const [baseTokenPrice, setBaseTokenPrice] = useState(0);

     
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
        getTokenPrice() ;

    },[])

    const getData = () => {
        console.log(props)
            let v= ELEMENTS[props.index]
            setBoxArray(v);
     
           

    }
    
    const getTokenPrice = async () => {
      let _web3 = new Web3(web3Provider);
      let _marketContract = new _web3.eth.Contract(ROUTER_ABI,ROUTER);
      let _amt = _web3.utils.toWei('1');
      let _baseTokenPrice = await _marketContract.methods.getAmountsOut(_amt,['0x903fcaf1a49b29678c15b43bc9f852232bfa7df1','0xe9e7cea3dedca5984780bafc599bd69add087d56']).call() ;
      _baseTokenPrice =  parseFloat(_baseTokenPrice[1]/1e18).toFixed(2) ;
      setBaseTokenPrice(_baseTokenPrice)

    }
      const getPrice = async () => {
        let _web3 = new Web3(web3Provider);
        let _marketContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);

        let baseToken = await _marketContract.methods.baseToken().call() ;
        // setBaseToken(baseToken);
        let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
        let _symbol = await _tokenContract.methods.symbol().call() ;
        setSymbol(_symbol);
        if(props.slug == 'chicken'){
            let _atoken = ELEMENTS[props.index].address ;
            let _atokenContract = new _web3.eth.Contract(TOKEN_ABI,_atoken);
            let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call() ;
            setAvailable(parseFloat(_available/1e18).toFixed());
            
            
            let baseToken = await _marketContract.methods.baseToken().call() ;
            // setBaseToken(baseToken);
            let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
            
            let _getPrice = await _marketContract.methods.getTokenPerChicken().call() ;


            let _getSold = await _marketContract.methods.totalChickenSold().call() ;
            _getSold = parseFloat(_getSold/1e18).toFixed() 
            setSold(_getSold);

            let _getSoldValue = await _marketContract.methods.totalChickenSoldValue().call() ;
            _getSoldValue = parseFloat(_getSoldValue/1e18).toFixed() 
            setSoldValue(_getSoldValue);

            _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
            console.log(_getPrice);
            setTokenPrice(_getPrice);

        }
        else  if(props.slug == 'chickenegg'){
            let _atoken = ELEMENTS[props.index].address ;
            let _atokenContract = new _web3.eth.Contract(TOKEN_ABI,_atoken);
            let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call() ;
            setAvailable(parseFloat(_available/1e18).toFixed());
            let _getPrice = await _marketContract.methods.getTokenPerEgg().call() ;
            _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
            setTokenPrice(_getPrice);

            let _getSold = await _marketContract.methods.totalEggSold().call() ;
            _getSold = parseFloat(_getSold/1e18).toFixed() 
            setSold(_getSold);

            let _getSoldValue = await _marketContract.methods.totalEggSoldValue().call() ;
            _getSoldValue = parseFloat(_getSoldValue/1e18).toFixed() 
            setSoldValue(_getSoldValue);


        }
        else  if(props.slug == 'chickenfood'){
            let _atoken = ELEMENTS[props.index].address ;
            let _atokenContract = new _web3.eth.Contract(TOKEN_ABI,_atoken);
            let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call() ;
            setAvailable(parseFloat(_available/1e18).toFixed());
            let _getPrice = await _marketContract.methods.getTokenPerChickenFood().call() ;
            _getPrice = parseFloat(_getPrice*600/1e18).toFixed(2) 
            setTokenPrice(_getPrice);

            let _getSold = await _marketContract.methods.totalChickenFoodSold().call() ;
            _getSold = parseFloat(_getSold/1e18).toFixed() 
            setSold(_getSold);

            let _getSoldValue = await _marketContract.methods.totalChickenFoodSoldValue().call() ;
            _getSoldValue = parseFloat(_getSoldValue/1e18).toFixed() 
            setSoldValue(_getSoldValue);

        }
        else  if(props.slug == 'boar'){
            let _atoken = ELEMENTS[props.index].address ;
            let _atokenContract = new _web3.eth.Contract(TOKEN_ABI,_atoken);
            let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call() ;
            setAvailable(parseFloat(_available/1e18).toFixed());
            let _getPrice = await _marketContract.methods.getTokenPerBoar().call() ;
            _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
            setTokenPrice(_getPrice);

            let _getSold = await _marketContract.methods.totalBoarSold().call() ;
            _getSold = parseFloat(_getSold/1e18).toFixed() 
            setSold(_getSold);

            let _getSoldValue = await _marketContract.methods.totalBoarSoldValue().call() ;
            _getSoldValue = parseFloat(_getSoldValue/1e18).toFixed() 
            setSoldValue(_getSoldValue);

        }
        else  if(props.slug == 'sow'){
            let _atoken = ELEMENTS[props.index].address ;
            let _atokenContract = new _web3.eth.Contract(TOKEN_ABI,_atoken);
            let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call() ;
            setAvailable(parseFloat(_available/1e18).toFixed());
            let _getPrice = await _marketContract.methods.getTokenPerSow().call() ;
            _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
            setTokenPrice(_getPrice);

            let _getSold = await _marketContract.methods.totalSowSold().call() ;
            _getSold = parseFloat(_getSold/1e18).toFixed() 
            setSold(_getSold);

            let _getSoldValue = await _marketContract.methods.totalSowSoldValue().call() ;
            _getSoldValue = parseFloat(_getSoldValue/1e18).toFixed() 
            setSoldValue(_getSoldValue);


        }
        else  if(props.slug == 'piglet'){
            let _atoken = ELEMENTS[props.index].address ;
            let _atokenContract = new _web3.eth.Contract(TOKEN_ABI,_atoken);
            let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call() ;
            setAvailable(parseFloat(_available/1e18).toFixed());
            let _getPrice = await _marketContract.methods.getTokenPerPiglet().call() ;
            _getPrice = parseFloat(_getPrice/1e18).toFixed(2) 
            setTokenPrice(_getPrice);

            let _getSold = await _marketContract.methods.totalPigletSold().call() ;
            _getSold = parseFloat(_getSold/1e18).toFixed() 
            setSold(_getSold);

            let _getSoldValue = await _marketContract.methods.totalPigletSoldValue().call() ;
            _getSoldValue = parseFloat(_getSoldValue/1e18).toFixed() 
            setSoldValue(_getSoldValue);

        }
        else  if(props.slug == 'pigfood'){
            let _atoken = ELEMENTS[props.index].address ;
            let _atokenContract = new _web3.eth.Contract(TOKEN_ABI,_atoken);
            let _available = await _atokenContract.methods.balanceOf(MARKETPLACE).call() ;
            setAvailable(parseFloat(_available/1e18).toFixed());
            let _getPrice = await _marketContract.methods.getTokenPerPigfood().call() ;
            _getPrice = parseFloat(_getPrice*600/1e18).toFixed(2) 
            setTokenPrice(_getPrice);

            let _getSold = await _marketContract.methods.totalPigFoodSold().call() ;
            _getSold = parseFloat(_getSold/1e18).toFixed() 
            setSold(_getSold);

            let _getSoldValue = await _marketContract.methods.totalPigFoodSoldValue().call() ;
            _getSoldValue = parseFloat(_getSoldValue/1e18).toFixed() 
            setSoldValue(_getSoldValue);

        }

         
    }


    return (
<div className="col-lg-4 mb-5">
<div className="marketplace-box">
  <div className="img-cb">
    <img src={boxArray.image} />
  </div>
  <div className="market-content">
    <h3>{boxArray.name}</h3>
    <ul className="listmarket">
      <li>
         <div className="wrp-rate">
           <div className="rate">Rate:</div>
           
           <div className="total-r">${parseFloat(baseTokenPrice*tokenPrice).toFixed(2)} ~ {parseFloat(  tokenPrice).toFixed(2)} {symbol}</div>
         </div>
      </li>
      <li>
         <div className="wrp-rate">
           <div className="rate">Total Sold</div>
           <div className="total-r">{sold}</div>
         </div>
      </li>
      <li>
         <div className="wrp-rate">
           <div className="rate">Total Sold Value</div>
           <div className="total-r">{soldValue} {symbol}</div>
         </div>
      </li>
      <li>
         <div className="wrp-rate">
           <div className="rate">Total Available</div>
           <div className="total-r">{available == 0 ? "Sold Out" : available }</div>
         </div>
      </li>
    </ul>
    <div className="m-buybtn">
      <a href={"/buy/"+boxArray.slug}><img src={buybtn} /></a>
    </div>
  </div>
</div>
</div>
    )
}

export default MarketplaceCard ;