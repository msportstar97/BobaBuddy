import './WriteReview.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import createReactClass from 'create-react-class';
import { Dropdown } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';


class WriteReview extends Component {
  constructor() {
    super();

    this.state = {
      selectedMenu: "",
      selectedSize: "",
      selectedIce: "",
      selectedSugar: "",
      selectedTopping: [],
      additionalReview: "",
    }

    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  handleMenuSelection = (e, {value}) => {
    this.setState({selectedMenu: value})
  }

  handleSizeSelection = (e, {value}) => {
    this.setState({selectedSize: value})
  }

  handleIceSelection = (e, {value}) => {
    this.setState({selectedIce: value})
  }

  handleSugarSelection = (e, {value}) => {
    this.setState({selectedSugar: value})
  }

  handleToppingSelection = (e, {value}) => {
    this.setState({selectedTopping: value})
  }

  handleAdditionalReview = (e, {value}) => {
    this.setState({additionalReview: value})
  }



  render() {
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




    return (
      <div className = "WriteReview">
        <div className = "review-section">
        <p id = "review-title"> Write a Review for KFT </p>
        Menu to review *
        <Dropdown className = "dropdown"
        placeholder='Search | Select'
        fluid
        search
        selection

        options={menuOptions}
        onChange={(e, { value }) => this.handleMenuSelection(e, { value })}
        />
        Size Option *
        <Dropdown className = "dropdown"
          placeholder='Select Size Option'
          fluid
          selection
          options={sizeOptions}
          onChange={(e, { value }) => this.handleSizeSelection(e, { value })}
        />
        Ice Level *
        <Dropdown className = "dropdown"
          placeholder='Select Ice Level'
          fluid
          selection
          options={iceOptions}
          onChange={(e, { value }) => this.handleIceSelection(e, { value })}
        />
        Sugar Level *
        <Dropdown className = "dropdown"
          placeholder='Select Sugar Level'
          fluid
          selection
          options={sugarOptions}
          onChange={(e, { value }) => this.handleSugarSelection(e, { value })}
        />
        Topping(s) *
        <Dropdown className = "dropdown"
          placeholder='Search | Select Topping(s)'
          fluid
          selection
          multiple
          search
          options={toppingOptions}
          onChange={(e, { value }) => this.handleToppingSelection(e, { value })}
        />
        <Form>
          <Form.TextArea label='Additional Review'
          placeholder='Tell us more about your experience'
          onChange={(e, { value }) => this.handleAdditionalReview(e, { value })}
          />
        </Form>
        <div class = "button-row">
        <Button> Submit </Button> <Button> Cancel </Button>
        </div>
        </div>
      </div>
    );
  }
}


export default WriteReview;
