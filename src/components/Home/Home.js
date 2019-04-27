import './Home.scss';
import React, { Component } from 'react';
import Search from '../Search/Search.js'

class Home extends Component {
   render() {
     return (
       <div className="Home">
         <p className="intro">
           Looking for a boba place?
           <br></br>
           Have no idea what to get at a boba shop?
           <br></br>
           Want to leave a review for specific boba at a place?
           <br></br>
           Search for a place to find boba places nearby. Login to leave reviews.
         </p>
          <Search />
       </div>
     );
   }
}

export default Home;
