import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

class SpecificDrink extends Component {
  render() {
    return (
      <div className="SpecificDrink">
         <h> I'm looking for reviews for.. </h>
         <Button> specific boba drink </Button>
         <Button> SKIP and show me all the boba places </Button>
      </div>
    );
  }
}

export default SpecificDrink;
