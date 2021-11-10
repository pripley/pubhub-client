import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import BeerSave from "../beer/BeerSave";
import Search from "../site/Search";

class BreweryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { brewery: null, open: false };
    // console.log(this.props.location.state.breweryId)
  }

  handleFetch = async (breweryId) => {
    const { token } = this.props;
    console.log(token);
    console.log(breweryId);
    try {
      const response = await fetch(
        `http://localhost:3000/brewery/${breweryId}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
        }
      );
      const json = await response.json();
      console.log(response);
      console.log(json);
      this.setState({ brewery: json.brewery });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.handleFetch(this.props.location.state.breweryId);
  }

  render() {
    const { brewery } = this.state;
    if (brewery === null) {
      return null;
    }
    return (
      <>
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div>
        <Container>
          <h1>{brewery.name}</h1>
          <h3>{brewery.type}</h3>
          <h5>
            {brewery.street}, {brewery.city},{" "}
            {brewery.state} {brewery.zip}
          </h5>
          <br />
          <BeerSave
            open={this.open}
            location={brewery.name}
            token={this.props.token}
          />
        </Container>
      </>
    );
  }
}
export default BreweryInfo;
