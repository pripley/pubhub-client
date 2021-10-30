import React from "react";
import "./App.css";
import Sitebar from "./home/Navbar";
import LandingPage from "./site/Landing";
import HomePage from "./site/Main";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        sessionToken: localStorage.getItem("token"),
      });
    }
  }

  updateToken(newToken) {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  }

  clearToken() {
    localStorage.clear();
    this.setState({
      sessionToken: "",
    });
  }

  render() {
    return (
      <div>
        <Sitebar clickLogout={this.clearToken} />
        {this.state.sessionToken === localStorage.getItem("token") ? (
          <HomePage token={this.state.sessionToken} />
        ) : (
          <LandingPage updateToken={this.updateToken} />
        )}
      </div>
    );
  }
}

export default App;
