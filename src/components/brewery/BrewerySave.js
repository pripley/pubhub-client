import React, { Component } from "react";
import { Button } from "reactstrap";

class BrewerySave extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Save brewery check in
  handleSaveBrewery = async (brewery) => {
    try {
      const response = await fetch("http://localhost:3000/brewery/", {
        method: "POST",
        body: JSON.stringify({
          brewery: {
            name: name,
            street: street,
            city: city,
            state: state,
            zip: zip,
            type: type,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: props.token,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <Button onClick={this.handleSaveBrewery}>Check in</Button>
      </>
    );
  }
}
export default BrewerySave;
