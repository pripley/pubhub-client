import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

class BeerReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { beers: [] };
  }

  handleFetchBeerReviews = async () => {
    const { location } = this.props;
    try {
      const response = await fetch(
        `http://localhost:3000/beer/location/${location}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
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

  render() {
    const { beers } = this.state;
    const beerReviews = () =>
      beers.map((beer, index) => {
        return (
          <div className="brewery-beer-activity" key={index}>
            <Row>
              <Col><p><Link to={`/user/${beer.user.id}`}>{beer.user.firstName}</Link></p></Col>  
              {/* <Col xs="6"><p className="text-end">{beer.createdAt}</p></Col>                */}
            </Row>
            <Row>
              <Col xs="3">
                <h4 className="weight-bold mb-0">{beer.name}</h4> 
                {/* <p className="mb-1">{beer.servingStyle}</p>  
                <h5>Rating: {beer.rating}</h5>              */}
              </Col>
              <Col xs="3">
                <h5>Rating: {beer.rating}</h5>
              </Col>
              <Col xs="3">
                <h5>{beer.servingStyle}</h5>
              </Col> 
              <Col xs="3"><p className="text-end">{beer.createdAt}</p></Col>           
            </Row>
            <Row>
              <Col>
                <p className="mt-3">{beer.note}</p>
              </Col>
            </Row>
          </div>
        );
      });

    return <div>{beerReviews()}</div>;
  }
}
export default BeerReviews;
