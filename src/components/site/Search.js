import React, { Component } from "react";
import { Input, Button, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { brewery: [], query: "", redirect: null };
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleFetch = async (e) => {
    e.preventDefault();
    let query = this.state.query;
    const url = `https://api.openbrewerydb.org/breweries/search?query=${query}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      this.setState({ brewery: json, redirect: "/search" });      
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{pathname: this.state.redirect, state: {brewery: this.state.brewery}}}/>
      );
    }
    return (
      <>
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
            <Button onClick={this.handleFetch}>Search</Button>
          </Col>
        </Row>
      </>
    );
  }
}
export default Search;
