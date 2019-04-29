import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup.js';
import Results from '../Results/Results.js';
import PlaceReview from '../PlaceReview/PlaceReview.js';
import WriteReview from '../WriteReview/WriteReview.js';
import SearchForDrink from '../Specific-Drink/SearchForDrink.js';
import Header from '../Header/Header.js';
import Profile from '../Profile/Profile.js';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    };

    let logged = false;
    if (firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        logged = true;
        this.setState({
          loggedIn: logged
        });
      }
    })) 
    console.log("app");
    console.log(this.state.loggedIn);

    this.updatelogin = this.updatelogin;
  }

  updatelogin = (loggedIn) => {
    this.setState({
      loggedIn: loggedIn,
    });
    if (loggedIn) {
      return <Redirect to="/Profile"/>;
    }
  }

  render() {
    return (
      <Router basename="/">
        <Header updatelogin={this.updatelogin} loggedIn={this.state.loggedIn}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Login" render={() => <Login updatelogin={this.updatelogin} loggedIn={this.state.loggedIn}/>}/>
          <Route exact path="/Signup" render={() => <Signup updatelogin={this.updatelogin}/>}/>
          <Route exact path="/Profile" render={() => <Profile updatelogin={this.updatelogin}/>}/>
          <Route path="/Results/:id" component={Results}/>
          <Route exact path="/PlaceReview" component={PlaceReview}/>
          <Route exact path="/WriteReview" component={WriteReview}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
