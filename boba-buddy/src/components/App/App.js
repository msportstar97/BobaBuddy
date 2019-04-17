import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../Home/Home.js';
import Header from '../Header/Header.js'

class App extends Component {
  render() {
    return (
      <Router basename="/app">
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
