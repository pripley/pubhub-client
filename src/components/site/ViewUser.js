import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Search from "./Search";
import profilePic from "../../assets/images/default-profile-pic.png";
import { Link, Redirect } from "react-router-dom";

class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = { beers: [], username: "" };
  }

  handleFetchAllBreweries = (breweryName) => async (e) => {
    e.preventDefault();
    console.log(breweryName);
    const { token } = this.props;
    try {
      const response = await fetch("http://localhost:3000/brewery/", {
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

  handleFetchUserBeer = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/beer/user/${userId}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );

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
    this.handleFetchUserBeer(user);
  }

  render() {
    const { beers, username } = this.state;
    const beerList = () =>
      beers.map((beer, index) => {
        return (
          <div className="beer-activity" key={index}>            
            <Row>
              <Col xs="3">
                <h5>{beer.name}</h5>
                <p>{beer.location}</p>
              </Col>
              <Col xs="3">
                <h5>Rating: {beer.rating}</h5>
              </Col>
              <Col xs="3">
                <h5>{beer.servingStyle}</h5>
              </Col>
              <Col xs="3">
                <h5>{beer.createdAt}</h5>
              </Col>
            </Row>
            
          </div>
        );
      });
    return (
      <div>
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div>
        <Container>
          <Row className="mt-5">
            <Col className="d-flex flex-column align-items-center">
              <img src={profilePic} alt="Default avatar pic" />
              <h3 className="mt-3">{username}</h3>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mt-5">
            <h2 className="title">Beers</h2>
            <Col>{beerList()}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default ViewUser;
