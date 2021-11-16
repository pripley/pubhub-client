import React, { Component } from "react";
import { Container } from "reactstrap";
import Search from "../site/Search";
import RecentActivity from "./RecentActivity";
import NavBar from "../site/NavBar";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { timeOfDay: "" };
  }

  greeting = () => {
    const hours = new Date().getHours();
    console.log(hours);
    hours < 12
      ? this.setState({ timeOfDay: "Good morning!" })
      : hours >= 12 && hours <= 18
      ? this.setState({ timeOfDay: "Good afternoon!" })
      : this.setState({ timeOfDay: "Good evening!" });
  };

  componentDidMount() {
    this.greeting();
  }

  render() {
    const { token, firstName } = this.props;
    const { timeOfDay } = this.state;    
    return (
      <>
        <NavBar token={token} firstName={firstName}/>
        <div className="search-container">
          <Container>
            <Search />
          </Container>
        </div>
        <Container>
          <h1 className="mb-5">{timeOfDay}</h1>
          <RecentActivity token={token} />
        </Container>
      </>
    );
  }
}
export default HomePage;
