import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './components/pages/home/home.js';
import New from './components/pages/new/New.js';
import Slide1 from './components/pages/slide1/Slide1.js';
import ChickenFarm from './components/pages/slide2/ChickenFarm.js';
import NewChickenFarm from './components/pages/slide2/ChickenFarmData.js';


import Slide3 from './components/pages/slide3/Slide3.js';
import fslide1 from './components/pages/farmslide/fslide1.js';
import fslide2 from './components/pages/farmslide/fslide2.js';
import fslide3 from './components/pages/farmslide/fslide3.js';
import choose from './components/pages/choose/choose.js';
import marketplace from './components/pages/marketplace/marketplace.js';
import marketplace2 from './components/pages/marketplace/newmarketplace.js';

import chicken from './components/pages/chicken/chicken.js';
import chickenfood from './components/pages/chicken/chickenfood.js';
import pigmale from './components/pages/pig/pigmale.js';
import pigfemale from './components/pages/pig/pigfemale.js';
import pigchild from './components/pages/pig/pigchild.js';
import pigfood from './components/pages/pig/pigfood.js';
import chickenegg from './components/pages/chicken/chickenegg.js';
import step from './components/pages/formstep/step.js';
import elements from './components/pages/marketplace/elements';
import staking from './components/pages/slide3/Stake'
import KingGame from './components/pages/KingGame/KingGame.js';
import GameCenter from './components/pages/GameCenter/GameCenter.js';
import PigFarm from './components/pages/slide2/PigFarm';
import NewMarketplace from './components/pages/newmarketplace/Marketplace';
import Product from './components/pages/product/Product';
import Create from './components/pages/create/create';
import Single from './components/pages/single/single'
import Multiple from './components/pages/multiple/multiple'
import Swap from './components/pages/swap/Swap';
import choosemarketplace from './components/pages/choosemarketplace/choosemarketplace';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		localStorage.getItem('ACCESS_ID') != null ? <Redirect to='/' /> : <Component {...props} />
	)} />
)
class App extends Component {

	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" name="Home Page" component={Home} />
					<Route exact path="/new" name="New Page" component={New} />
					<Route exact path="/king-game" name="King Game Page" component={KingGame} />
					<Route exact path="/game-center" name="GameCenter Page" component={GameCenter} />
					<Route exact path="/slide1" name="Slide1 Page" component={Slide1} />
					<Route exact path="/Slide3" name="Slide3 Page" component={Slide3} />
					<Route exact path="/fslide1" name="fslide1 Page" component={fslide1} />
					<Route exact path="/fslide2" name="fslide2 Page" component={fslide2} />
					<Route exact path="/fslide3" name="fslide3 Page" component={fslide3} />

					<Route exact path="/step" name="step Page" component={step} />

					<Route exact path="/pig-farming" name="choose Page" component={PigFarm} />
					<Route exact path="/chicken-farming" name="choose Page" component={ChickenFarm} />
					<Route exact path="/chicken-farming-data" name="choose Page" component={NewChickenFarm} />
					<Route exact path="/choose" name="choose Page" component={choose} />
					<Route exact path="/marketplace" name="marketplace Page" component={marketplace2} />
					<Route exact path="/buy/:key" name="elements Page" component={elements} />
					<Route exact path="/staking" name="staking Page" component={staking} />
					<Route exact path="/nft/marketplace" name="NewMarketplace Page" component={NewMarketplace} />
					<Route exact path="/product/:tradeid" name="Product Page" component={Product} />
					<Route exact path="/create" name="Create Page" component={Create} />
					<Route exact path="/single" name="Single Page" component={Single} />
					<Route exact path="/multiple" name="Multiple Page" component={Multiple} />
					<Route exact path="/swap" name="Swap Page" component={Swap} />
					<Route exact path="/choosemarketplace" name="Swap Page" component={choosemarketplace} />
					


				</div>
			</Router>
		);
	}
}

export default App;
