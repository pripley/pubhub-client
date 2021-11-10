import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import BrewerySave from '../brewery/BrewerySave';
import Search from './Search';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log(this.props.location.state.brewery);
  }

  render() {
    const { token } = this.props;
    const brewery = this.props.location.state.brewery;
        
    const breweryList = () =>
    brewery.map((checkedBrewery, index) => {
        return (
          <Container className="result">
            <Row>
              <Col>
                <h2>{checkedBrewery.name}</h2>
                <h5>
                  {checkedBrewery.street}, {checkedBrewery.city},{" "}
                  {checkedBrewery.state} {checkedBrewery.postal_code}
                </h5>
              </Col>
              <Col md="auto">
                <h3>Brewery Type:</h3>
                <h5>{checkedBrewery.brewery_type}</h5>
              </Col>
              <Col xs lg="2">{token ? (<BrewerySave key={index} brewery={checkedBrewery} token={token}/>): ""}</Col>
            </Row>
          </Container>
        );
      });

    return (
      <div>
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div> 
        <Container className="search-results">
          <h1>Search Results</h1>
          {breweryList()}
        </Container>
      </div>
    );
  }
}
export default SearchResults;
