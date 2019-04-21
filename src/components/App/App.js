import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup.js';
import Results from '../Results/Results.js';

class App extends Component {
  render() {
    return (
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Signup" component={Signup}/>
          <Route exact path="/Results" component={Results}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
