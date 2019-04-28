import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup.js';
import Results from '../Results/Results.js';
import PlaceReview from '../PlaceReview/PlaceReview.js';
import SearchForDrink from '../Specific-Drink/SearchForDrink.js';
import Header from '../Header/Header.js';
import Profile from '../Profile/Profile.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    };

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
          <Route exact path="/Login" render={() => <Login updatelogin={this.updatelogin}/>}/>
          <Route exact path="/Signup" render={() => <Signup updatelogin={this.updatelogin}/>}/>
          <Route exact path="/Profile" render={() => <Profile updatelogin={this.updatelogin}/>}/>
          <Route exact path="/Results" component={Results}/>
          <Route exact path="/PlaceReview" component={PlaceReview}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
