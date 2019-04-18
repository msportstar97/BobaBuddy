import './Home.scss';
import React, { Component } from 'react';
import Header from '../Header/Header.js';
import Search from '../Search/Search.js'

class Home extends Component {
   render() {
     return (
       <div className="Home">
          <Header />
          <Search />
       </div>
     );
   }
}

export default Home;
