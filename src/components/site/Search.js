import React, { Component } from "react";
import { Input, Button, Row, Col } from "reactstrap";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { brewery: [], query: "" };
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleFetch = async (e) => {
    e.preventDefault();
    let query = this.state.query
    console.log(query);
    const url = `https://api.openbrewerydb.org/breweries/search?query=${query}`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData);
      this.setState({
        brewery: jsonData,
      });
      History.pushState("/")
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Input
              className="search"
              type="text"
              placeholder="Search for a brewery"
              name="search"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Button onClick={this.handleFetch}>Brew Me!</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Search;
