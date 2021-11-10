import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";

class BrewerySave extends Component {
  constructor(props) {
    super(props);
    this.state = { breweryId: 0, redirect: null };
  }

  // Save brewery check in
  handleSaveBrewery = async (e) => {
    e.preventDefault();
    const { brewery, token } = this.props;
    const data = {
      brewery: {
        name: brewery.name,
        street: brewery.street,
        city: brewery.city,
        state: brewery.state,
        zip: brewery.postal_code,
        type: brewery.brewery_type,
      },
    }    
    // console.log(brewery.name)    
    // console.log(brewery.street)
    // console.log(brewery.city)
    // console.log(brewery.state)
    // console.log(brewery.postal_code)
    // console.log(brewery.brewery_type)
    console.log(token)
    try {
      const response = await fetch("http://localhost:3000/brewery/", {
        method: "POST",        
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": token,
        }),
        body: JSON.stringify(data),
      });
      console.log(response);
      const json = await response.json();
      console.log(json);      
      this.setState({ breweryId: json.brewery.id}); 
      console.log(this.state.breweryId)
      this.setState({ redirect: `/brewery/${this.state.breweryId}`}) 
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{pathname: this.state.redirect, state: {breweryId: this.state.breweryId}}}/>
      );
    }
    return (
      <>
        <Button onClick={this.handleSaveBrewery}>Check in</Button>
      </>
    );
  }
}
export default BrewerySave;
