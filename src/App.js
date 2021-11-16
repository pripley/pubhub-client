import React from "react";
import "./App.css";
import NavBar from "./components/site/NavBar";
import LandingPage from "./components/landing/LandingPage";
import HomePage from "./components/home/HomePage";
import SearchResults from "./components/site/SearchResults";
import BreweryInfo from "./components/brewery/BreweryInfo";
import ViewUser from "./components/site/ViewUser";
import Profile from "./components/site/Profile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/site/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
      firstName: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        sessionToken: localStorage.getItem("token"),
      });
    }
    if (localStorage.getItem("firstName")) {
      this.setState({
        firstName: localStorage.getItem("firstName"),
      });
    }
  }

  updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  };

  getFirstName = (name) => {
    localStorage.setItem("firstName", name);
    this.setState({
      firstName: name,
    });
  };

  render() {
    const { sessionToken, firstName } = this.state;
    return (
      <div id="main-container">
        <div id="content-container">
          <Router>
            <Switch>
              <Route exact path="/">
                {sessionToken ? (
                  <HomePage token={sessionToken} firstName={firstName} />
                ) : (
                  <LandingPage />
                )}
              </Route>
              <Route
                exact
                path="/brewery/:id"
                render={(breweryId) => (
                  <BreweryInfo
                    {...breweryId}
                    token={sessionToken}
                    firstName={firstName}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/user/:id"
                render={(props) => (
                  <ViewUser
                    id={props.match.params.id}
                    token={sessionToken}
                    firstName={firstName}
                  />
                )}
              />
              <Route
                exact
                path="/search"
                render={(brewery) => (
                  <SearchResults
                    {...brewery}
                    token={sessionToken}
                    firstName={firstName}
                  />
                )}
              />
              <Route exact path="/profile">
                <Profile token={sessionToken} />
              </Route>
              <Route exact path="/login">
                <Login
                  updateToken={this.updateToken}
                  getFirstName={this.getFirstName}
                />
              </Route>
              <Route exact path="/register">
                <Register
                  updateToken={this.updateToken}
                  getFirstName={this.getFirstName}
                />
              </Route>
            </Switch>
          </Router>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
