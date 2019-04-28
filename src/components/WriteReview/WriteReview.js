import './WriteReview.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import createReactClass from 'create-react-class';
import { Dropdown } from 'semantic-ui-react'


class WriteReview extends Component {
  constructor() {
    super();

    this.state = {
      selectedMenus: []
    }

    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  handleMenuSelection = (e, {value}) => {
    this.setState({selectedMenus: value})
  }

  handleCompleteStep1 = () => {
    console.log(this.state.selectedMenus)
    for (let j = 0; j < this.state.selectedMenus.length; j ++) {

    }
  }

  render() {
    //const {place} = this.props.location.state;
    var createReactClass = require('create-react-class');
    const menuOptions = [
      {
        key: "peach oolong tea",
        value: "peach oolong tea",
        text: "Peach Oolong Tea"
      },
      {
        key: "oolong tea",
        value: "oolong tea",
        text: "Oolong Tea"
      },
      {
        key: "oolong milk tea",
        value: "oolong milk tea",
        text: "Oolong Milk Tea"
      }
    ];

    const iceOptions = [
      {
        key: "0%",
        value: "0%",
        text: "0%"
      },
      {
        key: "25%",
        value: "25%",
        text: "25%"
      },
      {
        key: "50%",
        value: "50%",
        text: "50%"
      },
      {
        key: "75%",
        value: "75%",
        text: "75%"
      },
      {
        key: "100%",
        value: "100%",
        text: "100%"
      },
      {
        key: "33%",
        value: "33%",
        text: "33%"
      },
      {
        key: "66%",
        value: "66%",
        text: "66%"
      }
    ];

    const sugarOptions = [
      {
        key: "0%",
        value: "0%",
        text: "0%"
      },
      {
        key: "25%",
        value: "25%",
        text: "25%"
      },
      {
        key: "50%",
        value: "50%",
        text: "50%"
      },
      {
        key: "75%",
        value: "75%",
        text: "75%"
      },
      {
        key: "100%",
        value: "100%",
        text: "100%"
      },
      {
        key: "less",
        value: "less",
        text: "less"
      },
      {
        key: "normal",
        value: "normal",
        text: "normal"
      },
      {
        key: "more",
        value: "more",
        text: "more"
      }

    ];

    const sizeOptions = [
      {
        key: "S",
        value: "S",
        text: "S"
      },
      {
        key: "M",
        value: "M",
        text: "M"
      },
      {
        key: "L",
        value: "L",
        text: "L"
      },
      {
        key: "XL",
        value: "XL",
        text: "XL"
      }
    ];

    const toppingOptions = [
      {
        key: "pudding",
        value: "puddig",
        text: "pudding"
      },
      {
        key: "tapioca",
        value: "tapioca",
        text: "tapioca"
      },
      {
        key: "nata jelly",
        value: "nata jelly",
        text: "nata jelly"
      },
      {
        key: "red bean",
        value: "red bean",
        text: "red bean"
      },
      {
        key: "herbal jelly",
        value: "herbal jelly",
        text: "herbal jelly"
      },
      {
        key: "aloe jelly",
        value: "aloe jelly",
        text: "aloe jelly"
      },
      {
        key: "fig jelly",
        value: "fig jelly",
        text: "fig jelly"
      },
      {
        key: "oreo",
        value: "oreo",
        text: "oreo"
      }
    ];

    var ChooseOptions = createReactClass({
      render: function() {
      return (
        <div id="choose-options" className="chooseOptions">
        <Dropdown
          placeholder='Select Size Option'
          fluid
          selection
          options={sizeOptions}
        />
        <Dropdown
          placeholder='Select Ice Level'
          fluid
          selection
          options={iceOptions}
        />
        <Dropdown
          placeholder='Select Sugar Level'
          fluid
          selection
          options={sugarOptions}
        />
        <Dropdown
          placeholder='Select Topping(s)'
          fluid
          selection
          options={toppingOptions}
        />

        </div>
      );
    }
  });



    return (
      <div className = "WriteReview">
        <p id = "review-title"> Write a Review for KFT </p>
        <p> Select the menu(s) you ordered. </p>
        <Dropdown
        placeholder='Search | Select'
        fluid
        multiple
        search
        selection

        options={menuOptions}
        onChange={(e, { value }) => this.handleMenuSelection(e, { value })}
        />
        <Button onClick = {() => this.handleCompleteStep1()}> Submit </Button>
        <ChooseOptions/>
      </div>
    );
  }
}


export default WriteReview;
