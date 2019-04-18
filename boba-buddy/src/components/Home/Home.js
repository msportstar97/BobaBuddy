import './Home.scss';
import React, { Component } from 'react';
import Header from '../Header/Header.js';
import { Button } from 'semantic-ui-react'
import {Form, FormControl} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'



const Search = () => {
  return (
    <div className = "search-bar">
      <Form inline>
        <FormControl id = "search-form" type="text" placeholder="Search for location (address, zip code..)" />
        <Button basic color='black'>Search</Button>
      </Form>
    </div>
  );
}

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
