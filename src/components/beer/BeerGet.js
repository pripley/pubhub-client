import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import BeerEdit from "./BeerEdit";
import APIURL from '../../helpers/environment';

class BeerGet extends Component {
  constructor(props) {
    super(props);
    this.state = { beers: [], breweries: [], breweryID: 0, redirect: null };
  }

  handleDeleteBeer = (beer, token) => async (e) => {
    e.preventDefault();
    const { token } = this.props;
    try {
      console.log(beer.id);
      console.log(token);
      const response = await fetch(`${APIURL}/beer/${beer.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      this.handleFetchBeer();
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleFetchBeer = async () => {
    const { token } = this.props;
    try {
      const response = await fetch(`${APIURL}/beer/`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      const json = await response.json();
      this.setState({ beers: json.beers });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleFetchAllBreweries = (breweryName) => async (e) => {
    e.preventDefault();
    console.log(breweryName);
    const { token } = this.props;
    try {
      const response = await fetch(`${APIURL}/brewery/`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      const json = await response.json();
      this.setState({ breweries: json.breweries });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }

    const breweries = this.state.breweries;
    console.log(breweries);
    breweries.forEach((brewery, index) => {
      console.log(brewery.id);
      this.setState({ breweryId: brewery.id });
      brewery.name === breweryName
        ? this.setState({ redirect: `/brewery/${brewery.id}` })
        : this.setState({ redirect: null });
    });
  };

  componentDidMount() {
    this.handleFetchBeer();
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { breweryId: this.state.breweryId },
          }}
        />
      );
    }
    const { token } = this.props;
    const { beers } = this.state;
    console.log(beers);
    const beerList = () =>
      beers.map((beer, index) => {
        return (
          <div className="beer-activity" key={index}>
            <Row>
              <Col>
                <h5>
                  <Link
                    to=""
                    onClick={this.handleFetchAllBreweries(beer.location)}
                  >
                    {beer.location}
                  </Link>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <h3>{beer.name}</h3>
              </Col>
              <Col xs="2">
                <h5>Rating: {beer.rating}</h5>
              </Col>
              <Col xs="2">
                <h5>{beer.servingStyle}</h5>
              </Col>
              <Col xs="2" className="text-end">
                <BeerEdit
                  beer={beer}
                  token={token}
                  handleFetchBeer={this.handleFetchBeer}
                />{" "}
                |
                <Link to="" onClick={this.handleDeleteBeer(beer)}>
                  {" "}
                  Delete
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{beer.note}</p>
              </Col>
            </Row>
          </div>
        );
      });
    return <div>{beerList()}</div>;
  }
}
export default BeerGet;
