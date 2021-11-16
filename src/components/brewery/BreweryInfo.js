import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import BeerSave from "../beer/BeerSave";
import Search from "../site/Search";
import BeerReviews from "../beer/BeerReviews";
import APIURL from "../../helpers/environment";
import NavBar from "../site/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import BreweryEdit from './BreweryEdit';

class BreweryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { brewery: null, open: false, favorite: null };
    // console.log(this.props.location.state.breweryId)
  }

  handleFetchBrewery = async (breweryId) => {
    const { token } = this.props;
    console.log(token);
    console.log(breweryId);
    try {
      const response = await fetch(`${APIURL}/brewery/${breweryId}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
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
    const { token, firstName } = this.props;
    if (brewery === null) {
      return null;
    }
    const brewType =
      brewery.type.charAt(0).toUpperCase() + brewery.type.slice(1);

    return (
      <>
        <NavBar token={token} firstName={firstName} />
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div>
        <Container>
          <Row className="mb-3 ">
            <Col xs="auto">
              <h1>{brewery.name}</h1>
            </Col>
            <Col>
            <BreweryEdit brewery={brewery} token={token} handleFetchBrewery={this.handleFetchBrewery}/>
            </Col>
          </Row>
          <h3>{brewType}</h3>
          <h5>
            {brewery.street}, {brewery.city}, {brewery.state} {brewery.zip}
          </h5>
          <br />
          <BeerSave location={brewery.name} token={this.props.token} />
          <BeerReviews location={brewery.name} token={this.props.token} />
        </Container>
      </>
    );
  }
}
export default BreweryInfo;
