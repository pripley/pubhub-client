import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Search from "./Search";
import profilePic from "../../assets/images/default-profile-pic.png";
import { Link, Redirect } from "react-router-dom";
import APIURL from "../../helpers/environment";
import BeerGet from '../beer/BeerGet';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      breweries: [],
      username: "",      
    };
  }

  // handleFetchBeer = async () => {
  //   const { token } = this.props;
  //   console.log(token);
  //   try {
  //     const response = await fetch(`${APIURL}/beer/`, {
  //       method: "GET",
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //       }),
  //     });
  //     console.log(response);
  //     const json = await response.json();
  //     this.setState({ beers: json.beers });
  //     this.setState({ username: json.beers[0].user.username });
  //     if (!response.ok) {
  //       throw new Error("something went wrong!");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // handleFetchBrewery = async () => {
  //   const { token } = this.props;
  //   console.log(token);
  //   try {
  //     const response = await fetch(`${APIURL}/brewery/`, {
  //       method: "GET",
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //       }),
  //     });
  //     console.log(response);
  //     const json = await response.json();
  //     this.setState({ breweries: json.breweries });
  //     if (!response.ok) {
  //       throw new Error("something went wrong!");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  handleDeleteBeer = (beer) => async (e) => {
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

  componentDidMount() {
    // this.handleFetchBrewery();
    // this.handleFetchBeer();
  }

  render() {
    const { beers, breweries, username } = this.state;
    const { token } = this.props;
    console.log(token);
    // console.log(beers)
    // const beerList = () =>
    //   beers.map((beer, index) => {
    //     return (
    //       <div className="beer-activity" key={index}>
    //         <Row>
    //           <Col xs="3">
    //             <h5>{beer.name}</h5>
    //             <p>{beer.location}</p>
    //           </Col>
    //           <Col xs="3">
    //             <h5>Rating: {beer.rating}</h5>
    //           </Col>
    //           <Col xs="3">
    //             <h5>{beer.servingStyle}</h5>
    //           </Col>
    //           <Col xs="3">
    //             <h5>{beer.createdAt}</h5>
    //           </Col>
    //         </Row>
    //       </div>
    //     );
    //   });
    // const breweryList = () =>
    //   breweries.map((brewery, index) => {
    //     return (
    //       <div className="beer-activity" key={index}>
    //         <Row>
    //           <Col xs="6">
    //             <h5>{brewery.name}</h5>
    //             <p>
    //               {brewery.street}, {brewery.city}, {brewery.state}{" "}
    //               {brewery.zip}
    //             </p>
    //           </Col>
    //           <Col xs="6">
    //             <h5>Type: {brewery.type}</h5>
    //           </Col>
    //         </Row>
    //       </div>
    //     );
    //   });
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
            <BeerGet token={token} />
          </Row>
          {/* <Row className="mt-5">
            <h2 className="title">Breweries</h2>
            <Col>{breweryList()}</Col>
          </Row> */}
        </Container>
      </div>
    );
  }
}
export default Profile;
