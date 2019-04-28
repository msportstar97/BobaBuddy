import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup.js';
import Results from '../Results/Results.js';
import PlaceReview from '../PlaceReview/PlaceReview.js';
import WriteReview from '../WriteReview/WriteReview.js';
import SearchForDrink from '../Specific-Drink/SearchForDrink.js';
import Header from '../Header/Header.js';

class App extends Component {
  render() {
    return (
      <Router basename="/">
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Signup" component={Signup}/>
          <Route exact path="/Results" component={Results}/>
          <Route exact path="/PlaceReview" component={PlaceReview}/>
          <Route exact path="/WriteReview" component={WriteReview}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
