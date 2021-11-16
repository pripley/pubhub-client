import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import BrewerySave from "../brewery/BrewerySave";
import Search from "./Search";
import NavBar from "./NavBar";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log(this.props.location.state.brewery);
  }

  render() {
    const { token, firstName } = this.props;
    console.log(token)
    console.log(firstName)
    const brewery = this.props.location.state.brewery;

    const breweryList = () =>
      brewery.map((checkedBrewery, index) => {
        const brewType =
          checkedBrewery.brewery_type.charAt(0).toUpperCase() +
          checkedBrewery.brewery_type.slice(1);
        return (
          <Container className="result">
            <Row>
              <Col xs="7">
                <h5 className="weight-bold">{checkedBrewery.name}</h5>
                <p>
                  {checkedBrewery.street}, {checkedBrewery.city},{" "}
                  {checkedBrewery.state} {checkedBrewery.postal_code}
                </p>
              </Col>
              <Col xs="3">
                <h5 className="weight-bold">Brewery Type:</h5>
                <p>{brewType}</p>
              </Col>
              <Col xs lg="2">
                {token ? (
                  <BrewerySave
                    key={index}
                    brewery={checkedBrewery}
                    token={token}
                  />
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Container>
        );
      });

    return (
      <>
        <NavBar token={token} firstName={firstName} />
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div>
        <Container className="search-results">
          <h1>Search Results</h1>
          {breweryList()}
        </Container>
      </>
    );
  }
}
export default SearchResults;
