import React, { Component } from "react";
import { Container } from "reactstrap";
import Search from "../site/Search";
import RecentActivity from "./RecentActivity";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { token } = this.props;
    return (
      <>
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div>
        <Container>
          <h1>Good afternoon!</h1>
          <RecentActivity token={token} />

          {/* <h2>Beer of the Day</h2> */}
        </Container>
      </>
    );
  }
}
export default HomePage;
