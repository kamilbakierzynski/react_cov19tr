// React
import React from 'react';

// Navigation
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

// Screens
import LiveDataScreen from './screens/LiveData/LiveData';
import LocalDataScreen from './screens/LocalData/LocalData'
import LocalDataRouter from './screens/LocalData/LocalDataRouter';
import LandingScreen from './screens/LandingScreen/LandingScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import NoPageFoundScreen from './screens/404Screen/404Screen';

// Components
import Toasts from './components/Toasts';
import AlertComponent from './components/AlertComponent';


const Navigation = (props) => {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <img
                        src="assets/logo_big.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt=""
                    />
                </Navbar.Brand>
                <Link to="/" className="nav-link" style={{ textDecoration: "none" }} data-testid="nav-link_logo">
                    <Navbar.Brand>Coronavirus Tracker</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/live-data" className="nav-link" style={{ textDecoration: "none" }} data-testid="nav-link_live-data">Live data</Link>
                        <Link to="/local-data" className="nav-link" style={{ textDecoration: "none" }} data-testid="nav-link_local-data">Local data  <Badge variant="primary" data-testid="nav-link_local-data_badge">{props.local.localData.length > 0 ? props.local.localData.length : ''}</Badge></Link>
                        <Link to="/about" className="nav-link" style={{ textDecoration: "none" }} data-testid="nav-link_about">About</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AlertComponent {...props.alert} />
            <Container style={{ height: 50, width: "100%" }} />
            <Switch>
                <Route exact path="/live-data">
                    <LiveDataScreen {...props} />
                </Route>
                <Route exact path="/local-data">
                    <LocalDataScreen {...props} />
                </Route>
                <Route path={`/local-data/:mode/:id`} render={(routeProps) => <LocalDataRouter {...routeProps} {...props} />} />
                <Route exact path='/about'>
                    <AboutScreen />
                </Route>
                <Route exact path='/'>
                    <LandingScreen />
                </Route>
                <Route component={NoPageFoundScreen}/>
            </Switch>
            <Toasts localData={props.local.localData} overrideLocalData={props.local.overrideLocalData} />
        </Router>
    );
}

export default Navigation;