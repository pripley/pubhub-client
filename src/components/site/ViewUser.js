import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Search from "./Search";
import profilePic from "../../assets/images/default-profile-pic.png";
import { Link, Redirect } from "react-router-dom";
import APIURL from "../../helpers/environment";
import NavBar from './NavBar';

class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = { beers: [], breweries: [], username: "" };
  }

  handleFetchUserBrewery = async (userId) => {
    try {
      const response = await fetch(`${APIURL}/brewery/user/${userId}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      const json = await response.json();
      this.setState({ breweries: json.breweries });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleFetchUserBeer = async (userId) => {
    try {
      const response = await fetch(`${APIURL}/beer/user/${userId}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const json = await response.json();
      this.setState({ beers: json.beers });
      this.setState({ username: json.beers[0].user.username });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    const user = this.props.id;
    console.log(user);
    this.handleFetchUserBrewery(user);
    this.handleFetchUserBeer(user);
  }

  render() {
    const { beers, breweries, username } = this.state;
    const {token, firstName} = this.props
    console.log(breweries);
    const beerList = () =>
      beers.map((beer, index) => {        
        return (
          <div className="beer-activity" key={index}>
            <Row>
              <Col xs="6">
                <h5>{beer.name}</h5>
                <p>{beer.location}</p>
              </Col>
              <Col xs="3">
                <p>Rating: {beer.rating}</p>
              </Col>              
              <Col xs="3">
                <p>Check-in Count: </p>
              </Col>
            </Row>
          </div>
        );
      });
    const breweryList = () =>
      breweries.map((brewery, index) => {
        return (
          <div className="beer-activity" key={index}>
            <Row>
              <Col xs="6">
                <h5>{brewery.name}</h5>
                <p>
                  {brewery.street}, {brewery.city}, {brewery.state}{" "}
                  {brewery.zip}
                </p>
              </Col>
              <Col xs="3">
                <p>Category: {brewery.type}</p>
              </Col>
              <Col xs="3">
                <p>Check-in Count: </p>
              </Col>
            </Row>
          </div>
        );
      });
    return (
      <>
      <NavBar token={token} firstName={firstName}/>
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div>
        <Container>
          <Row className="mt-5">
            <Col xs="3" className="d-flex flex-column align-items-start">
              <Row>
                <Col className="d-flex flex-column align-items-center">
                  <img src={profilePic} alt="Default avatar pic" />
                  <h3 className="mt-3">{username}</h3>
                </Col>
              </Row>
            </Col>
            <Col xs="9">
              <Row>
                <h2 className="title">Beers</h2>
                <Col>{beerList()}</Col>
              </Row>
              <Row className="mt-5">
                <h2 className="title">Breweries</h2>
                <Col>{breweryList()}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default ViewUser;
