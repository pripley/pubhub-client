import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import APIURL from "../../helpers/environment";
import profilePic from "../../assets/images/default-profile-pic.png";

class BeerReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { beers: [] };
  }

  handleFetchBeerReviews = async () => {
    const { location } = this.props;
    try {
      const response = await fetch(`${APIURL}/beer/location/${location}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      console.log(response);
      const json = await response.json();
      this.setState({ beers: json.beers });
      console.log(json.beers);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.handleFetchBeerReviews();
  }

  formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  render() {
    const { beers } = this.state;
    const beerReviews = () =>
      beers !== undefined
        ? beers.map((beer, index) => {
            const dateString = Date.parse(beer.createdAt);
            return (
              <div className="brewery-beer-activity" key={index}>
                <Row className="align-items-center mb-3">
                  <Col className="col-md-auto">
                    <img src={profilePic} alt="Default avatar pic" />
                  </Col>
                  <Col className="ps-0">
                    <p className="mb-0">
                      <Link to={`/user/${beer.user.id}`}>
                        {beer.user.firstName}
                      </Link>
                    </p>
                  </Col>
                  {/* <Col className="col-md-auto"><p className="text-end mb-0">Check-in: {beer.createdAt}</p></Col>                */}
                </Row>
                <Row>
                  <Col xs="3">
                    <h5 className="weight-bold mb-0">{beer.name}</h5>
                    <p>{beer.servingStyle}</p>
                    {/* <p className="mb-1">{beer.servingStyle}</p>  
                <h5>Rating: {beer.rating}</h5>              */}
                  </Col>
                  <Col xs="3">
                    <p>Rating: {beer.rating}</p>
                  </Col>
                  <Col xs="6">
                    <p>
                      Check-in: {this.formatter.format(new Date(dateString))}
                    </p>
                  </Col>
                  {/* <Col xs="3">
                <h5>{beer.servingStyle}</h5>
              </Col>  */}
                  {/* <Col xs="3"><p className="text-end">Check-in: {beer.createdAt}</p></Col>            */}
                </Row>
                <Row>
                  <Col>
                    <p className="mt-3">{beer.note}</p>
                  </Col>
                </Row>
              </div>
            );
          })
        : "";

    return beers !== undefined ? (
      <div className="brewery-beer-activity-container">
        <h4 className="weight-bold">Recent Check-Ins</h4>
        <br />
        <div>{beerReviews()}</div>
      </div>
    ) : (
      ""
    );
  }
}
export default BeerReviews;
