import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import BeerSave from "../beer/BeerSave";
import Search from "../site/Search";
import BeerReviews from "../beer/BeerReviews";
import APIURL from '../../helpers/environment';

class BreweryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { brewery: null, open: false };
    // console.log(this.props.location.state.breweryId)
  }

  handleFetchBrewery = async (breweryId) => {
    const { token } = this.props;
    console.log(token);
    console.log(breweryId);
    try {
      const response = await fetch(
        `${APIURL}/brewery/${breweryId}`,
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
    this.handleFetchBrewery(this.props.location.state.breweryId);
  }

  render() {
    const { brewery } = this.state;

    if (brewery === null) {
      return null;
    }
    const brewType =
      brewery.type.charAt(0).toUpperCase() + brewery.type.slice(1);
    return (
      <>
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div>
        <Container>
          <h1>{brewery.name}</h1>
          <h3>{brewType}</h3>
          <h5>
            {brewery.street}, {brewery.city}, {brewery.state} {brewery.zip}
          </h5>
          <br />
          <BeerSave location={brewery.name} token={this.props.token} />
          <div className="brewery-beer-activity-container">
            <h4 className="weight-bold">Recent Check-Ins</h4>
            <br/>
            <BeerReviews location={brewery.name} token={this.props.token} />
          </div>
        </Container>
      </>
    );
  }
}
export default BreweryInfo;
