import './Results.scss';
import React, { Component } from 'react';
import Header from '../Header/Header.js';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Results extends Component {
   render() {
     return (
       <div className="results">
        <Header />
       </div>
     );
   }
}

export default Results;
