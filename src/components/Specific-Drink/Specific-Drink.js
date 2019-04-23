import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

class SpecificDrink extends Component {
  constructor() {
    super();
    
    this.state = {
      place: ''
    }
  
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState ({
      place: this.props.location.state
    })
  }

  render() {
    return (
      <div className="SpecificDrink">
         <h> I'm looking for reviews for.. </h>
         <Button> specific boba drink </Button>
         <Link to={{
              pathname: "/Results",
              state: {
                place: this.state.place
              }}}>
            <Button> SKIP and show me all the boba places </Button>
          </Link> 
      </div>
    );
  }
}

export default SpecificDrink;
