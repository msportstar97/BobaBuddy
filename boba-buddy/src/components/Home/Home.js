import './Home.scss';
import React, { Component } from 'react';
import Header from '../Header/Header.js';
import {Button, Form, FormControl} from 'react-bootstrap';



const Search = () => {
  return (
    <div class = "search-bar">
      <Form inline>
        <FormControl id = "search-form" type="text" placeholder="Search for location (address, zip code..)" size="lg" />
        <Button size="lg" variant="outline-dark" >Search</Button>
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
