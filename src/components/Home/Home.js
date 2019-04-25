import './Home.scss';
import React, { Component } from 'react';
import Search from '../Search/Search.js'

class Home extends Component {
   render() {
     return (
       <div className="Home">
          <Search />
       </div>
     );
   }
}

export default Home;
