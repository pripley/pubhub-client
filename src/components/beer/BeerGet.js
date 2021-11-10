import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class BeerGet extends Component {
  constructor(props) {
    super(props);
    this.state = { beers: [] };
  }

  componentDidMount() {
    const { token } = this.props;
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/beer/", {
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
    })();
  }

  render() {
    const { beers } = this.state;
    console.log(beers);
    const beerList = () =>
      beers.map((beer, index) => {
        return (
          <Container className="beer-activity">
            <Row>
              <Col>
                <h4>{beer.location}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <h5>{beer.name}</h5>
              </Col>
              <Col xs="2">
                <h5>Rating: {beer.rating}</h5>
              </Col>
              <Col xs="2">
                <h5>{beer.servingStyle}</h5>
              </Col>
              <Col xs="2">Update / Delete</Col>
            </Row>
            <Row>
              <Col>
                <p>{beer.note}</p>
              </Col>
            </Row>
          </Container>
        );
      });
    return <div>{beerList()}</div>;
  }
}
export default BeerGet;
